


import { Request, Response } from 'express';
import Match from '../models/Match.js';
import { updateScoreLogic } from '../utils/scoringLogic.js';

export const initMatch = async (req: Request, res: Response): Promise<void> => {
  try {
    const { teamA, teamB, players } = req.body;
    const match = await Match.create({ teamA, teamB, players });
    res.status(201).json(match);
  } catch (err) {
    res.status(500).json({ error: 'Failed to initialize match' });
  }
};

export const addDelivery = async (req: Request, res: Response): Promise<void> => {
  try {
    const match = await Match.findById(req.params.id);
    if (!match) {
      res.status(404).json({ error: 'Match not found' });
      return;    
    }

    const delivery = req.body;

    console.log(delivery); 
    match.deliveries.push(delivery);
    updateScoreLogic(match, delivery);
    await match.save();

    res.json(match);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add delivery' });
  }
};

export const getMatch = async (req: Request, res: Response): Promise<void> => {
  try {
    const match = await Match.findById(req.params.id);
    if (!match) {
      res.status(404).json({ error: 'Match not found' });
      return;
    }

    res.json(match);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch match' });
  }
};

export const undoDelivery = async (req: Request, res: Response): Promise<void> => {
  try {
    const match = await Match.findById(req.params.id);
    if (!match) {
      res.status(404).json({ error: 'Match not found' });
      return;
    }

    const lastDelivery = match.deliveries.pop();
    if (lastDelivery) {
      match.players = match.players.map(player => {
        if (player.playerId === lastDelivery.batsmanId && lastDelivery.legal) {
          player.batting.balls = Math.max(0, player.batting.balls - 1);
          player.batting.runs = Math.max(0, player.batting.runs - lastDelivery.batsmanRuns);
          player.batting.strikeRate = player.batting.balls > 0 ? parseFloat(((player.batting.runs / player.batting.balls) * 100).toFixed(2)) : 0;
        }

        if (player.playerId === lastDelivery.bowlerId && lastDelivery.legal) {
          player.bowling.balls = Math.max(0, player.bowling.balls - 1);
          player.bowling.overs = Math.floor(player.bowling.balls / 6);
          player.bowling.runsConceded = Math.max(0, player.bowling.runsConceded - (lastDelivery.batsmanRuns + (lastDelivery.extras?.wide || 0) + (lastDelivery.extras?.noball || 0) + (lastDelivery.extras?.overthrow || 0)));
          player.bowling.economy = player.bowling.balls > 0 ? parseFloat(((player.bowling.runsConceded / (player.bowling.balls / 6)).toFixed(2))) : 0;
          if (lastDelivery.wicket && lastDelivery.wicket.kind !== 'runout') {
            player.bowling.wickets = Math.max(0, player.bowling.wickets - 1);
          }
        }
        return player;
      });

      match.score.totalRuns = Math.max(0, match.score.totalRuns - (lastDelivery.runs));
      if (lastDelivery.wicket) {
        match.score.wickets = Math.max(0, match.score.wickets - 1);
      }
      if (lastDelivery.legal) {
        match.currentBall = match.currentBall === 0 ? 5 : match.currentBall - 1;
        if (match.currentBall === 5) match.currentOver = Math.max(0, match.currentOver - 1);
      }
    }

    await match.save();
    res.json(match);
  } catch (err) {
    res.status(500).json({ error: 'Failed to undo delivery' });
  }
};

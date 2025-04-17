import { Request, Response } from 'express';
import Match from '../models/Match.js';
import { calculateScore } from '../utils/scoringLogic.js';

export const initMatch = async (req: Request, res: Response): Promise<void> => {
  try {
    const { teamA, teamB } = req.body;
    const match = await Match.create({ teamA, teamB });
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

    match.deliveries.push(req.body);
    match.score = calculateScore(match.deliveries);
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

    res.json(match); // ✅ this was missing
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

    match.deliveries.pop();
    match.score = calculateScore(match.deliveries);
    await match.save();

    res.json(match);
  } catch (err) {
    res.status(500).json({ error: 'Failed to undo delivery' });
  }
};

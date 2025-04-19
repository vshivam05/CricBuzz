import { IMatch } from '../models/Match.js';

export function updateScoreLogic(match: IMatch, delivery: any) {
  console.log("from the logic", delivery);
  const {
    batsmanId,
    bowlerId,
    batsmanRuns = 0,
    extras = {},
    type,
    legal = true,
    wicket
  } = delivery;

  let players = match.players;
  const totalExtras = (extras.wide || 0) + (extras.noball || 0) + (extras.bye || 0) + (extras.legbye || 0) + (extras.overthrow || 0);

  match.score.totalRuns += batsmanRuns + totalExtras + (type?.includes('noball') ? 1 : 0) + (type?.includes('wide') ? 1 : 0);
  if (wicket) match.score.wickets += 1;

  if (legal) {
    match.currentBall += 1;
  
    if (match.currentBall === 6) {
      match.currentOver += 1;
      match.currentBall = 0;
    }
  }
  

  players = players.map(player => {
    if (player.playerId === batsmanId) {
      if (legal) player.batting.balls += 1;
      if (type.startsWith('normal') || type === 'overthrow') {
        player.batting.runs += batsmanRuns + (extras?.overthrow || 0);
      } else if (type.startsWith('noball') && type.includes('runs')) {
        player.batting.runs += Math.max(0, batsmanRuns - 1);
      }
      player.batting.strikeRate = player.batting.balls > 0
        ? parseFloat(((player.batting.runs / player.batting.balls) * 100).toFixed(2))
        : 0;
    }

    if (player.playerId === bowlerId) {
      if (legal) player.bowling.balls += 1;
      // Calculate overs as whole number plus fraction (e.g., 3.4 means 3 overs and 4 balls)
      player.bowling.overs = Math.floor(player.bowling.balls / 6) + (player.bowling.balls % 6) / 10;

      const conceded = batsmanRuns + (extras?.wide || 0) + (extras?.noball || 0) + (extras?.overthrow || 0);
      player.bowling.runsConceded += conceded;

      if (wicket && wicket.kind !== 'runout') player.bowling.wickets += 1;

      player.bowling.economy = player.bowling.balls > 0
        ? parseFloat((player.bowling.runsConceded / (player.bowling.balls / 6)).toFixed(2))
        : 0;
    }

    return player;
  });

  match.players = players;
}
// import { IMatch } from '../models/Match.js';

// export function calculateScore(deliveries: IMatch['deliveries']) {
//   let totalRuns = 0;
//   let wickets = 0;
//   let legalDeliveries = 0;

//   deliveries.forEach(delivery => {
//     const { type, runs, extras, legal, wicket } = delivery;

//     if (wicket) wickets++;

//     switch (type) {
//       case 'wide':
//       case 'wide_overthrow':
//       case 'wide_bye':
//       case 'wide_bye_overthrow':
//       case 'wide_legbye':
//       case 'wide_legbye_overthrow': {
//         totalRuns += (extras?.wide || 0) + (extras?.overthrow || 0);
//         break;
//       }
//       case 'noball_bye':
//       case 'noball_bye_overthrow': {
//         totalRuns += 1 + (extras?.bye || 0) + (extras?.overthrow || 0);
//         break;
//       }
//       case 'noball':
//       case 'noball_overthrow': {
//         totalRuns += 1 + (runs || 0) + (extras?.overthrow || 0);
//         break;
//       }
//       case 'noball_legbye':
//       case 'noball_legbye_overthrow': {
//         totalRuns += 1 + (extras?.legbye || 0) + (extras?.overthrow || 0);
//         break;
//       }
//       case 'bye':
//       case 'bye_overthrow': {
//         totalRuns += (extras?.bye || 0) + (extras?.overthrow || 0);
//         break;
//       }
//       case 'legbye':
//       case 'legbye_overthrow': {
//         totalRuns += (extras?.legbye || 0) + (extras?.overthrow || 0);
//         break;
//       }
//       case 'normal':
//       case 'normal_overthrow':
//       case 'overthrow': {
//         totalRuns += runs + (extras?.overthrow || 0);
//         break;
//       }
//       default: {
//         totalRuns += runs;
//       }
//     }

//     if (legal) legalDeliveries++;
//   });

//   const overs = +(legalDeliveries / 6).toFixed(1);
//   return { totalRuns, wickets, overs };
// }


import { IMatch } from '../models/Match.js';

export function updateScoreLogic(match: IMatch, delivery: any) {
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

  // Update team total score
  match.score.totalRuns += batsmanRuns + totalExtras + (type?.includes('noball') ? 1 : 0) + (type?.includes('wide') ? 1 : 0);
  if (wicket) match.score.wickets += 1;

  // Update balls and overs
  if (legal) {
    match.currentBall += 1;
    if (match.currentBall === 6) {
      match.currentOver += 1;
      match.currentBall = 0;
    }
  }

  players = players.map(player => {
    // Batting Stats
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

    // Bowling Stats
    if (player.playerId === bowlerId) {
      if (legal) player.bowling.balls += 1;
      if (legal) player.bowling.overs = Math.floor(player.bowling.balls / 6);

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
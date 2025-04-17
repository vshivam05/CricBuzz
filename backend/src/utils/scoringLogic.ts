import { IMatch } from '../models/Match.js';

export function calculateScore(deliveries: IMatch['deliveries']) {
  let totalRuns = 0;
  let wickets = 0;
  let legalDeliveries = 0;

  deliveries.forEach(delivery => {
    const { type, runs, extras, legal, wicket } = delivery;

    if (wicket) wickets++;

    switch (type) {
      case 'wide':
      case 'wide_overthrow':
      case 'wide_bye':
      case 'wide_bye_overthrow':
      case 'wide_legbye':
      case 'wide_legbye_overthrow': {
        totalRuns += (extras?.wide || 0) + (extras?.overthrow || 0);
        break;
      }
      case 'noball_bye':
      case 'noball_bye_overthrow': {
        totalRuns += 1 + (extras?.bye || 0) + (extras?.overthrow || 0);
        break;
      }
      case 'noball':
      case 'noball_overthrow': {
        totalRuns += 1 + (runs || 0) + (extras?.overthrow || 0);
        break;
      }
      case 'noball_legbye':
      case 'noball_legbye_overthrow': {
        totalRuns += 1 + (extras?.legbye || 0) + (extras?.overthrow || 0);
        break;
      }
      case 'bye':
      case 'bye_overthrow': {
        totalRuns += (extras?.bye || 0) + (extras?.overthrow || 0);
        break;
      }
      case 'legbye':
      case 'legbye_overthrow': {
        totalRuns += (extras?.legbye || 0) + (extras?.overthrow || 0);
        break;
      }
      case 'normal':
      case 'normal_overthrow':
      case 'overthrow': {
        totalRuns += runs + (extras?.overthrow || 0);
        break;
      }
      default: {
        totalRuns += runs;
      }
    }

    if (legal) legalDeliveries++;
  });

  const overs = +(legalDeliveries / 6).toFixed(1);
  return { totalRuns, wickets, overs };
}

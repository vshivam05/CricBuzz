// import mongoose, { Schema, Document } from 'mongoose';

// interface Delivery {
//   type: string; 
//   runs: number;
//   extras?: {
//     wide?: number;
//     noball?: number;
//     bye?: number;
//     legbye?: number;
//     overthrow?: number;
//   };
//   batsmanRuns: number;
//   bowlerId: string;
//   batsmanId: string;
//   legal: boolean;
//   wicket?: {
//     kind: string;
//     playerOut: string;
//   };
// }

// export interface IMatch extends Document {
//   teamA: string;
//   teamB: string;
//   currentInnings: number;
//   deliveries: Delivery[];
//   score: {
//     totalRuns: number;
//     wickets: number;
//     overs: number;
//   };
// }

// const MatchSchema: Schema = new Schema({
//   teamA: { type: String, required: true },
//   teamB: { type: String, required: true },
//   currentInnings: { type: Number, default: 1 },
//   deliveries: [
//     {
//       type: { type: String, required: true },
//       runs: { type: Number, default: 0 },
//       extras: {
//         wide: Number,
//         noball: Number,
//         bye: Number,
//         legbye: Number,
//         overthrow: Number
//       },
//       batsmanRuns: Number,
//       bowlerId: String,
//       batsmanId: String,
//       legal: Boolean,
//       wicket: {
//         kind: String,
//         playerOut: String
//       }
//     }
//   ],
//   score: {
//     totalRuns: { type: Number, default: 0 },
//     wickets: { type: Number, default: 0 },
//     overs: { type: Number, default: 0 }
//   }
// });

// export default mongoose.model<IMatch>('Match', MatchSchema);


// Final Updated Match Schema with full player and match tracking
import mongoose, { Schema, Document } from 'mongoose';

interface PlayerStats {
  playerId: string;
  batting: {
    runs: number;
    balls: number;
    strikeRate: number;
  };
  bowling: {
    runsConceded: number;
    wickets: number;
    balls: number;
    overs: number;
    economy: number;
  };
}

interface Delivery {
  type: string;
  runs: number;
  extras?: {
    wide?: number;
    noball?: number;
    bye?: number;
    legbye?: number;
    overthrow?: number;
  };
  batsmanRuns: number;
  bowlerId: string;
  batsmanId: string;
  legal: boolean;
  fielderId?: string;
  wicket?: {
    kind: string;
    playerOut: string;
  };
}

export interface IMatch extends Document {
  teamA: string;
  teamB: string;
  currentInnings: number;
  currentOver: number;
  currentBall: number;
  striker: string;
  nonStriker: string;
  bowler: string;
  deliveries: Delivery[];
  score: {
    totalRuns: number;
    wickets: number;
    overs: number;
  };
  players: PlayerStats[];
}

const MatchSchema: Schema = new Schema({
  teamA: { type: String, required: true },
  teamB: { type: String, required: true },
  currentInnings: { type: Number, default: 1 },
  currentOver: { type: Number, default: 0 },
  currentBall: { type: Number, default: 0 },
  striker: { type: String, default: '' },
  nonStriker: { type: String, default: '' },
  bowler: { type: String, default: '' },
  deliveries: [
    {
      type: { type: String, required: true },
      runs: { type: Number, default: 0 },
      extras: {
        wide: Number,
        noball: Number,
        bye: Number,
        legbye: Number,
        overthrow: Number
      },
      batsmanRuns: Number,
      bowlerId: String,
      batsmanId: String,
      legal: Boolean,
      fielderId: String,
      wicket: {
        kind: String,
        playerOut: String
      }
    }
  ],
  score: {
    totalRuns: { type: Number, default: 0 },
    wickets: { type: Number, default: 0 },
    overs: { type: Number, default: 0 }
  },
  players: [
    {
      playerId: String,
      batting: {
        runs: { type: Number, default: 0 },
        balls: { type: Number, default: 0 },
        strikeRate: { type: Number, default: 0 }
      },
      bowling: {
        runsConceded: { type: Number, default: 0 },
        wickets: { type: Number, default: 0 },
        balls: { type: Number, default: 0 },
        overs: { type: Number, default: 0 },
        economy: { type: Number, default: 0 }
      }
    }
  ]
});

export default mongoose.model<IMatch>('Match', MatchSchema);

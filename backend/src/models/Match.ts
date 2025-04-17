import mongoose, { Schema, Document } from 'mongoose';

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
  wicket?: {
    kind: string;
    playerOut: string;
  };
}

export interface IMatch extends Document {
  teamA: string;
  teamB: string;
  currentInnings: number;
  deliveries: Delivery[];
  score: {
    totalRuns: number;
    wickets: number;
    overs: number;
  };
}

const MatchSchema: Schema = new Schema({
  teamA: { type: String, required: true },
  teamB: { type: String, required: true },
  currentInnings: { type: Number, default: 1 },
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
  }
});

export default mongoose.model<IMatch>('Match', MatchSchema);

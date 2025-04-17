import express from 'express';
import cors from 'cors';
import scoreRoutes from './routes/scoreRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/match', scoreRoutes);

export default app;
import express, { Request, Response } from 'express';
import {
  initMatch,
  addDelivery,
  getMatch,
  undoDelivery
} from '../controllers/scoreController.js';

const router = express.Router();

router.post('/init', initMatch);
router.post('/:id/score', addDelivery);
router.get('/:id', getMatch);
router.patch('/:id/undo', undoDelivery);

export default router;

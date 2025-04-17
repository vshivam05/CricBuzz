// import express, { Request, Response } from 'express';
// import {
//   initMatch,
//   addDelivery,
//   getMatch,
//   undoDelivery
// } from '../controllers/scoreController.js';

// const router = express.Router();

// router.post('/init', initMatch);
// router.post('/:id/score', addDelivery);
// router.get('/:id', getMatch);
// router.patch('/:id/undo', undoDelivery);

// export default router;
import express from 'express';
import {
  initMatch,
  addDelivery,
  getMatch,
  undoDelivery,
} from '../controllers/scoreController.js';

const router = express.Router();

// Create a new match
router.post('/init', initMatch);

// Add a new delivery to the match
router.post('/:id/delivery', addDelivery);

// Get match data
router.get('/:id', getMatch);

// Undo the last delivery
router.patch('/:id/undo', undoDelivery);

export default router;

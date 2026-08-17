import express from 'express';
import * as waterController from '../controllers/waterController.js';

const router = express.Router();

router.get('/today', waterController.getToday);
router.get('/history', waterController.getHistory);
router.post('/log', waterController.logWater);
router.delete('/log/:id', waterController.deleteWater);

export default router;

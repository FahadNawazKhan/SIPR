import express from 'express';
import * as nfcController from '../controllers/nfcController.js';

const router = express.Router();

router.get('/:tagId', nfcController.getTag);
router.post('/:tagId/log', nfcController.logNfcWater);

export default router;

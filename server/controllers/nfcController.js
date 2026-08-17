import * as waterService from '../services/waterService.js';

export const getTag = async (req, res, next) => {
  try {
    const { tagId } = req.params;
    const tag = await waterService.getNfcTag(tagId);
    res.json({
      success: true,
      data: tag
    });
  } catch (error) {
    next(error);
  }
};

export const logNfcWater = async (req, res, next) => {
  try {
    const { tagId } = req.params;
    const goalMl = req.body.goalMl ? Number(req.body.goalMl) : 3000;
    const data = await waterService.logNfcWater(tagId, goalMl);
    res.status(201).json({
      success: true,
      data
    });
  } catch (error) {
    next(error);
  }
};

import * as waterService from '../services/waterService.js';

export const getToday = async (req, res, next) => {
  try {
    const goalMl = req.query.goalMl ? Number(req.query.goalMl) : 3000;
    const data = await waterService.getTodayWater(goalMl);
    res.json({
      success: true,
      data
    });
  } catch (error) {
    next(error);
  }
};

export const logWater = async (req, res, next) => {
  try {
    const { amountMl } = req.body;
    const goalMl = req.body.goalMl ? Number(req.body.goalMl) : 3000;
    const data = await waterService.logWater(amountMl, 'manual', goalMl);
    res.status(201).json({
      success: true,
      data
    });
  } catch (error) {
    next(error);
  }
};

export const getHistory = async (req, res, next) => {
  try {
    const data = await waterService.getHistory();
    res.json({
      success: true,
      data
    });
  } catch (error) {
    next(error);
  }
};

export const deleteWater = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await waterService.deleteWater(id);
    res.json({
      success: true,
      data: deleted
    });
  } catch (error) {
    next(error);
  }
};

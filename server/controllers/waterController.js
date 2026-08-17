import WaterLog from '../models/WaterLog.js';

// Helper to get today's start and end date boundaries
function getTodayBoundaries() {
  const start = new Date();
  start.setHours(0, 0, 0, 0);

  const end = new Date();
  end.setHours(23, 59, 59, 999);

  return { start, end };
}

// GET /api/water/today
export async function getToday(req, res, next) {
  try {
    const goalMl = Number(req.query.goalMl) || 3000;
    const { start, end } = getTodayBoundaries();

    const logs = await WaterLog.find({
      createdAt: { $gte: start, $lte: end }
    }).sort({ createdAt: -1 });

    let totalMl = 0;
    for (const log of logs) {
      totalMl += log.amountMl;
    }

    const percentage = Math.round((totalMl / goalMl) * 100);
    const remainingMl = Math.max(0, goalMl - totalMl);
    const lastLog = logs.length > 0 ? logs[0] : null;

    res.json({
      success: true,
      data: {
        totalMl,
        goalMl,
        percentage,
        remainingMl,
        lastLog
      }
    });
  } catch (error) {
    next(error);
  }
}

// POST /api/water/log
export async function logWater(req, res, next) {
  try {
    const amountMl = Number(req.body.amountMl);
    const goalMl = Number(req.body.goalMl) || 3000;

    if (!amountMl || amountMl <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid water amount'
      });
    }

    const log = await WaterLog.create({
      amountMl,
      source: 'manual'
    });

    const { start, end } = getTodayBoundaries();
    const todayLogs = await WaterLog.find({
      createdAt: { $gte: start, $lte: end }
    });

    let todayTotalMl = 0;
    for (const item of todayLogs) {
      todayTotalMl += item.amountMl;
    }

    res.status(201).json({
      success: true,
      data: {
        log,
        todayTotalMl
      }
    });
  } catch (error) {
    next(error);
  }
}

// GET /api/water/history
export async function getHistory(req, res, next) {
  try {
    const logs = await WaterLog.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      data: logs
    });
  } catch (error) {
    next(error);
  }
}

// DELETE /api/water/log/:id
export async function deleteWater(req, res, next) {
  try {
    const { id } = req.params;
    const deletedLog = await WaterLog.findByIdAndDelete(id);

    if (!deletedLog) {
      return res.status(404).json({
        success: false,
        message: 'Water log not found'
      });
    }

    res.json({
      success: true,
      data: deletedLog
    });
  } catch (error) {
    next(error);
  }
}

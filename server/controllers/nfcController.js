import NfcTag from '../models/NfcTag.js';
import WaterLog from '../models/WaterLog.js';

// Helper to get today's start and end date boundaries
function getTodayBoundaries() {
  const start = new Date();
  start.setHours(0, 0, 0, 0);

  const end = new Date();
  end.setHours(23, 59, 59, 999);

  return { start, end };
}

// GET /api/nfc/:tagId
export async function getTag(req, res, next) {
  try {
    const { tagId } = req.params;
    const tag = await NfcTag.findOne({ tagId });

    if (!tag) {
      return res.status(404).json({
        success: false,
        message: "This NFC tag isn't registered with SIPR."
      });
    }

    res.json({
      success: true,
      data: tag
    });
  } catch (error) {
    next(error);
  }
}

// POST /api/nfc/:tagId/log
export async function logNfcWater(req, res, next) {
  try {
    const { tagId } = req.params;
    const tag = await NfcTag.findOne({ tagId });

    if (!tag) {
      return res.status(404).json({
        success: false,
        message: "This NFC tag isn't registered with SIPR."
      });
    }

    if (!tag.active) {
      return res.status(400).json({
        success: false,
        message: 'This NFC tag is currently disabled.'
      });
    }

    const log = await WaterLog.create({
      amountMl: tag.amountMl,
      source: 'nfc'
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
        todayTotalMl,
        tag
      }
    });
  } catch (error) {
    next(error);
  }
}

import express from 'express';
import { StorageService } from '../services/storage.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', requireAuth, async (req, res) => {
  try {
    const limit = req.query.limit || 50;
    const logs = await StorageService.getActivityLogs(limit);
    return res.json({ success: true, logs });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

export default router;

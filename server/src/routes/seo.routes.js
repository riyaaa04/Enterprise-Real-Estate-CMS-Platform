import express from 'express';
import { StorageService } from '../services/storage.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const seo = await StorageService.getSEO();
    return res.json({ success: true, seo: seo.data || seo });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

router.put('/', requireAuth, async (req, res) => {
  try {
    const { title, description, keywords, ogImage, canonicalUrl } = req.body;
    const updated = await StorageService.updateSEO({ title, description, keywords, ogImage, canonicalUrl }, req.user?.email || 'admin');
    return res.json({ success: true, message: 'SEO metadata updated successfully', seo: updated.data || updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

export default router;

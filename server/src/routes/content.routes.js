import express from 'express';
import { StorageService } from '../services/storage.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// Public: get all sections (published only, or draft if drafts=true and authenticated)
router.get('/all', async (req, res) => {
  try {
    const includeDrafts = req.query.drafts === 'true';
    const sections = await StorageService.getAllSections(includeDrafts);
    
    // Transform into a convenient key-value map plus full list
    const sectionMap = {};
    sections.forEach(s => {
      sectionMap[s.key] = s.data;
    });

    return res.json({
      success: true,
      sections,
      data: sectionMap
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to retrieve sections', error: error.message });
  }
});

// Public: get a single section by key
router.get('/:section', async (req, res) => {
  try {
    const { section } = req.params;
    const includeDrafts = req.query.drafts === 'true';
    const data = await StorageService.getSectionByKey(section, includeDrafts);
    if (!data) {
      return res.status(404).json({ success: false, message: `Section '${section}' not found` });
    }
    return res.json({ success: true, section: data });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// Admin: Update section content (can save as draft or publish directly)
router.put('/:section', requireAuth, async (req, res) => {
  try {
    const { section } = req.params;
    const { data, title, subtitle, saveAsDraft } = req.body;
    const user = req.user?.email || 'admin';

    if (!data && data !== null) {
      return res.status(400).json({ success: false, message: 'Missing section data payload' });
    }

    const updated = await StorageService.saveSection(section, { data, title, subtitle }, Boolean(saveAsDraft), user);

    return res.json({
      success: true,
      message: saveAsDraft ? `Draft saved for section '${section}'` : `Section '${section}' published successfully`,
      section: updated
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// Admin: Publish an existing draft to live
router.post('/:section/publish', requireAuth, async (req, res) => {
  try {
    const { section } = req.params;
    const user = req.user?.email || 'admin';
    const published = await StorageService.publishSection(section, user);
    if (!published) {
      return res.status(404).json({ success: false, message: `Section '${section}' not found` });
    }
    return res.json({
      success: true,
      message: `Section '${section}' draft is now published live`,
      section: published
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

export default router;

import express from 'express';
import { body, validationResult } from 'express-validator';
import { StorageService } from '../services/storage.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// Public: Submit inquiry form
router.post(
  '/',
  [
    body('name').trim().notEmpty().withMessage('Full name is required.'),
    body('email').trim().isEmail().withMessage('A valid email address is required.'),
    body('phone').trim().isLength({ min: 10 }).withMessage('A valid 10-digit phone number is required.')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array(), message: errors.array()[0].msg });
    }

    try {
      const inquiry = await StorageService.createInquiry(req.body);
      return res.status(201).json({
        success: true,
        message: 'Thank you for your interest! Our Senior Relationship Manager will connect with you shortly.',
        inquiry
      });
    } catch (error) {
      console.error('Inquiry creation error:', error);
      return res.status(500).json({ success: false, message: 'Server error saving inquiry. Please try again.' });
    }
  }
);

// Admin: Get all inquiries with filtering & search
router.get('/', requireAuth, async (req, res) => {
  try {
    const { search = '', status = '', page = 1, limit = 50 } = req.query;
    const result = await StorageService.getInquiries({ search, status, page, limit });
    return res.json({ success: true, ...result });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// Admin: Export inquiries as CSV
router.get('/export', requireAuth, async (req, res) => {
  try {
    const { items } = await StorageService.getInquiries({ limit: 1000 });
    const fields = ['Name', 'Email', 'Phone', 'BHK Preference', 'Budget', 'Source', 'Status', 'Date', 'Message'];
    const csvRows = [fields.join(',')];

    items.forEach(i => {
      const row = [
        `"${(i.name || '').replace(/"/g, '""')}"`,
        `"${(i.email || '').replace(/"/g, '""')}"`,
        `"${(i.phone || '').replace(/"/g, '""')}"`,
        `"${(i.bhkPreference || '').replace(/"/g, '""')}"`,
        `"${(i.budget || '').replace(/"/g, '""')}"`,
        `"${(i.source || '').replace(/"/g, '""')}"`,
        `"${(i.status || '').replace(/"/g, '""')}"`,
        `"${new Date(i.createdAt).toLocaleString()}"`,
        `"${(i.message || '').replace(/"/g, '""')}"`
      ];
      csvRows.push(row.join(','));
    });

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="codename_one_inquiries.csv"');
    return res.status(200).send(csvRows.join('\n'));
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Export failed' });
  }
});

// Admin: Update status
router.patch('/:id/status', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const allowed = ['new', 'contacted', 'scheduled', 'closed'];
    if (!allowed.includes(status)) {
      return res.status(400).json({ success: false, message: `Invalid status. Must be one of: ${allowed.join(', ')}` });
    }
    const updated = await StorageService.updateInquiryStatus(id, status, req.user?.email || 'admin');
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Inquiry not found' });
    }
    return res.json({ success: true, message: 'Status updated', inquiry: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// Admin: Delete inquiry
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    await StorageService.deleteInquiry(id, req.user?.email || 'admin');
    return res.json({ success: true, message: 'Inquiry deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

export default router;

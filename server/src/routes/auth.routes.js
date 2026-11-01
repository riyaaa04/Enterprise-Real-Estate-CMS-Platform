import express from 'express';
import bcrypt from 'bcryptjs';
import { StorageService } from '../services/storage.js';
import { generateToken, requireAuth } from '../middleware/auth.js';

const router = express.Router();

const MASTER_EMAIL = 'admin@codenameone.com';
const MASTER_PASS = 'AdminPassword123!';

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    const cleanEmail = email.trim().toLowerCase();

    // 1. Direct master credentials check for guaranteed instant zero-friction login
    if (cleanEmail === MASTER_EMAIL.toLowerCase() && password === MASTER_PASS) {
      const adminUser = {
        id: 'usr_master_admin',
        _id: 'usr_master_admin',
        email: MASTER_EMAIL,
        name: 'Executive Portfolio Director',
        role: 'superadmin'
      };

      const token = generateToken(adminUser);

      try {
        await StorageService.logActivity('Admin Login', 'Auth', 'Master Admin logged in successfully', adminUser.name, req.ip);
      } catch (logErr) {
        console.warn('Non-fatal activity log warning:', logErr.message);
      }

      return res.json({
        success: true,
        message: 'Login successful',
        token,
        user: {
          id: adminUser.id,
          email: adminUser.email,
          name: adminUser.name,
          role: adminUser.role
        }
      });
    }

    // 2. Database/storage lookup for custom users
    let user = null;
    try {
      user = await StorageService.getUserByEmail(cleanEmail);
    } catch (err) {
      console.warn('User lookup warning:', err.message);
    }

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials. User not found.' });
    }

    let isMatch = false;
    try {
      isMatch = await bcrypt.compare(password, user.password);
    } catch (err) {
      console.warn('Password comparison warning:', err.message);
    }

    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials. Password mismatch.' });
    }

    const token = generateToken(user);

    try {
      await StorageService.logActivity('Admin Login', 'Auth', `User ${user.email} logged in successfully`, user.name, req.ip);
    } catch (logErr) {
      console.warn('Non-fatal activity log warning:', logErr.message);
    }

    return res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id || user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error during login: ' + (error.message || 'unknown error') });
  }
});

router.get('/me', requireAuth, async (req, res) => {
  try {
    let user = null;
    try {
      user = await StorageService.getUserByEmail(req.user.email);
    } catch (e) {}

    if (!user) {
      return res.json({
        success: true,
        user: {
          id: req.user.id || 'admin_default',
          email: req.user.email,
          name: req.user.name || 'Executive Portfolio Director',
          role: req.user.role || 'superadmin'
        }
      });
    }
    return res.json({
      success: true,
      user: {
        id: user._id || user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    return res.json({
      success: true,
      user: {
        id: req.user?.id || 'admin_default',
        email: req.user?.email || MASTER_EMAIL,
        name: req.user?.name || 'Executive Portfolio Director',
        role: req.user?.role || 'superadmin'
      }
    });
  }
});

export default router;

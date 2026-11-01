import express from 'express';
import bcrypt from 'bcryptjs';
import { StorageService } from '../services/storage.js';
import { generateToken, requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    const user = await StorageService.getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials. User not found.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials. Password mismatch.' });
    }

    const token = generateToken(user);
    await StorageService.logActivity('Admin Login', 'Auth', `User ${user.email} logged in successfully`, user.name, req.ip);

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
    return res.status(500).json({ success: false, message: 'Internal server error during login.' });
  }
});

router.get('/me', requireAuth, async (req, res) => {
  try {
    const user = await StorageService.getUserByEmail(req.user.email);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
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
    return res.status(500).json({ success: false, message: 'Error retrieving user profile.' });
  }
});

export default router;

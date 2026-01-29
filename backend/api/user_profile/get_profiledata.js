import express from 'express';
import Profile from '../../models/profile.js';
import process from 'process';
const router = express.Router();

// POST /api/login
router.get('/updateProfile', async (req, res) => {
    try {
        // Find user by username
        const user_data = await Profile.findOne({ userId:req.userId });
        res.json({ success: true, message: 'user data found successfully',data:user_data });
    } catch (err) {
        console.error('login error');
        const message = process.env.NODE_ENV === 'production' ? 'Server error' : err.message;
        res.status(500).json({message});
    }
});

export default router;
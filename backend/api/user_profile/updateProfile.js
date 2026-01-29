import express from 'express';
// import jwt from 'jsonwebtoken';
import Profile from '../../models/profile.js';
import process from 'process';
import bcrypt from 'bcryptjs';
const router = express.Router();

// POST /api/login
router.post('/updateProfile', async (req, res) => {
    const { username,bio,profile_picture} = req.body;

    try {
        // Find user by username
        Profile.updateOne(
            { username: username },          // filter
            { $set: { displayName: displayName,bio:bio,profile_picture:profile_picture } } // update
        );
        res.json({ success: true, message: 'user_info saved successfully' });
    } catch (err) {
        console.error('login error');
        const message = process.env.NODE_ENV === 'production' ? 'Server error' : err.message;
        res.status(500).json({message});
    }
});

export default router;
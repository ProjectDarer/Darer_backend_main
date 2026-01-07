import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import process from 'process';
import bcrypt from 'bcryptjs';
const router = express.Router();

// POST /api/login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by username
        const user = await User.findOne({ email});
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid username' });
        }
        const ismatch = await bcrypt.compare(password,user.password);
        if(!ismatch){
            return res.status(401).json({ success: false, message: 'Invalid password' });
        }
        const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        });

        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'none',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.json({ success: true, message: 'Login successful' });
    } catch (err) {
        console.error('login error');
        const message = process.env.NODE_ENV === 'production' ? 'Server error' : err.message;
        res.status(500).json({message});
    }
});

export default router;
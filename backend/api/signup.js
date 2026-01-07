import express from 'express';
// import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import process from 'process';
import bcrypt from 'bcryptjs';
const router = express.Router();

// POST /api/signup
router.post('/signup', async (req, res) => {
    const { username, password, phone, dob } = req.body;
    
    try {
        // Check if user already exists
        if(!username){
            return res.status(400).json({message:'username is required'});
        }
        if(!password){
            return res.status(400).json({message:'password is required'});
        }
        if(!phone){
            return res.status(400).json({message:'phone number is required'});
        }
        if(!dob){
            return res.status(400).json({message:'dob is required'});
        }
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.json({ exists: true });
        }
        
        // Create new user
        const hashed = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password:hashed, phone, dob });
        await newUser.save();
        res.json({ exists: false });
    } catch (err) {
        console.error('signup error');
        const message = process.env.NODE_ENV === 'production' ? 'Server error' : err.message;
        res.status(500).json({message});
    }
});

export default router;
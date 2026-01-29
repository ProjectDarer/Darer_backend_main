import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../../models/User.js';
import process from 'process';
import bcrypt from 'bcryptjs';
const router = express.Router();
import Profile from '../../models/profile.js'


router.post('', async (req, res) => {
    const { email,username, password,dob } = req.body;
    
    try {
        // Check if user already exists
        if(!email){
            return res.status(400).json({message:'email is required'});
        }
        if(!username){
            return res.status(400).json({message:'username is required'});
        }
        if(!password){
            return res.status(400).json({message:'password is required'});
        }
        if(!dob){
            return res.status(400).json({message:'dob is required'});
        }
        console.log("user verifying")
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({ exists: true });
        }
        console.log("he is a new user");
        // Create new user
        const hashed = await bcrypt.hash(password, 10);
        const newUser = new User({ email,username, password:hashed,dob });
        // const newProfile = new Profile({username,email});
        await newUser.save();
        // await newProfile.save();
        console.log("new user created")
        const token = jwt.sign(
            { userId: newUser._id },  
            process.env.JWT_SECRET,
            { expiresIn: "7d" },

        );
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,     // localhost
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        console.log("Set-Cookie header:", res.getHeader("Set-Cookie"));
        res.json({ message: "Signup successful" });
        console.log("everything working");
    } catch (err) {
        console.error('signup error');
        const message = process.env.NODE_ENV === 'production' ? 'Server error' : err.message;
        res.status(500).json({message});
    }
});

export default router;
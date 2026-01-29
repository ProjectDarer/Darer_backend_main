import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../../models/User.js';
import process from 'process';
import bcrypt from 'bcryptjs';
const router = express.Router();

// POST /api/login
router.post('', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by username
        const user = await User.findOne({ email});
        console.log("user found");
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid username' });
        }
        const ismatch = await bcrypt.compare(password,user.password);
        if(!ismatch){
            return res.status(401).json({ success: false, message: 'Invalid password' });
        }
        console.log("he is in db");
        const token = jwt.sign(
            { userId: user._id }, 
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,     // localhost
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: "/"
        });
        console.log("Set-Cookie header:", res.getHeader("Set-Cookie"));
        // console.log(token);
        console.log("token created");
        res.json({ success: true, message: 'Login successful'});
    } catch (err) {
        console.error('login error');
        const message = process.env.NODE_ENV === 'production' ? 'Server error' : err.message;
        res.status(500).json({message});
    }
});

export default router;
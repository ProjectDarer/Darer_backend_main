import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../../models/User.js';
import process from 'process';
import bcrypt from 'bcryptjs';
const router = express.Router();

// POST /api/login
router.post("", (req, res) => {
    try{
        res.clearCookie("token", {
          httpOnly: true,
          secure: false,       // true in production (https)
          sameSite: "lax",
        });
      
        res.status(200).json({
          success: true,
          message: "Logged out successfully",
        });
    }
    catch(err){
        console.error('unable to logout::: ',err);
        const message = process.env.NODE_ENV === 'production' ? 'Server error' : err.message;
        res.status(500).json({message});
    }
});


export default router;
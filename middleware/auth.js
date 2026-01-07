import jwt from "jsonwebtoken";
import process from 'process';
export const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({message: "Not authenticated"});

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;  // attach user info to req
        next();
    } catch (err) {
        res.status(401).json({message: "Invalid or expired token",err});
    }
};

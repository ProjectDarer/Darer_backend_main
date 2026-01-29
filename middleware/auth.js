import jwt from "jsonwebtoken";
import User from "../backend/models/User.js";

export const authMiddleware = async (req, res, next) => {
  try {
    let token;
    console.log("just entered middleware");
    // 1️⃣ Get token (cookie OR header)
    console.log("Cookies:", req.cookies);
    // console.log("Authorization:", req.headers.authorization);

    if (req.cookies?.token) {
      token = req.cookies.token;
      console.log(token);
    } else if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      console.log("some problem with token");
      return res.status(401).json({ message: "Not authenticated" });
    }
    console.log("token found");
    // 2️⃣ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("token verified");
    // 3️⃣ Find user
    const user_found = await User.findById(decoded.userId).select("-password");
    if (!user_found) {
      return res.status(401).json({ message: "User not found" });
    }
    console.log("token user found");
    // 4️⃣ Attach user to request
    req.user = user_found;
    next();

  } catch (err) {
    console.error("Auth middleware error:", err.message);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

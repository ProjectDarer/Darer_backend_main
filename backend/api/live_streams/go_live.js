import express from "express";
import mongoose from "mongoose";
import { AccessToken } from "livekit-server-sdk";
import liveStream from "../../models/liveStream.js";
import { uploadThumbnail } from "../../../middleware/upload.js";
const router = express.Router();

/* ------------------ GO LIVE API ------------------ */
router.post("",uploadThumbnail.single("thumbnail"),async (req, res) => {
  try {
    console.log('printing from live route');
    console.log(req.user);
     const thumbnailUrl = req.file
        ? `/uploads/thumbnails/${req.file.filename}`
        : "";
    const { title} = req.body;
    console.log("thumbnail from streamer frontend: ",thumbnailUrl);
    // 1️⃣ Create unique room
    const roomName = `live_${req.user._id}`;
    const alreadyLive = await liveStream.findOne({
      host: req.user.id,
      isLive: true,
    });

    if (alreadyLive) {
      return res.status(400).json({ message: "Already live" });
    }

    // 2️⃣ Save stream to DB
    const stream = await liveStream.create({
      host: req.user.id,
      title,
      roomName,
      isLive: true,
      thumbnail : thumbnailUrl,
      startedAt: new Date(),
    });

    // 3️⃣ Create LiveKit token
    const token = new AccessToken(
      process.env.LIVEKIT_API_KEY,
      process.env.LIVEKIT_API_SECRET,
      { identity: req.user.id }
    );
    
    token.addGrant({
      roomJoin: true,
      room: roomName,
      canPublish: true
    });
    const og_token = await token.toJwt();
    const og_wsUrl = process.env.LIVEKIT_WS_URL;

    console.log("the wsUrl is: ",og_wsUrl);
    console.log("the token is: ",og_token);

    // 4️⃣ Send response to frontend
    res.json({
      success: true,
      streamId: stream._id,
      roomName,
      token: og_token,
      wsUrl: og_wsUrl
    });
    console.log("everything is sent to streamer_frontend");
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to start live stream" });
  }
});

export default router;

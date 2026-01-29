import express from "express";
import { AccessToken } from "livekit-server-sdk";
import LiveStream from "../../models/liveStream.js";

const router = express.Router();

/* ------------------ JOIN LIVE (WATCHER) ------------------ */
router.post("/join", async (req, res) => {
  try {
    const { streamId } = req.body;

    // 1️⃣ Fetch stream from DB
    const stream = await LiveStream.findById(streamId);
    if (!stream || !stream.isLive) {
      return res.status(404).json({ message: "Stream is not live" });
    }

    // 2️⃣ Create LiveKit viewer token
    const token = new AccessToken(
      process.env.LIVEKIT_API_KEY,
      process.env.LIVEKIT_API_SECRET,
      {
        identity: `viewer_${req.user._id}`,
        ttl: 60 * 60
      }
    );

    token.addGrant({
      room: stream.roomName,
      roomJoin: true,
      canPublish: false,
      canSubscribe: true
    });

    // 3️⃣ Send details
    res.json({
      token: token.toJwt(),
      roomName: stream.roomName,
      wsUrl: process.env.LIVEKIT_WS_URL
    });

  } catch (err) {
    console.error("Join live error:", err);
    res.status(500).json({ message: "Failed to join live" });
  }
});

export default router;

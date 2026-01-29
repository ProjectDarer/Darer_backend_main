import express from 'express';
// const router = express.Router();
import LiveStream from "../../models/liveStream"

export const listActiveStreams = async (req, res) => {
  try {
    const streams = await LiveStream.find({ isLive: true })
      .populate("host", "username"); // optional: show host name

    res.json(streams);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch streams" });
  }
};

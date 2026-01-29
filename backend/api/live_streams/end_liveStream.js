import express from 'express';
import liveStream from '../../models/liveStream';

export const endLiveStream = async (req, res) => {
  try {
    const { streamId } = req.params;

    const stream = await liveStream.findById(streamId);
    if (!stream) return res.status(404).json({ message: "Stream not found" });

    // Only host can end stream
    if (stream.host.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    stream.isLive = false;
    await stream.save();

    res.json({ message: "Stream ended successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to end live stream" });
  }
};

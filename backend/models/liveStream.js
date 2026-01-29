// models/LiveStream.js
import mongoose from "mongoose";
const LiveStreamSchema = new mongoose.Schema({
  host: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  title: String,
  roomName: String,
  status: {
    type: String,
    enum: ["live", "ended"],
    default: "live"
  },
  thumbnail: {
  type: String, 
  default: ""  // image URL
  },
  viewersCount: {
    type: Number,
    default: 0
  },
  startedAt: {
    type: Date,
    default: Date.now
  },
  endedAt: Date
});

export default mongoose.model('LiveStreamers', LiveStreamSchema);

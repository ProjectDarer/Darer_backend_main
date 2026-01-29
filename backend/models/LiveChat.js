import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  liveId: mongoose.Schema.Types.ObjectId,
  userId: mongoose.Schema.Types.ObjectId,
  message: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("LiveChat", chatSchema);

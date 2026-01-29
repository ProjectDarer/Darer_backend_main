import mongoose from "mongoose";

const walletSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  balance: { type: Number, default: 0 } // stored in paise/cents
});

export default mongoose.model("Wallet", walletSchema);

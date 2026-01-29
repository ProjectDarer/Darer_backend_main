// Payment Schema
import mongoose from "mongoose";
const TransactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",        // reference to User model
    required: true,
    index: true
  },
  amount: Number,
  currency: String,
  status: String,
  paymentIntentId: String,
},{timestamps:true});

export default mongoose.model('Transaction', TransactionSchema);
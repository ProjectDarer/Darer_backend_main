// Payment Schema
const PaymentSchema = new mongoose.Schema({
  amount: Number,
  currency: String,
  status: String,
  paymentIntentId: String,
});

const Payment = mongoose.model("Payment", PaymentSchema);
import express from "express";
import stripe from "../config/stripe.js";
import Transaction from "../models/Transaction.js";

const router = express.Router();

router.post("/create-payment-intent", async (req, res) => {
  try {
    const { amount } = req.body;

    // ✅ Validate amount
    if (!amount || amount < 10) {
      return res.status(400).json({ error: "Minimum 10$ required" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // ₹ → paise
      currency: "inr",
      automatic_payment_methods: { enabled: true },
      metadata: {
        userId: req.user.id
      }
    });

    // Optional: save pending transaction
    await Transaction.create({
      userId: req.user.id,
      amount: amount * 100,
      currency: "inr",
      stripePaymentIntentId: paymentIntent.id,
      status: "pending"
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

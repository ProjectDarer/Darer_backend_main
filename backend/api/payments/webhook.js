import express from "express";
import stripe from "../../config/stripe.js";
import Wallet from "../../models/Wallet.js";
import Transaction from "../../models/Transaction.js";

const router = express.Router();

router.post("/webhook",express.raw({ type: "application/json" }),async (req, res) => {
    const sig = req.headers["stripe-signature"];

    let event;
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "payment_intent.succeeded") {
      const intent = event.data.object;
      const userId = intent.metadata.userId;

      // Update wallet
      await Wallet.findOneAndUpdate(
        { userId },
        { $inc: { balance: intent.amount_received } },
        { upsert: true }
      );

      // Update transaction
      await Transaction.findOneAndUpdate(
        { stripePaymentIntentId: intent.id },
        { status: "success" }
      );
    }

    res.json({ received: true });
  }
);

export default router;

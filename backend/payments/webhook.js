import express from "express";
import stripe from "../../stripe";


const router = express.Router();

router.post(
  "/webhook",
  bodyParser.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];

    let event;
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_BACKEND_SECRET
      );
    } catch (err) {
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    const paymentIntent = event.data.object;

    if (event.type === "payment_intent.succeeded") {
      await Payment.findOneAndUpdate(
        { paymentIntentId: paymentIntent.id },
        { status: "success" }
      );
    }

    if (event.type === "payment_intent.payment_failed") {
      await Payment.findOneAndUpdate(
        { paymentIntentId: paymentIntent.id },
        { status: "failed" }
      );
    }

    res.json({ received: true });
  }
);


export default router;
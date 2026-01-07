import express from "express";
import stripe from "../../stripe";


const router = express.Router();

router.post("/create_payment_intent",async(req,res)=>{
    try{
        const {amount,currency} = req.body;
        if (!amount || amount < 1) {
            return res.status(400).json({ error: "Invalid amount" });
        }
        // Convert to smallest unit (₹ → paise, $ → cents)
        amount = Math.round(amount * 100); 
         // Create PaymentIntent in Stripe
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,        // amount in paise (₹499 = 49900)
            currency: currency,
            automatic_payment_methods: {
                enabled: true,
            },
        });

        const new_payment =  new Payment({
            amount,
            currency: "inr",
            status: "pending",
            paymentIntentId: paymentIntent.id,
        });
        new_payment.save();

        // Send client_secret to frontend
        res.status(200).json({
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id,
        });
    }
    catch(error){
        console.error("Stripe Error:", error.message);
        res.status(500).json({ error: error.message });
    }

});


export default router;

// Creates a secure, server-side Stripe client that allows your backend to talk to Stripe

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_BACKEND_KEY,{
    apiVersion: "2023-10-16"
});

export default stripe;



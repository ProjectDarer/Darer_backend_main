import express from "express"
import Stripe from "stripe"


const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_FRONTEND_KEY);

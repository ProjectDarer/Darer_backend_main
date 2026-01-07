import express from express
import Stripe from "stripe"


const router = express.Router();
const stripe = new stripe(process.env.STRIPE_FRONTENd_KEY);

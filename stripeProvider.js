import { loadStripe } from "@stripe/stripe-js";

export const stripePromise = loadStripe(".env.STRIPE_FRONTEND_KEY");


// helps us to maintain stripe context in here
import Stripe from 'stripe';

export const getStripeInstance = () => {
    if (!process.env.STRIPE_SECRET_KEY) {
        throw new Error('Stripe Secret Key is not defined in environment variables.');
    }

    return new Stripe(process.env.STRIPE_SECRET_KEY);
};

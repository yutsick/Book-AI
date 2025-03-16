'use client';

import React, { useEffect, useState } from 'react';
import {
    EmbeddedCheckout,
    EmbeddedCheckoutProvider
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

export default function Checkout({ totalPrice, quantity, returnUrl, draftUUID }) {
    const [clientSecret, setClientSecret] = useState('');
    const [stripePromise, setStripePromise] = useState(null);

    useEffect(() => {
        const fetchStripeKey = async () => {
            try {
                const res = await fetch('/api/stripe-publishable-key');
                const data = await res.json();

                if (data.publishableKey) {
                    const stripe = await loadStripe(data.publishableKey);
                    setStripePromise(stripe);
                } else {
                    console.error('Stripe publishable key not found:', data.error);
                }
            } catch (error) {
                console.error('Error fetching Stripe key:', error);
            }
        };

        fetchStripeKey();
    }, []);

    useEffect(() => {
        const createCheckoutSession = async () => {
            try {
                const res = await fetch('/api/stripe', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        totalPrice,
                        quantity,
                        returnUrl,
                        draftUUID,
                    }),
                });

                const data = await res.json();
                if (data.clientSecret) {
                    setClientSecret(data.clientSecret);
                } else {
                    console.error('Failed to fetch client secret:', data.error);
                }
            } catch (error) {
                console.error('Error creating checkout session:', error);
            }
        };

        if (stripePromise) {
            createCheckoutSession();
        }
    }, [totalPrice, quantity, returnUrl, draftUUID, stripePromise]);

    if (!clientSecret || !stripePromise) {
        return    <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-amber-600 border-opacity-50"></div>
      </div>
    }

    return (
        <div id="checkout">
            <EmbeddedCheckoutProvider
                stripe={stripePromise}
                options={{ clientSecret }}
            >
                <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
        </div>
    );
}

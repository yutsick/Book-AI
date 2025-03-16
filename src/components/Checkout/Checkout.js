'use client';

import React, { useEffect, useState } from 'react';
import {
    EmbeddedCheckout,
    EmbeddedCheckoutProvider
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
export default function Checkout({ totalPrice, quantity, returnUrl, draftUUID }) {
    const [clientSecret, setClientSecret] = useState('');

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

        createCheckoutSession();
    }, [totalPrice, quantity, returnUrl]);

    if (!clientSecret) {
        return <div>Loading payment details...</div>;
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

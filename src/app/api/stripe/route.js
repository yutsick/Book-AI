import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
    try {
        const { totalPrice, quantity, returnUrl, draftUUID } = await req.json();

        if (!totalPrice || !quantity || !returnUrl || !draftUUID) {
       
            return new Response(JSON.stringify({ error: 'Missing required fields' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const session = await stripe.checkout.sessions.create({
            ui_mode: 'embedded',
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'Custom Book Order',
                        },
                        unit_amount: totalPrice * 100, // Stripe очікує суму в найменших одиницях
                    },
                    quantity: quantity,
                },
            ],
            mode: 'payment',
            return_url: `${returnUrl}?session_id={CHECKOUT_SESSION_ID}`,
            automatic_tax: { enabled: true },
            metadata: {
              draftUUID, 
          },
        });

        return new Response(JSON.stringify({ clientSecret: session.client_secret, sessionId: session.id }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error('Stripe Error:', error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

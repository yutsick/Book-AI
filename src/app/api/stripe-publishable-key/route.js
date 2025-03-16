export async function GET() {
  const publishableKey = process.env.STRIPE_PUBLISHABLE_KEY;

  if (!publishableKey) {
      return new Response(JSON.stringify({ error: 'Stripe publishable key is missing' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
      });
  }

  return new Response(JSON.stringify({ publishableKey }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
  });
}

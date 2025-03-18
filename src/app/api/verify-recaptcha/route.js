export async function POST(req) {
  const { token } = await req.json();

  if (!token) {
    return Response.json({ error: "Missing token" }, { status: 400 });
  }

  const SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;

  const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      secret: SECRET_KEY,
      response: token,
    }),
  });

  const data = await response.json();

  if (!data.success) {
    return Response.json({ error: "Failed reCAPTCHA verification" }, { status: 400 });
  }

  return Response.json({ success: true }, { status: 200 });
}

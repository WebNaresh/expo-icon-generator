import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/unsubscribe?email=user@example.com — one-click from email links
export async function GET(request: NextRequest) {
  const email = request.nextUrl.searchParams.get("email");
  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const normalized = email.trim().toLowerCase();

  try {
    await prisma.subscriber.deleteMany({ where: { email: normalized } });
  } catch (err) {
    console.error("Unsubscribe error:", err);
  }

  return new NextResponse(
    `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Unsubscribed | Expo Icon Generator</title>
  <style>
    body { font-family: sans-serif; background: #030712; color: #f9fafb;
           display: flex; align-items: center; justify-content: center;
           min-height: 100vh; margin: 0; }
    .card { background: #111827; border: 1px solid #1f2937; border-radius: 12px;
            padding: 40px; max-width: 400px; text-align: center; }
    h1 { color: #fff; margin-bottom: 12px; }
    p { color: #9ca3af; }
    a { color: #38bdf8; text-decoration: none; }
  </style>
</head>
<body>
  <div class="card">
    <h1>You've been unsubscribed</h1>
    <p>You won't receive any more update emails from Expo Icon Generator.</p>
    <p style="margin-top:24px">
      <a href="https://expo-assets-generator.vercel.app">← Back to Expo Icon Generator</a>
    </p>
  </div>
</body>
</html>`,
    { status: 200, headers: { "Content-Type": "text/html" } }
  );
}

// DELETE /api/unsubscribe — JSON body { email }
export async function DELETE(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { email } = body as { email?: string };
  if (!email || typeof email !== "string") {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  try {
    const normalized = email.trim().toLowerCase();
    await prisma.subscriber.deleteMany({ where: { email: normalized } });
    return NextResponse.json({ success: true, message: "You have been unsubscribed." });
  } catch (err) {
    console.error("Unsubscribe error:", err);
    return NextResponse.json(
      { error: "Failed to unsubscribe. Please try again later." },
      { status: 500 }
    );
  }
}

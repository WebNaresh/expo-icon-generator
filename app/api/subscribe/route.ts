import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: NextRequest) {
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

  const normalized = email.trim().toLowerCase();

  if (!isValidEmail(normalized)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  try {
    const existing = await prisma.subscriber.findUnique({
      where: { email: normalized },
    });

    if (existing) {
      return NextResponse.json(
        { success: true, message: "You are already subscribed!" },
        { status: 200 }
      );
    }

    await prisma.subscriber.create({ data: { email: normalized } });

    return NextResponse.json(
      {
        success: true,
        message: "You're subscribed! You'll get notified when we release updates.",
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Subscribe error:", err);
    return NextResponse.json(
      { error: "Failed to subscribe. Please try again later." },
      { status: 500 }
    );
  }
}

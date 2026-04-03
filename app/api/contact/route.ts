import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, message } = body;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }

  // Basic email format validation
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRe.test(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  await prisma.contactMessage.create({
    data: { name: name.trim(), email: email.trim(), message: message.trim() },
  });

  return NextResponse.json({ ok: true });
}

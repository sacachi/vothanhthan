import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

async function getAdmin() {
  const session = await auth();
  if (!session?.user?.name) return null;
  return prisma.admin.findUnique({ where: { username: session.user.name } });
}

// GET current admin info
export async function GET() {
  const admin = await getAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json({ id: admin.id, username: admin.username });
}

// PATCH: { username } → rename  |  { currentPassword, newPassword } → change password
export async function PATCH(req: NextRequest) {
  const admin = await getAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();

  // Change username
  if ("username" in body) {
    const { username } = body as { username: string };
    if (!username || username.trim().length < 3) {
      return NextResponse.json({ error: "Username must be at least 3 characters" }, { status: 400 });
    }
    const exists = await prisma.admin.findFirst({
      where: { username: username.trim(), NOT: { id: admin.id } },
    });
    if (exists) return NextResponse.json({ error: "Username already taken" }, { status: 409 });
    await prisma.admin.update({ where: { id: admin.id }, data: { username: username.trim() } });
    return NextResponse.json({ ok: true });
  }

  // Change password
  if ("currentPassword" in body) {
    const { currentPassword, newPassword } = body as { currentPassword: string; newPassword: string };
    if (!currentPassword || !newPassword) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    if (newPassword.length < 8) {
      return NextResponse.json({ error: "New password must be at least 8 characters" }, { status: 400 });
    }
    const valid = await bcrypt.compare(currentPassword, admin.password);
    if (!valid) return NextResponse.json({ error: "Current password is incorrect" }, { status: 400 });
    const hashed = await bcrypt.hash(newPassword, 12);
    await prisma.admin.update({ where: { id: admin.id }, data: { password: hashed } });
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: "Invalid request" }, { status: 400 });
}

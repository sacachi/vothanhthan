import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

async function requireAuth() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return null;
}

// GET gallery by id with images
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const gallery = await prisma.gallery.findUnique({
    where: { id: Number(id) },
    include: { images: { orderBy: { order: "asc" } } },
  });
  if (!gallery) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(gallery);
}

// PATCH update gallery
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = await requireAuth();
  if (authError) return authError;

  const { id } = await params;
  const body = await req.json();
  const gallery = await prisma.gallery.update({
    where: { id: Number(id) },
    data: body,
  });
  return NextResponse.json(gallery);
}

// DELETE gallery
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = await requireAuth();
  if (authError) return authError;

  const { id } = await params;
  await prisma.gallery.delete({ where: { id: Number(id) } });
  return NextResponse.json({ ok: true });
}

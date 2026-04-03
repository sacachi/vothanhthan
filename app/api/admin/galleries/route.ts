import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

async function requireAuth() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return null;
}

// GET all galleries
export async function GET() {
  const galleries = await prisma.gallery.findMany({
    orderBy: [{ category: "asc" }, { order: "asc" }],
    include: { _count: { select: { images: true } } },
  });
  return NextResponse.json(galleries);
}

// POST create gallery
export async function POST(req: NextRequest) {
  const authError = await requireAuth();
  if (authError) return authError;

  const body = await req.json();
  const { slug, nameEn, nameVi, category, order } = body;

  if (!slug || !nameEn || !nameVi || !category) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const gallery = await prisma.gallery.create({
    data: { slug, nameEn, nameVi, category, order: order ?? 0 },
  });
  return NextResponse.json(gallery, { status: 201 });
}

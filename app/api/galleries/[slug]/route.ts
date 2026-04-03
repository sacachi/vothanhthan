import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const gallery = await prisma.gallery.findUnique({
    where: { slug },
    include: { images: { orderBy: { order: "asc" } } },
  });
  if (!gallery) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(gallery);
}

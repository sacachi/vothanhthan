import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const galleries = await prisma.gallery.findMany({
    orderBy: { order: "asc" },
    include: { images: { orderBy: { order: "asc" } } },
  });
  return NextResponse.json(galleries);
}

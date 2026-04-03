import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

async function requireAuth() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return null;
}

export async function GET() {
  const videos = await prisma.video.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(videos);
}

export async function POST(req: NextRequest) {
  const authError = await requireAuth();
  if (authError) return authError;

  const { url, title, order } = await req.json();
  if (!url) return NextResponse.json({ error: "URL required" }, { status: 400 });

  const video = await prisma.video.create({ data: { url, title: title ?? "", order: order ?? 0 } });
  return NextResponse.json(video, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  const authError = await requireAuth();
  if (authError) return authError;

  const { id } = await req.json();
  await prisma.video.delete({ where: { id: Number(id) } });
  return NextResponse.json({ ok: true });
}

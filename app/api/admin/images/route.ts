import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

async function requireAuth() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return null;
}

// POST upload image to gallery
export async function POST(req: NextRequest) {
  const authError = await requireAuth();
  if (authError) return authError;

  const formData = await req.formData();
  const galleryId = Number(formData.get("galleryId"));
  const files = formData.getAll("files") as File[];

  if (!galleryId || !files.length) {
    return NextResponse.json({ error: "Missing galleryId or files" }, { status: 400 });
  }

  const uploadDir = path.join(process.cwd(), "public", "uploads", "gallery", String(galleryId));
  await mkdir(uploadDir, { recursive: true });

  const created = [];
  for (const file of files) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    // Sanitize filename
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const filename = `gallery/${galleryId}/${safeName}`;
    await writeFile(path.join(process.cwd(), "public", "uploads", filename), buffer);

    const maxOrder = await prisma.image.aggregate({
      where: { galleryId },
      _max: { order: true },
    });
    const image = await prisma.image.create({
      data: { galleryId, filename, alt: "", order: (maxOrder._max.order ?? 0) + 1 },
    });
    created.push(image);
  }

  return NextResponse.json(created, { status: 201 });
}

// PATCH reorder images
export async function PATCH(req: NextRequest) {
  const authError = await requireAuth();
  if (authError) return authError;

  const { ids }: { ids: number[] } = await req.json();
  await Promise.all(ids.map((id, i) => prisma.image.update({ where: { id }, data: { order: i } })));
  return NextResponse.json({ ok: true });
}

// DELETE image
export async function DELETE(req: NextRequest) {
  const authError = await requireAuth();
  if (authError) return authError;

  const { id } = await req.json();
  const image = await prisma.image.delete({ where: { id } });

  // Remove file from disk (ignore errors)
  try {
    const { unlink } = await import("fs/promises");
    await unlink(path.join(process.cwd(), "public", "uploads", image.filename));
  } catch {}

  return NextResponse.json({ ok: true });
}

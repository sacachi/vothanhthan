import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

const MIME: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  gif: "image/gif",
  webp: "image/webp",
  avif: "image/avif",
  svg: "image/svg+xml",
};

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path: segments } = await params;

  const uploadRoot = path.join(process.cwd(), "public", "uploads");
  const filePath = path.resolve(uploadRoot, ...segments);

  // Prevent path traversal outside uploads directory
  if (!filePath.startsWith(uploadRoot + path.sep)) {
    return new NextResponse(null, { status: 400 });
  }

  try {
    const buffer = await readFile(filePath);
    const ext = segments[segments.length - 1].split(".").pop()?.toLowerCase() ?? "";
    const contentType = MIME[ext] ?? "application/octet-stream";
    return new NextResponse(buffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return new NextResponse(null, { status: 404 });
  }
}

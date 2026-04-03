/**
 * import-uploads.ts
 * Scans public/uploads/ and links existing files to galleries by matching
 * year-based folder names to gallery slugs.
 * Run with: npx ts-node --compiler-options '{"module":"CommonJS"}' scripts/import-uploads.ts
 */
import { PrismaClient } from "@prisma/client";
import { readdirSync, statSync } from "fs";
import path from "path";

const prisma = new PrismaClient();

// Map year sub-directories to gallery slugs
const YEAR_TO_SLUG: Record<string, string> = {
  "2022": "2022-2024",
  "2023": "2022-2024",
  "2024": "2022-2024",
  "2020": "2020-2021",
  "2018": "2018-2019",
  "2017": "2015-2017",
};

async function main() {
  const uploadsDir = path.join(process.cwd(), "public", "uploads");

  for (const year of Object.keys(YEAR_TO_SLUG)) {
    const slug = YEAR_TO_SLUG[year];
    const gallery = await prisma.gallery.findUnique({ where: { slug } });
    if (!gallery) { console.log(`⚠  Gallery not found: ${slug}`); continue; }

    const yearDir = path.join(uploadsDir, year);
    try {
      const months = readdirSync(yearDir);
      for (const month of months) {
        const monthDir = path.join(yearDir, month);
        if (!statSync(monthDir).isDirectory()) continue;
        const files = readdirSync(monthDir).filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f));
        // Only import original files (skip resized variants like -150x150, -300x, etc.)
        const originals = files.filter((f) => !/-\d+x\d+\./.test(f));

        let order = await prisma.image.count({ where: { galleryId: gallery.id } });
        for (const file of originals) {
          const filename = `${year}/${month}/${file}`;
          const exists = await prisma.image.findFirst({ where: { galleryId: gallery.id, filename } });
          if (exists) continue;
          await prisma.image.create({ data: { galleryId: gallery.id, filename, alt: "", order: order++ } });
          console.log(`  + ${filename} → ${slug}`);
        }
      }
    } catch {
      console.log(`  skipped ${year}`);
    }
  }
  console.log("✓ Import complete");
}

main().catch(console.error).finally(() => prisma.$disconnect());

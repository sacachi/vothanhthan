import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import GalleryGrid from "@/components/GalleryGrid";
import { getLocale } from "next-intl/server";

export const dynamic = "force-dynamic";

export default async function ExhibitionGalleryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const locale = await getLocale();

  const gallery = await prisma.gallery.findUnique({
    where: { slug, category: "exhibition" },
    include: { images: { orderBy: { order: "asc" } } },
  });

  if (!gallery) notFound();

  const title = locale === "vi" ? gallery.nameVi : gallery.nameEn;

  return (
    <div className="pt-20 min-h-screen">
      <h1 className="text-center text-xs tracking-[0.4em] pt-8 pb-4 opacity-60 uppercase">
        {title}
      </h1>
      <GalleryGrid images={gallery.images} />
    </div>
  );
}

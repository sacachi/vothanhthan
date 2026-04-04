import Slideshow, { type Slide } from "@/components/Slideshow";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

const STATIC_SLIDES: Slide[] = [
  "/slides/slide1.jpg",
  "/slides/slide2.jpg",
  "/slides/slide3.jpg",
  "/slides/slide4.jpg",
  "/slides/slide5.jpg",
  "/slides/slide6.jpg",
  "/slides/slide7.jpg",
].map((src) => ({ src }));

export default async function Home() {
  let slides: Slide[] = STATIC_SLIDES;
  try {
    const featured = await prisma.image.findMany({
      where: { featured: true },
      orderBy: { order: "asc" },
      include: { gallery: { select: { slug: true, category: true } } },
    });
    if (featured.length > 0) {
      slides = featured.map((img) => {
        let galleryHref: string | undefined;
        if (img.gallery) {
          const base = img.gallery.category === "work" ? "work" : "exhibitions";
          galleryHref = `/${base}/${img.gallery.slug}`;
        }
        return {
          src: `/uploads/${img.filename}`,
          title: img.title || undefined,
          description: img.description || undefined,
          galleryHref,
        };
      });
    }
  } catch {
    // DB not yet migrated — fall back to static slides
  }

  return (
    <>
      <Slideshow slides={slides} />
      <div className="h-screen" />
      <Footer fixed />
    </>
  );
}

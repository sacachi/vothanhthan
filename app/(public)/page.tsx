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
  const featured = await prisma.image.findMany({
    where: { featured: true },
    orderBy: { order: "asc" },
  });

  const slides: Slide[] = featured.length > 0
    ? featured.map((img) => ({
        src: `/uploads/${img.filename}`,
        title: img.title || undefined,
        description: img.description || undefined,
      }))
    : STATIC_SLIDES;

  return (
    <>
      <Slideshow slides={slides} />
      <div className="h-screen" />
      <Footer fixed />
    </>
  );
}

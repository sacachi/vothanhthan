import Slideshow from "@/components/Slideshow";
import Footer from "@/components/Footer";

const SLIDES = [
  "/slides/slide1.jpg",
  "/slides/slide2.jpg",
  "/slides/slide3.jpg",
  "/slides/slide4.jpg",
  "/slides/slide5.jpg",
  "/slides/slide6.jpg",
  "/slides/slide7.jpg",
];

export default function Home() {
  return (
    <>
      {/* Slideshow fills full viewport (internally uses fixed inset-0) */}
      <Slideshow slides={SLIDES} />
      {/* Full-height spacer keeps layout footer below the fold */}
      <div className="h-screen" />
      {/* Fixed footer overlaid on the slideshow */}
      <Footer fixed />
    </>
  );
}

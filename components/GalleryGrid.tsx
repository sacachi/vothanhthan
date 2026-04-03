"use client";

import Image from "next/image";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

interface GalleryImage {
  id: number;
  filename: string;
  alt: string;
  order: number;
}

export default function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const [index, setIndex] = useState(-1);

  const slides = images.map((img) => ({
    src: `/uploads/${img.filename}`,
    alt: img.alt || "",
  }));

  return (
    <>
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-2 px-4 py-8">
        {images.map((img, i) => (
          <div
            key={img.id}
            className="mb-2 break-inside-avoid cursor-pointer overflow-hidden group"
            onClick={() => setIndex(i)}
          >
            <div className="relative w-full">
              <Image
                src={`/uploads/${img.filename}`}
                alt={img.alt || ""}
                width={800}
                height={600}
                className="w-full h-auto object-cover group-hover:opacity-90 transition-opacity"
              />
            </div>
          </div>
        ))}
      </div>
      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        index={index}
        slides={slides}
        styles={{ container: { backgroundColor: "rgba(0,0,0,0.95)" } }}
      />
    </>
  );
}

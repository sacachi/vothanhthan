"use client";

import Image from "next/image";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";

interface GalleryImage {
  id: number;
  filename: string;
  alt: string;
  title: string;
  description: string;
  order: number;
}

export default function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const [index, setIndex] = useState(-1);

  const slides = images.map((img) => ({
    src: `/uploads/${img.filename}`,
    alt: img.alt || "",
    title: img.title || undefined,
    description: img.description || undefined,
  }));

  return (
    <>
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-2 px-4 py-8">
        {images.map((img, i) => (
          <div
            key={img.id}
            className="mb-4 break-inside-avoid cursor-pointer group"
            onClick={() => setIndex(i)}
          >
            <Image
              src={`/uploads/${img.filename}`}
              alt={img.alt || ""}
              width={800}
              height={600}
              unoptimized
              className="w-full h-auto object-cover group-hover:opacity-90 transition-opacity"
            />
            {(img.title || img.description) && (
              <div className="pt-2 pb-1">
                {img.title && (
                  <p className="text-xs tracking-[0.15em] uppercase text-gray-800">{img.title}</p>
                )}
                {img.description && (
                  <p className="text-[11px] text-gray-400 mt-0.5 leading-relaxed">{img.description}</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        index={index}
        slides={slides}
        plugins={[Captions]}
        styles={{ container: { backgroundColor: "rgba(0,0,0,0.95)" } }}
      />
    </>
  );
}

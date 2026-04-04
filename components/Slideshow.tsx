"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/effect-fade";

export interface Slide {
  src: string;
  title?: string;
  description?: string;
}

interface SlideshowProps {
  slides: Slide[];
}

export default function Slideshow({ slides }: SlideshowProps) {
  return (
    <div className="fixed inset-0 w-full h-full">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop
        className="w-full h-full"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <div className="relative w-full h-full">
              <Image
                src={slide.src}
                alt={slide.title || `Slide ${i + 1}`}
                fill
                unoptimized={slide.src.startsWith("/uploads/")}
                className="object-cover"
                priority={i === 0}
              />
              {(slide.title || slide.description) && (
                <div className="absolute bottom-16 left-0 right-0 flex justify-center pointer-events-none">
                  <div className="text-center px-6 max-w-xl">
                    {slide.title && (
                      <p className="text-white text-xs tracking-[0.3em] uppercase font-light drop-shadow-lg">
                        {slide.title}
                      </p>
                    )}
                    {slide.description && (
                      <p className="text-white/70 text-[11px] tracking-widest mt-1 drop-shadow font-light">
                        {slide.description}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

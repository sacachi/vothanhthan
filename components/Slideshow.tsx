"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/effect-fade";

interface SlideshowProps {
  slides: string[];
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
        {slides.map((src, i) => (
          <SwiperSlide key={i}>
            <div className="relative w-full h-full">
              <Image
                src={src}
                alt={`Slide ${i + 1}`}
                fill
                className="object-cover"
                priority={i === 0}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

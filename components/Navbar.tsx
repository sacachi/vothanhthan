"use client";

import Link from "next/link";
import { useState } from "react";
import { useTranslations } from "next-intl";
import LangSwitcher from "./LangSwitcher";
import SocialIcons from "./SocialIcons";
import { Menu, X } from "lucide-react";

type Gallery = { slug: string; nameEn: string; nameVi: string; category: string };

interface NavbarProps {
  workGalleries: Gallery[];
  exhibitionGalleries: Gallery[];
  locale: string;
}

export default function Navbar({ workGalleries, exhibitionGalleries, locale }: NavbarProps) {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);
  const [workOpen, setWorkOpen] = useState(false);
  const [exhOpen, setExhOpen] = useState(false);

  const galleryName = (g: Gallery) => locale === "vi" ? g.nameVi : g.nameEn;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-black/80 backdrop-blur-sm text-white text-sm tracking-widest">
      {/* Logo */}
      <Link href="/" className="font-light text-base tracking-[0.3em] hover:opacity-70 transition-opacity">
        VÕ THÀNH THÂN
      </Link>

      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center gap-8">
        <Link href="/" className="hover:opacity-60 transition-opacity">{t("home")}</Link>

        {/* WORK dropdown */}
        <div className="relative group">
          <button className="hover:opacity-60 transition-opacity flex items-center gap-1" onMouseEnter={() => setWorkOpen(true)} onMouseLeave={() => setWorkOpen(false)}>
            {t("work")}
          </button>
          {workOpen && (
            <div className="absolute top-full left-0 bg-black/95 min-w-[260px] py-2" onMouseEnter={() => setWorkOpen(true)} onMouseLeave={() => setWorkOpen(false)}>
              {workGalleries.map((g) => (
                <Link key={g.slug} href={`/work/${g.slug}`} className="block px-4 py-2 hover:bg-white/10 transition-colors text-xs tracking-widest">
                  {galleryName(g)}
                </Link>
              ))}
              <Link href="/videos" className="block px-4 py-2 hover:bg-white/10 transition-colors text-xs tracking-widest">
                {t("videos")}
              </Link>
            </div>
          )}
        </div>

        {/* EXHIBITIONS dropdown */}
        <div className="relative group">
          <button className="hover:opacity-60 transition-opacity" onMouseEnter={() => setExhOpen(true)} onMouseLeave={() => setExhOpen(false)}>
            {t("exhibitions")}
          </button>
          {exhOpen && (
            <div className="absolute top-full left-0 bg-black/95 min-w-[380px] py-2" onMouseEnter={() => setExhOpen(true)} onMouseLeave={() => setExhOpen(false)}>
              {exhibitionGalleries.map((g) => (
                <Link key={g.slug} href={`/exhibitions/${g.slug}`} className="block px-4 py-2 hover:bg-white/10 transition-colors text-xs tracking-widest">
                  {galleryName(g)}
                </Link>
              ))}
            </div>
          )}
        </div>

        <Link href="/artist" className="hover:opacity-60 transition-opacity">{t("artist")}</Link>
        <Link href="/news" className="hover:opacity-60 transition-opacity">{t("news")}</Link>
        <Link href="/contact" className="hover:opacity-60 transition-opacity">{t("contact")}</Link>

        <SocialIcons />
        <LangSwitcher locale={locale} />
      </nav>

      {/* Mobile hamburger */}
      <button className="md:hidden" onClick={() => setOpen(!open)}>
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Mobile menu */}
      {open && (
        <div className="absolute top-full left-0 right-0 bg-black/95 flex flex-col px-6 py-4 gap-4 md:hidden text-xs tracking-widest">
          <Link href="/" onClick={() => setOpen(false)}>{t("home")}</Link>
          <div className="font-medium opacity-50">{t("work")}</div>
          {workGalleries.map((g) => (
            <Link key={g.slug} href={`/work/${g.slug}`} className="pl-4 opacity-80" onClick={() => setOpen(false)}>
              {galleryName(g)}
            </Link>
          ))}
          <Link href="/videos" className="pl-4 opacity-80" onClick={() => setOpen(false)}>{t("videos")}</Link>
          <div className="font-medium opacity-50">{t("exhibitions")}</div>
          {exhibitionGalleries.map((g) => (
            <Link key={g.slug} href={`/exhibitions/${g.slug}`} className="pl-4 opacity-80" onClick={() => setOpen(false)}>
              {galleryName(g)}
            </Link>
          ))}
          <Link href="/artist" onClick={() => setOpen(false)}>{t("artist")}</Link>
          <Link href="/news" onClick={() => setOpen(false)}>{t("news")}</Link>
          <Link href="/contact" onClick={() => setOpen(false)}>{t("contact")}</Link>
          <div className="flex items-center gap-4 pt-2">
            <SocialIcons />
            <LangSwitcher locale={locale} />
          </div>
        </div>
      )}
    </header>
  );
}

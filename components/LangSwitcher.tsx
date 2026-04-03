"use client";

import Link from "next/link";

export default function LangSwitcher({ locale }: { locale: string }) {
  return (
    <div className="flex items-center gap-1 text-xs tracking-widest">
      <Link
        href="/api/locale?locale=en"
        className={`px-1 transition-opacity ${locale === "en" ? "opacity-100 border-b border-white" : "opacity-50 hover:opacity-80"}`}
      >
        EN
      </Link>
      <span className="opacity-30">|</span>
      <Link
        href="/api/locale?locale=vi"
        className={`px-1 transition-opacity ${locale === "vi" ? "opacity-100 border-b border-white" : "opacity-50 hover:opacity-80"}`}
      >
        VN
      </Link>
    </div>
  );
}

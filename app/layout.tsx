import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getLocale } from "next-intl/server";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://vothanhthan.com"),
  title: {
    default: "Võ Thành Thân – Vietnamese Contemporary Artist",
    template: "%s | Võ Thành Thân",
  },
  description:
    "Trang web chính thức của hoạ sĩ Võ Thành Thân – nghệ sĩ đương đại người Việt Nam tại Huế. Tranh, triển lãm và tin tức mới nhất.",
  keywords: [
    "Võ Thành Thân",
    "hoạ sĩ Việt Nam",
    "nghệ thuật đương đại",
    "tranh Huế",
    "Vietnamese artist",
    "contemporary art",
    "Hue City",
    "fine arts Vietnam",
  ],
  authors: [{ name: "Võ Thành Thân", url: "https://vothanhthan.com" }],
  creator: "Võ Thành Thân",
  publisher: "Võ Thành Thân",
  category: "Art",
  openGraph: {
    type: "website",
    locale: "vi_VN",
    alternateLocale: ["en_US"],
    url: "https://vothanhthan.com",
    siteName: "Võ Thành Thân",
    title: "Võ Thành Thân – Vietnamese Contemporary Artist",
    description:
      "Trang web chính thức của hoạ sĩ Võ Thành Thân – nghệ sĩ đương đại người Việt Nam tại Huế.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Tranh của hoạ sĩ Võ Thành Thân",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Võ Thành Thân – Vietnamese Contemporary Artist",
    description:
      "Trang web chính thức của hoạ sĩ Võ Thành Thân – nghệ sĩ đương đại người Việt Nam tại Huế.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  alternates: {
    canonical: "https://vothanhthan.com",
    languages: {
      vi: "https://vothanhthan.com",
      en: "https://vothanhthan.com",
    },
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const messages = await getMessages();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Võ Thành Thân",
    url: "https://vothanhthan.com",
    image: "https://vothanhthan.com/anh-chan-dung-hs.jpg",
    jobTitle: "Visual Artist",
    description: "Vietnamese contemporary artist based in Hue City",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Huế",
      addressCountry: "VN",
    },
    email: "thanvo7891@gmail.com",
    sameAs: [
      "https://www.facebook.com/than.vo.31",
      "https://www.youtube.com/@UCXi_10S4XrW5Wy0mUpNWPCw",
      "https://www.pinterest.com/thanvoartist",
      "https://www.instagram.com/thanhthan394",
    ],
  };

  return (
    <html lang={locale} className={`${geist.variable} h-full`}>
      <body className="min-h-full bg-white text-gray-900 antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <NextIntlClientProvider messages={messages} locale={locale}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

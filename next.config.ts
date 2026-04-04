import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  output: "standalone",
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/uploads/:path*", destination: "/api/uploads/:path*" },
      ],
    };
  },
  images: {
    localPatterns: [
      { pathname: "/slides/**" },
      { pathname: "/uploads/**" },
      { pathname: "/anh-chan-dung-hs.jpg" },
      { pathname: "/artist-studio.jpg" },
    ],
  },
};

export default withNextIntl(nextConfig);

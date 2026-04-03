import { prisma } from "@/lib/db";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getLocale } from "next-intl/server";

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();

  const [workGalleries, exhibitionGalleries] = await Promise.all([
    prisma.gallery.findMany({ where: { category: "work" }, orderBy: { order: "asc" } }),
    prisma.gallery.findMany({ where: { category: "exhibition" }, orderBy: { order: "asc" } }),
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar
        workGalleries={workGalleries}
        exhibitionGalleries={exhibitionGalleries}
        locale={locale}
      />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

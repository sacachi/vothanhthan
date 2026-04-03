import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Nghệ sĩ – Võ Thành Thân",
  description:
    "Tiểu sử, triển lãm và thành tựu của hoạ sĩ Võ Thành Thân – nghệ sĩ đương đại tại Huế, Việt Nam.",
  alternates: { canonical: "https://vothanhthan.com/artist" },
  openGraph: {
    title: "Nghệ sĩ – Võ Thành Thân",
    description:
      "Tiểu sử, triển lãm và thành tựu của hoạ sĩ Võ Thành Thân.",
    url: "https://vothanhthan.com/artist",
    images: [{ url: "/anh-chan-dung-hs.jpg", alt: "Hoạ sĩ Võ Thành Thân" }],
  },
};

const exhibitions = [
  { date: "11/2024", en: '"Mong Anh" Solo Exhibition – Quang San Art Museum', vi: 'Triển lãm cá nhân "Mộng Ảnh" – Bảo tàng Nghệ thuật Quang San' },
  { date: "03/2024", en: '"Heat" Group Exhibition – Quang San Art Museum', vi: 'Triển lãm nhóm "Nhiệt" – Bảo tàng Nghệ thuật Quang San' },
  { date: "12/2023", en: "Vietnam Fine Arts Competition and Exhibition 2023", vi: "Cuộc thi và Triển lãm Mỹ thuật Việt Nam 2023" },
  { date: "12/2020", en: "Vietnam Fine Arts Exhibition 2020", vi: "Triển lãm Mỹ thuật Việt Nam 2020" },
  { date: "07/2020", en: "Young Fine Arts Festival Vietnam 2020 – Hanoi", vi: "Festival Mỹ Thuật Trẻ Việt Nam 2020 – Hà Nội" },
  { date: "12/2019", en: "Hue Fine Arts Exhibition 2019", vi: "Triển lãm Mỹ thuật Huế 2019" },
  { date: "12/2017", en: "Duyen Son Exhibition – Vietnam Contemporary Art at Shanghai Museum", vi: "Triển lãm Duyên Sơn – Nghệ thuật Đương đại VN tại Bảo tàng Thượng Hải" },
  { date: "11/2017", en: "Young Fine Arts Festival Vietnam 2017 – VCCA", vi: "Festival Mỹ Thuật Trẻ Việt Nam 2017 – VCCA" },
  { date: "05/2017", en: "Laos Wind Group Exhibition – Vietnam Fine Arts Museum", vi: "Triển lãm nhóm Gió Lào – Bảo tàng Mỹ thuật Việt Nam" },
  { date: "02/2017", en: "Final – Viet Art Today 2016", vi: "Chung kết Họa sĩ trẻ – Viet Art Today 2016" },
  { date: "09/2016", en: "Today – 52 Young Vietnamese Artists", vi: "Today – 52 Nghệ sĩ Trẻ Việt Nam" },
  { date: "04/2016", en: '"Echoes of Nature" International Exhibition – Hue', vi: 'Triển lãm Quốc tế "Tiếng vọng từ thiên nhiên" – Huế' },
  { date: "03/2016", en: "Young Artists Exhibition – Hue", vi: "Triển lãm Nghệ sĩ Trẻ – Huế" },
  { date: "12/2015", en: "Vietnam Fine Arts Exhibition 2015", vi: "Triển lãm Mỹ Thuật Việt Nam 2015" },
  { date: "08/2015", en: "Dogma Prize Final – Vietnam Fine Arts Museum", vi: "Chung kết Dogma Prize – Bảo tàng Mỹ thuật Việt Nam" },
];

const awards = [
  { year: "2015", en: "1st Prize – Dogma Prize", vi: "Giải Nhất – Dogma Prize" },
  { year: "2016", en: "Encouragement Prize – Viet Art Today 2016", vi: "Giải Khuyến Khích – Viet Art Today 2016" },
  { year: "2017", en: "3rd Prize – Young Fine Arts Festival Vietnam", vi: "Giải Ba – Festival Mỹ Thuật Trẻ Việt Nam" },
  { year: "2019", en: "Excellence Award – Thua Thien Hue Province", vi: "Giải Tặng Thưởng VHNT Xuất Sắc – Tỉnh Thừa Thiên Huế" },
  { year: "2020", en: "1st Prize – Young Fine Arts Vietnam", vi: "Giải Nhất – Mỹ Thuật Trẻ Việt Nam" },
  { year: "2020", en: "Award – Flamingo Contemporary Art Museum", vi: "Giải Thưởng – Bảo tàng Mỹ thuật Đương đại Flamingo" },
  { year: "2023", en: "3rd Prize – Vietnam Fine Arts Competition 2023", vi: "Giải Ba – Cuộc thi & Triển lãm Mỹ thuật Việt Nam 2023" },
];

export default async function ArtistPage() {
  const t = await getTranslations("artist");
  // Determine locale from cookie via next-intl
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  const locale = cookieStore.get("locale")?.value ?? "en";
  const isVi = locale === "vi";

  return (
    <div className="pt-20 min-h-screen max-w-3xl mx-auto px-6 py-12 text-sm leading-relaxed">
      <h1 className="text-xs tracking-[0.4em] opacity-60 uppercase mb-10">{t("title")}</h1>

      {/* Studio photo */}
      <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden mb-12 shadow-md">
        <Image
          src="/artist-studio.jpg"
          alt="Võ Thành Thân in studio"
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, 768px"
          priority
        />
      </div>

      {/* Profile */}
      <section className="mb-10">
        <h2 className="text-xs tracking-widest uppercase opacity-40 mb-3">{t("profile")}</h2>
        <p>{t("born")}</p>
        <p>{t("address")}</p>
        <p>
          {t("email")}:{" "}
          <a href="mailto:thanvo7891@gmail.com" className="underline opacity-70 hover:opacity-100">
            thanvo7891@gmail.com
          </a>
        </p>
      </section>

      {/* Exhibitions */}
      <section className="mb-10">
        <h2 className="text-xs tracking-widest uppercase opacity-40 mb-3">{t("exhibitions")}</h2>
        <ul className="space-y-2">
          {exhibitions.map((e, i) => (
            <li key={i} className="flex gap-4">
              <span className="opacity-40 shrink-0 w-16">{e.date}</span>
              <span>{isVi ? e.vi : e.en}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Awards */}
      <section className="mb-10">
        <h2 className="text-xs tracking-widest uppercase opacity-40 mb-3">{t("awards")}</h2>
        <ul className="space-y-2">
          {awards.map((a, i) => (
            <li key={i} className="flex gap-4">
              <span className="opacity-40 shrink-0 w-12">{a.year}</span>
              <span>{isVi ? a.vi : a.en}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Collections */}
      <section className="mb-10">
        <h2 className="text-xs tracking-widest uppercase opacity-40 mb-3">{t("collections")}</h2>
        <p className="opacity-80">{t("collectionsText")}</p>
      </section>

      {/* Philosophy */}
      <section>
        <h2 className="text-xs tracking-widest uppercase opacity-40 mb-3">{t("philosophy")}</h2>
        <blockquote className="border-l border-white/20 pl-4 italic opacity-80">{t("philosophyText")}</blockquote>
      </section>
    </div>
  );
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Báo chí & Truyền thông",
  description:
    "Các bài viết báo chí và tin tức về hoạ sĩ Võ Thành Thân trên các phương tiện truyền thông trong và ngoài nước.",
  alternates: { canonical: "https://vothanhthan.com/news" },
  openGraph: {
    title: "Báo chí & Truyền thông – Võ Thành Thân",
    description:
      "Các bài viết báo chí và tin tức về hoạ sĩ Võ Thành Thân.",
    url: "https://vothanhthan.com/news",
  },
};

const LINKS = [
  {
    group: "Triển lãm Mộng Ảnh",
    items: [
      { label: "Triển lãm Mộng Ảnh: Dấu ấn quá khứ trong ký ức của họa sĩ Võ Thành Thân", url: "https://quangsanartmuseum.com.vn/su-kien-trien-lam/trien-lam-mong-anh-3011-15122024" },
      { label: "Họa sĩ kể chuyện bảo tồn di sản văn hóa Huế qua tranh – VietnamNet", url: "https://vietnamnet.vn/hoa-si-ke-chuyen-bao-ton-di-san-van-hoa-hue-qua-tranh-2347297.html" },
    ],
  },
  {
    group: 'Triển lãm "Nhiệt" 2024',
    items: [
      { label: 'Khai mạc triển lãm "Nhiệt" – HTV', url: "https://www.htv.com.vn/khai-mac-trien-lam-nhiet-noi-hoi-tu-nhiet-huyet-tuoi-tre" },
      { label: "Loạt tranh đa chất liệu tại triển lãm Nhiệt – VnExpress", url: "https://vnexpress.net/loat-tranh-da-chat-lieu-tai-trien-lam-nhiet-4720161.html" },
      { label: "Triển lãm Nhiệt ra mắt không gian nghệ thuật – Đại Biểu Nhân Dân", url: "https://daibieunhandan.vn/van-hoa/trien-lam-nhiet-ra-mat-khong-gian-nghe-thuat-qs-i361858/" },
    ],
  },
  {
    group: "Mỹ thuật Việt Nam 2023",
    items: [
      { label: "Cuộc thi và Triển lãm Mỹ thuật Việt Nam 2023 – Tạp chí Mỹ Thuật", url: "https://tapchimythuat.vn/thong-tin-su-kien/cuoc-thi-va-trien-lam-my-thuat-viet-nam-2023/" },
      { label: "Triển lãm Mỹ thuật Việt Nam 2023 tại Bảo tàng Hà Nội – Hanoiomoi", url: "https://hanoimoi.vn/trien-lam-my-thuat-viet-nam-nam-2023-tai-bao-tang-ha-noi-651198.html" },
    ],
  },
  {
    group: "Luxuo Feature",
    items: [
      { label: "Họa sĩ Võ Thành Thân – Ám ảnh khôn nguôi trong đống giấy vò nhàu nát – Luxuo", url: "https://luxuo.vn/culture/hoa-si-vo-thanh-than-am-anh-khon-nguoi-trong-dong-giay-vo-nhau-nat.html" },
    ],
  },
  {
    group: "Festival Mỹ Thuật Trẻ 2020",
    items: [
      { label: "91 tác phẩm trưng bày tại Festival Mỹ Thuật Trẻ 2020 – VietnamNet", url: "https://vietnamnet.vn/91-tac-pham-trung-bay-tai-festival-my-thuat-tre-2020-661708.html" },
      { label: "Trao giải thưởng Festival Mỹ Thuật Trẻ 2020 – Báo Tin Tức", url: "https://baotintuc.vn/doi-song-van-hoa/trao-giai-thuong-festival-my-thuat-tre-2020-20200728200334899.htm" },
      { label: "Khai mạc Festival Mỹ Thuật Trẻ 2020 – APE", url: "http://ape.gov.vn/khai-mac-festival-my-thuat-tre-2020-d2282.th" },
      { label: "Tôn vinh tài năng sáng tạo nghệ thuật – Tổ Quốc", url: "https://toquoc.vn/ton-vinh-tai-nang-sang-tao-nghe-thuat-cua-cac-nghe-si-tre-99206804.htm" },
    ],
  },
  {
    group: "Festival Mỹ Thuật Trẻ 2017",
    items: [
      { label: "Festival Mỹ Thuật Trẻ 2017 – Tư duy sáng tạo – Đảng Cộng Sản", url: "https://dangcongsan.vn/anh/festival-my-thuat-tre-2017–tu-duy-sang-tao-goc-nhin-moi-462814.html" },
      { label: "Khai mạc Festival Mỹ Thuật Trẻ 2017 – Sở VHTT Hà Nội", url: "http://sovhtt.hanoi.gov.vn/khai-mac-festival-thuat-tre-2017/" },
    ],
  },
  {
    group: "Triển lãm Gió Lào 2017",
    items: [
      { label: "9 họa sĩ miền Trung mang Gió Lào vào Sài Gòn – Tuổi Trẻ", url: "https://tuoitre.vn/9-hoa-si-mien-trung-mang-gio-lao-vo-sai-gon-1309929.htm" },
    ],
  },
  {
    group: "The Dogma Prize 2015",
    items: [
      { label: "Hue artist wins Dogma Prize – Vietnam Plus", url: "https://en.vietnamplus.vn/hue-artist-wins-dogma-prize/80121.vnp" },
      { label: "The Dogma Prize in Self Portraiture 2015 – Hanoi Grapevine", url: "https://hanoigrapevine.com/vi/2015/08/exhibition-the-dogma-prize-in-self-portraiture-2015/" },
      { label: "Dogma Prize – Official Site", url: "http://www.dogmaprize.com/previousdogmaprizes" },
    ],
  },
];

export default function NewsPage() {
  return (
    <div className="pt-20 min-h-screen max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-xs tracking-[0.4em] text-gray-400 uppercase mb-10">News &amp; Press</h1>
      <div className="space-y-8">
        {LINKS.map((section) => (
          <div key={section.group}>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3 pb-2 border-b border-gray-100">
              {section.group}
            </h2>
            <ul className="space-y-2">
              {section.items.map((item) => (
                <li key={item.url}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-700 hover:text-black transition-colors underline underline-offset-2 decoration-gray-300 hover:decoration-gray-600"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

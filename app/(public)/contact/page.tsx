import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Liên hệ",
  description:
    "Liên hệ với hoạ sĩ Võ Thành Thân qua email hoặc biểu mẫu trực tuyến. Đặt tranh, hợp tác triển lãm và các dự án nghệ thuật.",
  alternates: { canonical: "https://vothanhthan.com/contact" },
  openGraph: {
    title: "Liên hệ – Võ Thành Thân",
    description:
      "Liên hệ với hoạ sĩ Võ Thành Thân qua email hoặc biểu mẫu trực tuyến.",
    url: "https://vothanhthan.com/contact",
    images: [{ url: "/anh-chan-dung-hs.jpg", alt: "Hoạ sĩ Võ Thành Thân" }],
  },
};

export default function ContactPage() {
  return <ContactForm />;
}

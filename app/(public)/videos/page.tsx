import type { Metadata } from "next";
import { prisma } from "@/lib/db";

export const metadata: Metadata = {
  title: "Video",
  description:
    "Xem các video về hoạ sĩ Võ Thành Thân: quá trình sáng tác, triển lãm và phỏng vấn.",
  alternates: { canonical: "https://vothanhthan.com/videos" },
  openGraph: {
    title: "Video – Võ Thành Thân",
    description:
      "Xem các video về hoạ sĩ Võ Thành Thân: quá trình sáng tác, triển lãm và phỏng vấn.",
    url: "https://vothanhthan.com/videos",
  },
};

function getYouTubeId(url: string) {
  const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match?.[1] ?? null;
}

export default async function VideosPage() {
  const videos = await prisma.video.findMany({ orderBy: { order: "asc" } });

  return (
    <div className="pt-20 min-h-screen px-4 py-12">
      <h1 className="text-center text-xs tracking-[0.4em] pb-8 opacity-60 uppercase">Videos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {videos.map((v) => {
          const id = getYouTubeId(v.url);
          return (
            <div key={v.id} className="aspect-video">
              {id ? (
                <iframe
                  src={`https://www.youtube.com/embed/${id}`}
                  title={v.title || "Video"}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              ) : (
                <a href={v.url} target="_blank" rel="noopener noreferrer" className="text-sm underline opacity-70">
                  {v.title || v.url}
                </a>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

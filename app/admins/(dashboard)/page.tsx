import { prisma } from "@/lib/db";
import Link from "next/link";
import { Images, Video, ArrowRight } from "lucide-react";

export default async function AdminDashboard() {
  const [galleryCount, imageCount, videoCount] = await Promise.all([
    prisma.gallery.count(),
    prisma.image.count(),
    prisma.video.count(),
  ]);

  return (
    <div className="p-8">
      <h1 className="text-xl font-semibold text-gray-800 mb-1">Dashboard</h1>
      <p className="text-sm text-gray-400 mb-8">Quản trị website Võ Thành Thân</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="rounded-lg p-5 bg-violet-50 text-violet-700">
          <div className="text-3xl font-bold">{galleryCount}</div>
          <div className="text-xs font-medium uppercase tracking-widest mt-1 opacity-70">Galleries</div>
        </div>
        <div className="rounded-lg p-5 bg-blue-50 text-blue-700">
          <div className="text-3xl font-bold">{imageCount}</div>
          <div className="text-xs font-medium uppercase tracking-widest mt-1 opacity-70">Images</div>
        </div>
        <div className="rounded-lg p-5 bg-emerald-50 text-emerald-700">
          <div className="text-3xl font-bold">{videoCount}</div>
          <div className="text-xs font-medium uppercase tracking-widest mt-1 opacity-70">Videos</div>
        </div>
      </div>

      <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Quản lý</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg">
        <Link href="/admins/galleries" className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all group">
          <Images size={18} className="text-gray-400 group-hover:text-gray-700 transition-colors" />
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-gray-800">Galleries</div>
            <div className="text-xs text-gray-400">Thêm / xóa / sắp xếp gallery</div>
          </div>
          <ArrowRight size={14} className="text-gray-300 group-hover:text-gray-500 transition-colors" />
        </Link>
        <Link href="/admins/videos" className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all group">
          <Video size={18} className="text-gray-400 group-hover:text-gray-700 transition-colors" />
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-gray-800">Videos</div>
            <div className="text-xs text-gray-400">Quản lý video YouTube</div>
          </div>
          <ArrowRight size={14} className="text-gray-300 group-hover:text-gray-500 transition-colors" />
        </Link>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { Trash2, Video as VideoIcon } from "lucide-react";

type Video = { id: number; url: string; title: string; order: number };

const inputCls = "w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";
const labelCls = "block text-xs font-medium text-gray-700 mb-1";

export default function AdminVideosPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [form, setForm] = useState({ url: "", title: "", order: "0" });
  const [loading, setLoading] = useState(false);

  async function load() {
    const res = await fetch("/api/admin/videos");
    setVideos(await res.json());
  }

  useEffect(() => { load(); }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await fetch("/api/admin/videos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, order: Number(form.order) }),
    });
    setForm({ url: "", title: "", order: "0" });
    await load();
    setLoading(false);
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete video?")) return;
    await fetch("/api/admin/videos", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    await load();
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">Videos</h1>
        <p className="text-sm text-gray-500 mt-1">Manage YouTube video links</p>
      </div>

      {/* Create form */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8 shadow-sm">
        <h2 className="text-sm font-semibold text-gray-700 mb-4">Add New Video</h2>
        <form onSubmit={handleCreate} className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className={labelCls}>YouTube URL</label>
            <input
              placeholder="https://youtube.com/watch?v=..."
              value={form.url}
              onChange={(e) => setForm({ ...form, url: e.target.value })}
              required
              className={inputCls}
            />
          </div>
          <div>
            <label className={labelCls}>Title (optional)</label>
            <input
              placeholder="Video title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className={inputCls}
            />
          </div>
          <div>
            <label className={labelCls}>Order</label>
            <input
              type="number"
              value={form.order}
              onChange={(e) => setForm({ ...form, order: e.target.value })}
              className={inputCls}
            />
          </div>
          <div className="col-span-2 flex justify-end">
            <button type="submit" disabled={loading} className="bg-blue-600 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors">
              {loading ? "Adding..." : "Add Video"}
            </button>
          </div>
        </form>
      </div>

      {/* List */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            {videos.length} video{videos.length !== 1 ? "s" : ""}
          </span>
        </div>
        {videos.length === 0 ? (
          <p className="text-sm text-gray-400 p-4">No videos yet</p>
        ) : (
          <div className="divide-y divide-gray-100">
            {videos.map((v) => (
              <div key={v.id} className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <VideoIcon size={16} className="text-red-500 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{v.title || "Untitled"}</p>
                    <p className="text-xs text-gray-400 truncate">{v.url}</p>
                  </div>
                </div>
                <button onClick={() => handleDelete(v.id)} className="shrink-0 inline-flex items-center gap-1 text-xs text-red-500 hover:text-red-700 font-medium">
                  <Trash2 size={13} /> Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

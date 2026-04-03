"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Pencil, Trash2, Images } from "lucide-react";

type Gallery = { id: number; slug: string; nameEn: string; nameVi: string; category: string; order: number; _count: { images: number } };

const inputCls = "w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";
const labelCls = "block text-xs font-medium text-gray-700 mb-1";

export default function AdminGalleriesPage() {
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [form, setForm] = useState({ slug: "", nameEn: "", nameVi: "", category: "work", order: "0" });
  const [loading, setLoading] = useState(false);

  async function load() {
    const res = await fetch("/api/admin/galleries");
    setGalleries(await res.json());
  }

  useEffect(() => { load(); }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await fetch("/api/admin/galleries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, order: Number(form.order) }),
    });
    setForm({ slug: "", nameEn: "", nameVi: "", category: "work", order: "0" });
    await load();
    setLoading(false);
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this gallery and all its images?")) return;
    await fetch(`/api/admin/galleries/${id}`, { method: "DELETE" });
    await load();
  }

  const work = galleries.filter((g) => g.category === "work");
  const exhibitions = galleries.filter((g) => g.category === "exhibition");

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">Galleries</h1>
        <p className="text-sm text-gray-500 mt-1">Manage work and exhibition galleries</p>
      </div>

      {/* Create form */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8 shadow-sm">
        <h2 className="text-sm font-semibold text-gray-700 mb-4">Create New Gallery</h2>
        <form onSubmit={handleCreate} className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className={labelCls}>Slug</label>
            <input placeholder="e.g. 2022-2024" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} required className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Name (English)</label>
            <input placeholder="Gallery name" value={form.nameEn} onChange={(e) => setForm({ ...form, nameEn: e.target.value })} required className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Tên (Tiếng Việt)</label>
            <input placeholder="Tên gallery" value={form.nameVi} onChange={(e) => setForm({ ...form, nameVi: e.target.value })} required className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Category</label>
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={inputCls}>
              <option value="work">Work</option>
              <option value="exhibition">Exhibition</option>
            </select>
          </div>
          <div>
            <label className={labelCls}>Order</label>
            <input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: e.target.value })} className={inputCls} />
          </div>
          <div className="col-span-2 flex justify-end">
            <button type="submit" disabled={loading} className="bg-blue-600 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors">
              {loading ? "Creating..." : "Create Gallery"}
            </button>
          </div>
        </form>
      </div>

      {/* Gallery lists */}
      <GalleryList title="Work" badge="violet" galleries={work} onDelete={handleDelete} />
      <GalleryList title="Exhibitions" badge="blue" galleries={exhibitions} onDelete={handleDelete} />
    </div>
  );
}

function GalleryList({ title, badge, galleries, onDelete }: { title: string; badge: "violet" | "blue"; galleries: Gallery[]; onDelete: (id: number) => void }) {
  const badgeCls = badge === "violet"
    ? "bg-violet-100 text-violet-700"
    : "bg-blue-100 text-blue-700";

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-3">
        <h2 className="text-sm font-semibold text-gray-700">{title}</h2>
        <span className="text-xs text-gray-400">{galleries.length} galleries</span>
      </div>
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        {galleries.length === 0 ? (
          <p className="text-sm text-gray-400 p-4">No galleries</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Slug</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Images</th>
                <th className="text-right px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {galleries.map((g) => (
                <tr key={g.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-800">{g.nameEn}</td>
                  <td className="px-4 py-3 text-gray-500 font-mono text-xs">{g.slug}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${badgeCls}`}>
                      {g.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500">{g._count.images}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admins/galleries/${g.id}`} className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-medium">
                        <Images size={13} /> Images
                      </Link>
                      <button onClick={() => onDelete(g.id)} className="inline-flex items-center gap-1 text-xs text-red-500 hover:text-red-700 font-medium">
                        <Trash2 size={13} /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

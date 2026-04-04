"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy, useSortable, arrayMove } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2, Upload, ArrowLeft, Star } from "lucide-react";

type GalleryImage = {
  id: number;
  filename: string;
  alt: string;
  title: string;
  description: string;
  featured: boolean;
  order: number;
};
type Gallery = { id: number; nameEn: string; nameVi: string; slug: string; category: string };

function SortableImage({ image, onDelete, onUpdate, onPreview }: {
  image: GalleryImage;
  onDelete: (id: number) => void;
  onUpdate: (id: number, data: Partial<GalleryImage>) => void;
  onPreview: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: image.id });
  const style = { transform: CSS.Transform.toString(transform), transition };
  const [title, setTitle] = useState(image.title);
  const [description, setDescription] = useState(image.description);
  const [saving, setSaving] = useState(false);

  async function saveMetadata() {
    if (title === image.title && description === image.description) return;
    setSaving(true);
    await fetch("/api/admin/images", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: image.id, title, description }),
    });
    onUpdate(image.id, { title, description });
    setSaving(false);
  }

  async function toggleFeatured() {
    const featured = !image.featured;
    await fetch("/api/admin/images", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: image.id, featured }),
    });
    onUpdate(image.id, { featured });
  }

  return (
    <div ref={setNodeRef} style={style} className="relative group bg-gray-100 rounded-lg overflow-hidden border border-gray-200 flex flex-col">
      <div className="relative aspect-square overflow-hidden cursor-zoom-in" onClick={onPreview}>
        <Image src={`/uploads/${image.filename}`} alt={image.alt} fill unoptimized className="object-cover" />
        {/* Drag handle */}
        <div className="absolute top-1 left-1 cursor-grab text-white drop-shadow bg-black/30 rounded p-0.5 opacity-0 group-hover:opacity-100 transition-opacity" {...attributes} {...listeners}>
          <GripVertical size={14} />
        </div>
        {/* Delete */}
        <button
          onClick={() => onDelete(image.id)}
          title="Delete image"
          className="absolute top-1 right-1 bg-red-500/80 hover:bg-red-600 text-white rounded p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Trash2 size={14} />
        </button>
        {/* Featured toggle */}
        <button
          onClick={toggleFeatured}
          title="Hiện trên slideshow trang chủ"
          className={`absolute bottom-1 right-1 rounded p-0.5 transition-colors ${image.featured ? "text-yellow-400 bg-black/40" : "text-white/40 bg-black/20 opacity-0 group-hover:opacity-100"}`}
        >
          <Star size={14} fill={image.featured ? "currentColor" : "none"} />
        </button>
      </div>
      {/* Metadata fields */}
      <div className="p-2 space-y-1 bg-white">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={saveMetadata}
          placeholder="Tên tác phẩm…"
          className="w-full text-xs border border-gray-200 rounded px-2 py-1 focus:outline-none focus:border-gray-400"
        />
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onBlur={saveMetadata}
          placeholder="Chất liệu, kích thước, năm…"
          className="w-full text-xs border border-gray-200 rounded px-2 py-1 focus:outline-none focus:border-gray-400 text-gray-500"
        />
        {saving && <span className="text-[10px] text-gray-400">Saving…</span>}
      </div>
    </div>
  );
}

export default function GalleryImagesPage({ params }: { params: Promise<{ id: string }> }) {
  const [galleryId, setGalleryId] = useState<number | null>(null);
  const [gallery, setGallery] = useState<Gallery | null>(null);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [uploading, setUploading] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(-1);

  useEffect(() => {
    params.then(({ id }) => setGalleryId(Number(id)));
  }, [params]);

  const load = useCallback(async () => {
    if (!galleryId) return;
    const res = await fetch(`/api/admin/galleries/${galleryId}`);
    const data = await res.json();
    setGallery(data);
    setImages(data.images ?? []);
  }, [galleryId]);

  useEffect(() => { if (galleryId) load(); }, [galleryId, load]);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files?.length || !galleryId) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("galleryId", String(galleryId));
    Array.from(e.target.files).forEach((f) => fd.append("files", f));
    await fetch("/api/admin/images", { method: "POST", body: fd });
    await load();
    setUploading(false);
    e.target.value = "";
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this image?")) return;
    await fetch("/api/admin/images", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    await load();
  }

  function handleUpdate(id: number, data: Partial<GalleryImage>) {
    setImages((prev) => prev.map((img) => img.id === id ? { ...img, ...data } : img));
  }

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = images.findIndex((i) => i.id === active.id);
    const newIndex = images.findIndex((i) => i.id === over.id);
    const reordered = arrayMove(images, oldIndex, newIndex);
    setImages(reordered);
    await fetch("/api/admin/images", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: reordered.map((i) => i.id) }),
    });
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <Link href="/admins/galleries" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-3">
          <ArrowLeft size={14} /> Back to Galleries
        </Link>
        <h1 className="text-2xl font-semibold text-gray-800">
          {gallery ? gallery.nameEn : `Gallery #${galleryId}`}
        </h1>
        {gallery && (
          <p className="text-sm text-gray-500 mt-1">
            <span className="font-mono text-xs bg-gray-100 px-1.5 py-0.5 rounded">{gallery.slug}</span>
            <span className="mx-2 text-gray-300">·</span>
            <span>{images.length} image{images.length !== 1 ? "s" : ""}</span>
          </p>
        )}
      </div>

      {/* Upload button */}
      <div className="mb-6">
        <label className={`inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium cursor-pointer transition-colors ${uploading ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"}`}>
          <Upload size={15} />
          {uploading ? "Uploading..." : "Upload Images"}
          <input type="file" accept="image/*" multiple onChange={handleUpload} className="hidden" disabled={uploading} />
        </label>
        <span className="ml-3 text-xs text-gray-400">Drag to reorder · ☆ để hiện trên slideshow trang chủ</span>
      </div>

      {/* Sortable image grid */}
      {images.length === 0 ? (
        <div className="border-2 border-dashed border-gray-200 rounded-lg p-12 text-center">
          <p className="text-sm text-gray-400">No images yet. Upload some to get started.</p>
        </div>
      ) : (
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={images.map((i) => i.id)} strategy={rectSortingStrategy}>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {images.map((img, idx) => (
                <SortableImage key={img.id} image={img} onDelete={handleDelete} onUpdate={handleUpdate} onPreview={() => setPreviewIndex(idx)} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      <Lightbox
        open={previewIndex >= 0}
        close={() => setPreviewIndex(-1)}
        index={previewIndex}
        slides={images.map((img) => ({
          src: `/uploads/${img.filename}`,
          title: img.title || undefined,
          description: img.description || undefined,
        }))}
        styles={{ container: { backgroundColor: "rgba(0,0,0,0.97)" } }}
      />
    </div>
  );
}

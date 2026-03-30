"use client";

import { useRouter } from "next/navigation";

export default function DeleteGalleryButton({ galleryId, galleryName }: { galleryId: string; galleryName: string }) {
  const router = useRouter();

  async function handleDelete() {
    if (!confirm(`Smazat album "${galleryName}" i se všemi fotkami?`)) return;
    const res = await fetch(`/api/gallery/${galleryId}`, { method: "DELETE" });
    if (res.ok) router.refresh();
    else alert("Smazání se nezdařilo.");
  }

  return (
    <button onClick={handleDelete} className="text-red-600 hover:underline text-xs px-1">
      Smazat
    </button>
  );
}

"use client";

import { useRouter } from "next/navigation";

interface Photo {
  id: string;
  thumbnailUrl: string;
  caption: string | null;
}

export default function AdminPhotoGrid({ photos }: { photos: Photo[] }) {
  const router = useRouter();

  async function handleDelete(photoId: string) {
    if (!confirm("Smazat tuto fotku?")) return;
    const res = await fetch(`/api/gallery/photos/${photoId}`, { method: "DELETE" });
    if (res.ok) router.refresh();
    else alert("Smazání se nezdařilo.");
  }

  if (photos.length === 0) {
    return <p className="text-gray-500 text-sm">Žádné fotky. Nahraj první fotku výše.</p>;
  }

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2">
      {photos.map((photo) => (
        <div key={photo.id} className="group relative aspect-square rounded overflow-hidden bg-gray-100">
          <img
            src={photo.thumbnailUrl}
            alt={photo.caption ?? "Foto"}
            className="w-full h-full object-cover"
          />
          <button
            onClick={() => handleDelete(photo.id)}
            className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-5 h-5 text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
            title="Smazat"
          >
            ×
          </button>
          {photo.caption && (
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 truncate opacity-0 group-hover:opacity-100 transition-opacity">
              {photo.caption}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

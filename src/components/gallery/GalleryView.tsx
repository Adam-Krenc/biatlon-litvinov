"use client";

import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

interface Photo {
  id: string;
  url: string;
  thumbnailUrl: string;
  caption: string | null;
  width: number;
  height: number;
}

export default function GalleryView({ photos }: { photos: Photo[] }) {
  const [index, setIndex] = useState(-1);

  if (photos.length === 0) {
    return <p className="text-gray-500 text-center py-16">Tato galerie zatím neobsahuje žádné fotky.</p>;
  }

  const slides = photos.map((p) => ({
    src: p.url,
    width: p.width,
    height: p.height,
    alt: p.caption ?? undefined,
  }));

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
        {photos.map((photo, i) => (
          <button
            key={photo.id}
            onClick={() => setIndex(i)}
            className="aspect-square overflow-hidden rounded bg-gray-100 hover:opacity-90 transition-opacity"
          >
            <img
              src={photo.thumbnailUrl}
              alt={photo.caption ?? `Foto ${i + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={slides}
      />
    </>
  );
}

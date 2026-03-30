"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function PhotoUploader({ galleryId }: { galleryId: string }) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState("");

  async function handleFiles(files: FileList) {
    setUploading(true);
    setProgress(0);
    let done = 0;

    for (const file of Array.from(files)) {
      const formData = new FormData();
      formData.append("file", file);
      if (caption) formData.append("caption", caption);

      await fetch(`/api/gallery/${galleryId}/photos`, {
        method: "POST",
        body: formData,
      });

      done++;
      setProgress(Math.round((done / files.length) * 100));
    }

    setUploading(false);
    setProgress(0);
    setCaption("");
    router.refresh();
  }

  return (
    <div className="space-y-3">
      <div>
        <label className="block text-sm text-gray-700 mb-1">Popis fotek (volitelné)</label>
        <input
          type="text"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#1a3a6b] w-64"
          placeholder="např. Závody sprint"
        />
      </div>

      <div
        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-[#1a3a6b] transition-colors"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          if (e.dataTransfer.files.length) handleFiles(e.dataTransfer.files);
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
        />
        {uploading ? (
          <div>
            <div className="w-48 h-2 bg-gray-200 rounded-full mx-auto overflow-hidden">
              <div
                className="h-full bg-[#1a3a6b] transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sm text-gray-500 mt-2">Nahrávám... {progress}%</p>
          </div>
        ) : (
          <>
            <p className="text-gray-500 text-sm">
              Přetáhni fotky sem nebo <span className="text-[#1a3a6b] font-medium">klikni pro výběr</span>
            </p>
            <p className="text-gray-400 text-xs mt-1">JPG, PNG, WebP – více souborů najednou</p>
          </>
        )}
      </div>
    </div>
  );
}

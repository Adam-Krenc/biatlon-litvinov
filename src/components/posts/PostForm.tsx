"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const PostEditor = dynamic(() => import("./PostEditor"), { ssr: false });

interface InitialData {
  id?: string;
  title: string;
  content: string;
  excerpt: string;
  published: boolean;
  coverImage: string;
}

interface Props {
  initialData?: InitialData;
}

export default function PostForm({ initialData }: Props) {
  const router = useRouter();
  const isEdit = !!initialData?.id;

  const [title, setTitle] = useState(initialData?.title ?? "");
  const [content, setContent] = useState(initialData?.content ?? "");
  const [excerpt, setExcerpt] = useState(initialData?.excerpt ?? "");
  const [published, setPublished] = useState(initialData?.published ?? true);
  const [coverImage, setCoverImage] = useState(initialData?.coverImage ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const url = isEdit ? `/api/posts/${initialData!.id}` : "/api/posts";
    const method = isEdit ? "PATCH" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content, excerpt, published, coverImage }),
    });

    if (res.ok) {
      router.push("/admin/prispevky");
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error ?? "Nastala chyba.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Název příspěvku *
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-[#1a3a6b]"
          placeholder="Zadej název..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Obsah *
        </label>
        <PostEditor content={content} onChange={setContent} />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Perex (krátký úvod)
        </label>
        <textarea
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          rows={2}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#1a3a6b]"
          placeholder="Krátký popis příspěvku (volitelné)..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          URL titulního obrázku
        </label>
        <input
          type="url"
          value={coverImage}
          onChange={(e) => setCoverImage(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#1a3a6b]"
          placeholder="https://..."
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="published"
          checked={published}
          onChange={(e) => setPublished(e.target.checked)}
          className="w-4 h-4 accent-[#1a3a6b]"
        />
        <label htmlFor="published" className="text-sm font-medium text-gray-700">
          Publikovat příspěvek (viditelný na webu)
        </label>
      </div>

      {error && (
        <p className="text-red-600 text-sm bg-red-50 rounded p-2">{error}</p>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="bg-[#1a3a6b] text-white px-6 py-2 rounded font-medium text-sm hover:bg-[#0f2448] transition-colors disabled:opacity-50"
        >
          {loading ? "Ukládám..." : isEdit ? "Uložit změny" : "Přidat příspěvek"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="border border-gray-300 text-gray-700 px-6 py-2 rounded text-sm hover:bg-gray-50"
        >
          Zrušit
        </button>
      </div>
    </form>
  );
}

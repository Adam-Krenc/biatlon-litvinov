"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const PostEditor = dynamic(() => import("@/components/posts/PostEditor"), { ssr: false });

interface Props {
  slug: string;
  title: string;
  content: string;
}

export default function StaticPageEditor({ slug, title: initialTitle, content: initialContent }: Props) {
  const router = useRouter();
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    const res = await fetch(`/api/pages/${slug}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });

    if (res.ok) {
      setSuccess(true);
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error ?? "Nastala chyba.");
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Název stránky</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-[#1a3a6b]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Obsah</label>
        <PostEditor content={content} onChange={setContent} />
      </div>

      {error && <p className="text-red-600 text-sm bg-red-50 rounded p-2">{error}</p>}
      {success && <p className="text-green-700 text-sm bg-green-50 rounded p-2">Uloženo! Změny se zobrazí na webu do 60 sekund.</p>}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="bg-[#1a3a6b] text-white px-6 py-2 rounded font-medium text-sm hover:bg-[#0f2448] disabled:opacity-50"
        >
          {loading ? "Ukládám..." : "Uložit změny"}
        </button>
        <a
          href={`/${slug}`}
          target="_blank"
          className="border border-gray-300 text-gray-700 px-6 py-2 rounded text-sm hover:bg-gray-50"
        >
          Zobrazit na webu ↗
        </a>
      </div>
    </form>
  );
}

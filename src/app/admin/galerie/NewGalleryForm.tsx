"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewGalleryForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/gallery", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description }),
    });

    if (res.ok) {
      setName("");
      setDescription("");
      router.refresh();
    } else {
      alert("Nepodařilo se vytvořit album.");
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-3 items-end">
      <div>
        <label className="block text-sm text-gray-700 mb-1">Název alba *</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#1a3a6b] w-56"
          placeholder="např. Závody Jablonec 2025"
        />
      </div>
      <div>
        <label className="block text-sm text-gray-700 mb-1">Popis (volitelné)</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#1a3a6b] w-64"
          placeholder="Krátký popis..."
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="bg-[#1a3a6b] text-white px-4 py-2 rounded text-sm font-medium hover:bg-[#0f2448] disabled:opacity-50"
      >
        {loading ? "Vytvářím..." : "Vytvořit album"}
      </button>
    </form>
  );
}

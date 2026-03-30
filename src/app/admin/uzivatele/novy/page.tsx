"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NovyUzivatelPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (res.ok) {
      router.push("/admin/uzivatele");
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error ?? "Nastala chyba.");
      setLoading(false);
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1a3a6b] mb-6">Přidat studenta</h1>
      <form onSubmit={handleSubmit} className="max-w-md space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Jméno a příjmení *</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-[#1a3a6b]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-[#1a3a6b]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Heslo *</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-[#1a3a6b]"
          />
          <p className="text-xs text-gray-500 mt-1">Minimálně 6 znaků. Student si může heslo změnit.</p>
        </div>

        {error && <p className="text-red-600 text-sm bg-red-50 rounded p-2">{error}</p>}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="bg-[#1a3a6b] text-white px-6 py-2 rounded font-medium text-sm hover:bg-[#0f2448] disabled:opacity-50"
          >
            {loading ? "Ukládám..." : "Vytvořit účet"}
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
    </div>
  );
}

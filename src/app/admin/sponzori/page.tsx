"use client";

import { useEffect, useState } from "react";

interface Sponsor {
  id: string;
  name: string;
  website: string | null;
  logoUrl: string;
  order: number;
  active: boolean;
}

export default function SponzoriPage() {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", website: "", logoUrl: "" });
  const [saving, setSaving] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  async function load() {
    const res = await fetch("/api/sponsors");
    setSponsors(await res.json());
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    if (editId) {
      await fetch(`/api/sponsors/${editId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setEditId(null);
    } else {
      const maxOrder = sponsors.length ? Math.max(...sponsors.map((s) => s.order)) : 0;
      await fetch("/api/sponsors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, order: maxOrder + 1 }),
      });
    }
    setForm({ name: "", website: "", logoUrl: "" });
    setSaving(false);
    load();
  }

  async function del(id: string) {
    if (!confirm("Smazat sponzora?")) return;
    await fetch(`/api/sponsors/${id}`, { method: "DELETE" });
    load();
  }

  async function toggleActive(s: Sponsor) {
    await fetch(`/api/sponsors/${s.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !s.active }),
    });
    load();
  }

  async function move(id: string, dir: -1 | 1) {
    const idx = sponsors.findIndex((s) => s.id === id);
    const swapIdx = idx + dir;
    if (swapIdx < 0 || swapIdx >= sponsors.length) return;

    const a = sponsors[idx];
    const b = sponsors[swapIdx];
    await Promise.all([
      fetch(`/api/sponsors/${a.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order: b.order }),
      }),
      fetch(`/api/sponsors/${b.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order: a.order }),
      }),
    ]);
    load();
  }

  function startEdit(s: Sponsor) {
    setEditId(s.id);
    setForm({ name: s.name, website: s.website ?? "", logoUrl: s.logoUrl });
  }

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Správa sponzorů</h1>

      {/* Formulář */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h2 className="font-semibold text-gray-700 mb-4">
          {editId ? "Upravit sponzora" : "Přidat sponzora"}
        </h2>
        <form onSubmit={submit} className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Název *</label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#1a3a6b]"
                placeholder="Název firmy"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Web</label>
              <input
                value={form.website}
                onChange={(e) => setForm({ ...form, website: e.target.value })}
                type="url"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#1a3a6b]"
                placeholder="https://..."
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">URL loga *</label>
            <input
              value={form.logoUrl}
              onChange={(e) => setForm({ ...form, logoUrl: e.target.value })}
              required
              type="url"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#1a3a6b]"
              placeholder="https://... (odkaz na obrázek)"
            />
          </div>
          {form.logoUrl && (
            <img src={form.logoUrl} alt="náhled" className="h-12 object-contain border rounded p-1" />
          )}
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={saving}
              className="bg-[#1a3a6b] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#0f2448] transition-colors disabled:opacity-50"
            >
              {saving ? "Ukládám..." : editId ? "Uložit" : "Přidat"}
            </button>
            {editId && (
              <button
                type="button"
                onClick={() => { setEditId(null); setForm({ name: "", website: "", logoUrl: "" }); }}
                className="px-4 py-2 rounded-md text-sm border border-gray-300 hover:bg-gray-50"
              >
                Zrušit
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Seznam */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <p className="p-6 text-gray-500">Načítám...</p>
        ) : sponsors.length === 0 ? (
          <p className="p-6 text-gray-500">Žádní sponzoři.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 text-gray-600">Pořadí</th>
                <th className="text-left px-4 py-3 text-gray-600">Logo</th>
                <th className="text-left px-4 py-3 text-gray-600">Název</th>
                <th className="text-left px-4 py-3 text-gray-600">Aktivní</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {sponsors.map((s, i) => (
                <tr key={s.id} className={s.active ? "" : "opacity-50"}>
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-1">
                      <button
                        onClick={() => move(s.id, -1)}
                        disabled={i === 0}
                        className="text-gray-400 hover:text-gray-700 disabled:invisible leading-none"
                      >▲</button>
                      <button
                        onClick={() => move(s.id, 1)}
                        disabled={i === sponsors.length - 1}
                        className="text-gray-400 hover:text-gray-700 disabled:invisible leading-none"
                      >▼</button>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <img src={s.logoUrl} alt={s.name} className="h-8 max-w-[80px] object-contain" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-900">{s.name}</div>
                    {s.website && (
                      <a href={s.website} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline">
                        {s.website}
                      </a>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleActive(s)}
                      className={`text-xs px-2 py-1 rounded-full ${s.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}
                    >
                      {s.active ? "Ano" : "Ne"}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => startEdit(s)}
                        className="text-[#1a3a6b] hover:underline text-xs"
                      >
                        Upravit
                      </button>
                      <button
                        onClick={() => del(s.id)}
                        className="text-red-600 hover:underline text-xs"
                      >
                        Smazat
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

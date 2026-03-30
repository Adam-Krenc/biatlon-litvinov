"use client";

import { useRouter } from "next/navigation";

export default function DeleteUserButton({ userId, userName }: { userId: string; userName: string }) {
  const router = useRouter();

  async function handleDelete() {
    if (!confirm(`Opravdu chceš odebrat uživatele ${userName}?`)) return;

    const res = await fetch(`/api/users/${userId}`, { method: "DELETE" });
    if (res.ok) {
      router.refresh();
    } else {
      alert("Smazání se nezdařilo.");
    }
  }

  return (
    <button onClick={handleDelete} className="text-red-600 hover:underline text-xs">
      Odebrat
    </button>
  );
}

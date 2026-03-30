"use client";

import { useRouter } from "next/navigation";

export default function DeletePostButton({ postId }: { postId: string }) {
  const router = useRouter();

  async function handleDelete() {
    if (!confirm("Opravdu chceš smazat tento příspěvek?")) return;

    const res = await fetch(`/api/posts/${postId}`, { method: "DELETE" });
    if (res.ok) {
      router.refresh();
    } else {
      alert("Smazání se nezdařilo.");
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="text-red-600 hover:underline text-xs"
    >
      Smazat
    </button>
  );
}

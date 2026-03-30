import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AdminDashboard() {
  const session = await auth();
  const isAdmin = session?.user?.role === "ADMIN";

  const [postCount, userCount, galleryCount] = await Promise.all([
    prisma.post.count(),
    isAdmin ? prisma.user.count() : Promise.resolve(null),
    isAdmin ? prisma.gallery.count() : Promise.resolve(null),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1a3a6b] mb-2">
        Vítej, {session?.user?.name}!
      </h1>
      <p className="text-gray-500 mb-8">
        {isAdmin ? "Administrátor" : "Student"} – Klub biatlonu Litvínov
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5">
          <div className="text-3xl font-bold text-[#1a3a6b]">{postCount}</div>
          <div className="text-gray-500 text-sm mt-1">Příspěvků celkem</div>
        </div>
        {isAdmin && userCount !== null && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5">
            <div className="text-3xl font-bold text-[#1a3a6b]">{userCount}</div>
            <div className="text-gray-500 text-sm mt-1">Uživatelů</div>
          </div>
        )}
        {isAdmin && galleryCount !== null && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5">
            <div className="text-3xl font-bold text-[#1a3a6b]">{galleryCount}</div>
            <div className="text-gray-500 text-sm mt-1">Galerií</div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="/admin/prispevky/novy"
          className="bg-[#1a3a6b] text-white rounded-lg p-4 hover:bg-[#0f2448] transition-colors"
        >
          <div className="font-semibold mb-1">✍ Přidat příspěvek</div>
          <div className="text-white/70 text-sm">Napsat novou aktualitu nebo článek</div>
        </Link>
        {isAdmin && (
          <>
            <Link
              href="/admin/stranky"
              className="bg-white border border-gray-200 text-[#1a3a6b] rounded-lg p-4 hover:border-[#1a3a6b] transition-colors"
            >
              <div className="font-semibold mb-1">📄 Upravit stránky</div>
              <div className="text-gray-500 text-sm">Tréninky, Klub, Podporují nás…</div>
            </Link>
            <Link
              href="/admin/galerie"
              className="bg-white border border-gray-200 text-[#1a3a6b] rounded-lg p-4 hover:border-[#1a3a6b] transition-colors"
            >
              <div className="font-semibold mb-1">🖼 Fotogalerie</div>
              <div className="text-gray-500 text-sm">Nahrát fotky, spravovat alba</div>
            </Link>
            <Link
              href="/admin/uzivatele"
              className="bg-white border border-gray-200 text-[#1a3a6b] rounded-lg p-4 hover:border-[#1a3a6b] transition-colors"
            >
              <div className="font-semibold mb-1">👥 Uživatelé</div>
              <div className="text-gray-500 text-sm">Přidat nebo odebrat studenty</div>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

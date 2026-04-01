import { prisma } from "@/lib/prisma";
import PostCard from "@/components/posts/PostCard";
import Link from "next/link";
import { auth } from "@/lib/auth";
import Image from "next/image";

export const revalidate = 0; // dynamická stránka kvůli search

interface Props {
  searchParams: Promise<{ q?: string }>;
}

export default async function HomePage({ searchParams }: Props) {
  const { q } = await searchParams;
  const session = await auth();

  const [posts, sponsors] = await Promise.all([
    prisma.post.findMany({
      where: {
        published: true,
        ...(q
          ? {
              OR: [
                { title: { contains: q, mode: "insensitive" } },
                { content: { contains: q, mode: "insensitive" } },
                { excerpt: { contains: q, mode: "insensitive" } },
              ],
            }
          : {}),
      },
      orderBy: { createdAt: "desc" },
      take: 24,
      include: { author: { select: { name: true } } },
    }),
    prisma.sponsor.findMany({
      where: { active: true },
      orderBy: { order: "asc" },
    }),
  ]);

  return (
    <div>
      {/* Hero foto */}
      <div className="relative w-full h-64 md:h-80 overflow-hidden bg-[#1a3a6b]">
        <Image
          src="/images/hero.jpg"
          alt="Klub biatlonu Litvínov"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a3a6b]/60 to-transparent" />
        <div className="absolute bottom-6 left-6">
          <h1 className="text-white text-2xl md:text-3xl font-bold drop-shadow">
            Klub biatlonu Litvínov
          </h1>
        </div>
      </div>

      {/* Sponzoři */}
      {sponsors.length > 0 && (
        <div className="bg-white border-b border-gray-200 py-4 px-4">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-6">
            <span className="text-xs text-gray-400 uppercase tracking-wider shrink-0">
              Partneři
            </span>
            {sponsors.map((s) => (
              <a
                key={s.id}
                href={s.website ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                title={s.name}
                className="opacity-70 hover:opacity-100 transition-opacity"
              >
                <img
                  src={s.logoUrl}
                  alt={s.name}
                  className="h-10 max-w-[120px] object-contain"
                />
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Příspěvky */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <h2 className="text-2xl font-bold text-[#1a3a6b]">Aktuality</h2>

          <div className="flex gap-2 items-center">
            {/* Vyhledávání */}
            <form method="GET" action="/" className="flex gap-2">
              <input
                type="search"
                name="q"
                defaultValue={q ?? ""}
                placeholder="Hledat v aktualitách..."
                className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:border-[#1a3a6b] w-48 md:w-64"
              />
              <button
                type="submit"
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-md text-sm transition-colors"
              >
                🔍
              </button>
              {q && (
                <a
                  href="/"
                  className="text-sm text-gray-500 hover:text-gray-700 py-1.5"
                >
                  ✕
                </a>
              )}
            </form>

            {session && (
              <Link
                href="/admin/prispevky/novy"
                className="bg-[#1a3a6b] text-white px-4 py-1.5 rounded text-sm font-medium hover:bg-[#0f2448] transition-colors whitespace-nowrap"
              >
                + Přidat
              </Link>
            )}
          </div>
        </div>

        {q && (
          <p className="text-sm text-gray-500 mb-4">
            {posts.length === 0
              ? `Žádné výsledky pro „${q}"`
              : `${posts.length} výsledků pro „${q}"`}
          </p>
        )}

        {posts.length === 0 ? (
          <p className="text-gray-500 text-center py-16">Zatím žádné příspěvky.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

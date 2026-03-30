import { prisma } from "@/lib/prisma";
import PostCard from "@/components/posts/PostCard";
import Link from "next/link";
import { auth } from "@/lib/auth";

export const revalidate = 60;

export default async function HomePage() {
  const session = await auth();
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    take: 12,
    include: { author: { select: { name: true } } },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-[#1a3a6b]">Aktuality</h1>
        {session && (
          <Link
            href="/admin/prispevky/novy"
            className="bg-[#1a3a6b] text-white px-4 py-2 rounded text-sm font-medium hover:bg-[#0f2448] transition-colors"
          >
            + Přidat příspěvek
          </Link>
        )}
      </div>

      {posts.length === 0 ? (
        <p className="text-gray-500 text-center py-16">
          Zatím žádné příspěvky.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}

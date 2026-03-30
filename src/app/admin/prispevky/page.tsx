import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { canEditPost } from "@/lib/permissions";
import Link from "next/link";
import DeletePostButton from "./DeletePostButton";

export default async function PrispevkyPage() {
  const session = await auth();
  const isAdmin = session?.user?.role === "ADMIN";

  const posts = await prisma.post.findMany({
    where: isAdmin ? {} : { authorId: session!.user.id },
    orderBy: { createdAt: "desc" },
    include: { author: { select: { id: true, name: true } } },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#1a3a6b]">Příspěvky</h1>
        <Link
          href="/admin/prispevky/novy"
          className="bg-[#1a3a6b] text-white px-4 py-2 rounded text-sm font-medium hover:bg-[#0f2448]"
        >
          + Nový příspěvek
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="text-gray-500">Zatím žádné příspěvky.</p>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Název</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600 hidden md:table-cell">Autor</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600 hidden sm:table-cell">Datum</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Stav</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-[#1a3a6b]">
                    <Link href={`/aktuality/${post.slug}`} className="hover:underline" target="_blank">
                      {post.title}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-gray-500 hidden md:table-cell">{post.author.name}</td>
                  <td className="px-4 py-3 text-gray-500 hidden sm:table-cell">{formatDate(post.createdAt)}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${post.published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                      {post.published ? "Publikováno" : "Skrytý"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {canEditPost(session, post.author.id) && (
                      <div className="flex gap-2 justify-end">
                        <Link
                          href={`/admin/prispevky/${post.id}`}
                          className="text-[#1a3a6b] hover:underline text-xs"
                        >
                          Upravit
                        </Link>
                        <DeletePostButton postId={post.id} />
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

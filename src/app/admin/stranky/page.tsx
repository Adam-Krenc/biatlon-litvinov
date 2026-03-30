import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

export default async function StrankyPage() {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") redirect("/admin");

  const pages = await prisma.staticPage.findMany({ orderBy: { slug: "asc" } });

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1a3a6b] mb-6">Statické stránky</h1>
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Stránka</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600 hidden sm:table-cell">URL</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600 hidden md:table-cell">Aktualizováno</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {pages.map((page) => (
              <tr key={page.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-[#1a3a6b]">{page.title}</td>
                <td className="px-4 py-3 text-gray-500 hidden sm:table-cell">/{page.slug}</td>
                <td className="px-4 py-3 text-gray-500 hidden md:table-cell">{formatDate(page.updatedAt)}</td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/stranky/${page.slug}`}
                    className="text-[#1a3a6b] hover:underline text-xs font-medium"
                  >
                    Upravit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

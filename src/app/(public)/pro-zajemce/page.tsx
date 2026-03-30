import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { isAdmin } from "@/lib/permissions";
import Link from "next/link";

export const revalidate = 60;

export default async function ProZajemcePage() {
  const [page, session] = await Promise.all([
    prisma.staticPage.findUnique({ where: { slug: "pro-zajemce" } }),
    auth(),
  ]);
  if (!page) notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {isAdmin(session) && (
        <div className="mb-4 flex justify-end">
          <Link href="/admin/stranky/pro-zajemce" className="bg-[#1a3a6b] text-white px-3 py-1.5 rounded text-sm hover:bg-[#0f2448]">
            Upravit stránku
          </Link>
        </div>
      )}
      <h1 className="text-3xl font-bold text-[#1a3a6b] mb-6">{page.title}</h1>
      <div className="prose" dangerouslySetInnerHTML={{ __html: page.content }} />
    </div>
  );
}

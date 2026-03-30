import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import StaticPageEditor from "@/components/admin/StaticPageEditor";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function EditStrankaPage({ params }: Props) {
  const { slug } = await params;
  const session = await auth();
  if (session?.user?.role !== "ADMIN") redirect("/admin");

  const page = await prisma.staticPage.findUnique({ where: { slug } });
  if (!page) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1a3a6b] mb-6">
        Upravit stránku: {page.title}
      </h1>
      <StaticPageEditor slug={page.slug} title={page.title} content={page.content} />
    </div>
  );
}

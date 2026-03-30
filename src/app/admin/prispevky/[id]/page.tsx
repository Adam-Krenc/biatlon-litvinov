import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { canEditPost } from "@/lib/permissions";
import { notFound, redirect } from "next/navigation";
import PostForm from "@/components/posts/PostForm";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditPrispevekPage({ params }: Props) {
  const { id } = await params;
  const session = await auth();

  const post = await prisma.post.findUnique({
    where: { id },
    include: { author: { select: { id: true } } },
  });

  if (!post) notFound();
  if (!canEditPost(session, post.author.id)) redirect("/admin/prispevky");

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1a3a6b] mb-6">Upravit příspěvek</h1>
      <PostForm
        initialData={{
          id: post.id,
          title: post.title,
          content: post.content,
          excerpt: post.excerpt ?? "",
          published: post.published,
          coverImage: post.coverImage ?? "",
        }}
      />
    </div>
  );
}

import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { formatDate, truncate } from "@/lib/utils";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { canEditPost } from "@/lib/permissions";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    select: { slug: true },
  });
  return posts.map((p: { slug: string }) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.post.findUnique({ where: { slug } });
  if (!post || !post.published) return {};

  const description = post.excerpt || truncate(post.content, 160);

  return {
    title: post.title,
    description,
    openGraph: {
      type: "article",
      title: post.title,
      description,
      publishedTime: post.createdAt.toISOString(),
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const session = await auth();

  const post = await prisma.post.findUnique({
    where: { slug },
    include: { author: { select: { id: true, name: true } } },
  });

  if (!post || !post.published) notFound();

  const canEdit = canEditPost(session, post.author.id);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link
        href="/"
        className="text-[#1a3a6b] text-sm hover:underline mb-6 inline-block"
      >
        ← Zpět na aktuality
      </Link>

      <article>
        {post.coverImage && (
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
        )}
        <div className="text-sm text-gray-500 mb-2">
          {formatDate(post.createdAt)} · {post.author.name}
        </div>
        <h1 className="text-3xl font-bold text-[#1a3a6b] mb-6">{post.title}</h1>
        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      {canEdit && (
        <div className="mt-8 pt-6 border-t border-gray-200 flex gap-3">
          <Link
            href={`/admin/prispevky/${post.id}`}
            className="bg-[#1a3a6b] text-white px-4 py-2 rounded text-sm font-medium hover:bg-[#0f2448] transition-colors"
          >
            Upravit příspěvek
          </Link>
        </div>
      )}
    </div>
  );
}

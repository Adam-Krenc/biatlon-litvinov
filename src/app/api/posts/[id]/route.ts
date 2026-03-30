import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { canEditPost, canDeletePost } from "@/lib/permissions";
import sanitizeHtml from "sanitize-html";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(_req: NextRequest, { params }: Params) {
  const { id } = await params;
  const post = await prisma.post.findUnique({
    where: { id },
    include: { author: { select: { id: true, name: true } } },
  });
  if (!post) return NextResponse.json({ error: "Nenalezeno" }, { status: 404 });
  return NextResponse.json(post);
}

export async function PATCH(req: NextRequest, { params }: Params) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Nepřihlášen" }, { status: 401 });
  }

  const post = await prisma.post.findUnique({
    where: { id },
    select: { authorId: true },
  });
  if (!post) return NextResponse.json({ error: "Nenalezeno" }, { status: 404 });

  if (!canEditPost(session, post.authorId)) {
    return NextResponse.json({ error: "Nemáš oprávnění" }, { status: 403 });
  }

  const body = await req.json();
  const { title, content, excerpt, published, coverImage } = body;

  const safeContent = content
    ? sanitizeHtml(content, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img", "h2", "h3"]),
        allowedAttributes: { ...sanitizeHtml.defaults.allowedAttributes, img: ["src", "alt"] },
      })
    : undefined;

  const updated = await prisma.post.update({
    where: { id },
    data: {
      ...(title !== undefined && { title: title.trim() }),
      ...(safeContent !== undefined && { content: safeContent }),
      ...(excerpt !== undefined && { excerpt: excerpt?.trim() || null }),
      ...(published !== undefined && { published }),
      ...(coverImage !== undefined && { coverImage: coverImage || null }),
    },
    include: { author: { select: { id: true, name: true } } },
  });

  return NextResponse.json(updated);
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Nepřihlášen" }, { status: 401 });
  }

  const post = await prisma.post.findUnique({
    where: { id },
    select: { authorId: true },
  });
  if (!post) return NextResponse.json({ error: "Nenalezeno" }, { status: 404 });

  if (!canDeletePost(session, post.authorId)) {
    return NextResponse.json({ error: "Nemáš oprávnění" }, { status: 403 });
  }

  await prisma.post.delete({ where: { id } });
  return NextResponse.json({ success: true });
}

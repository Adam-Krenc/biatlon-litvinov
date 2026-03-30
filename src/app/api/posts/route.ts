import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";
import sanitizeHtml from "sanitize-html";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") ?? "1");
  const limit = parseInt(searchParams.get("limit") ?? "12");
  const skip = (page - 1) * limit;

  const session = await auth();
  const where = session ? {} : { published: true };

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
      include: { author: { select: { id: true, name: true } } },
    }),
    prisma.post.count({ where }),
  ]);

  return NextResponse.json({ posts, total, page, limit });
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Nepřihlášen" }, { status: 401 });
  }

  const body = await req.json();
  const { title, content, excerpt, published, coverImage } = body;

  if (!title?.trim() || !content?.trim()) {
    return NextResponse.json({ error: "Název a obsah jsou povinné" }, { status: 400 });
  }

  const safeContent = sanitizeHtml(content, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img", "h2", "h3"]),
    allowedAttributes: { ...sanitizeHtml.defaults.allowedAttributes, img: ["src", "alt"] },
  });

  let slug = slugify(title);
  const existing = await prisma.post.findUnique({ where: { slug } });
  if (existing) slug = `${slug}-${Date.now()}`;

  const post = await prisma.post.create({
    data: {
      title: title.trim(),
      slug,
      content: safeContent,
      excerpt: excerpt?.trim() || null,
      published: published ?? true,
      coverImage: coverImage || null,
      authorId: session.user.id,
    },
    include: { author: { select: { id: true, name: true } } },
  });

  return NextResponse.json(post, { status: 201 });
}

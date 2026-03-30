import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { canEditStaticPages } from "@/lib/permissions";
import { revalidatePath } from "next/cache";
import sanitizeHtml from "sanitize-html";

interface Params {
  params: Promise<{ slug: string }>;
}

export async function GET(_req: NextRequest, { params }: Params) {
  const { slug } = await params;
  const page = await prisma.staticPage.findUnique({ where: { slug } });
  if (!page) return NextResponse.json({ error: "Nenalezeno" }, { status: 404 });
  return NextResponse.json(page);
}

export async function PATCH(req: NextRequest, { params }: Params) {
  const { slug } = await params;
  const session = await auth();

  if (!canEditStaticPages(session)) {
    return NextResponse.json({ error: "Nemáš oprávnění" }, { status: 403 });
  }

  const body = await req.json();
  const { title, content } = body;

  const safeContent = sanitizeHtml(content, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img", "h2", "h3"]),
    allowedAttributes: { ...sanitizeHtml.defaults.allowedAttributes, img: ["src", "alt"] },
  });

  const updated = await prisma.staticPage.update({
    where: { slug },
    data: {
      ...(title !== undefined && { title: title.trim() }),
      content: safeContent,
    },
  });

  revalidatePath(`/${slug}`);

  return NextResponse.json(updated);
}

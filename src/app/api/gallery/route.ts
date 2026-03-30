import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { canManageGallery } from "@/lib/permissions";

export async function GET() {
  const galleries = await prisma.gallery.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      photos: {
        take: 1,
        orderBy: { uploadedAt: "asc" },
        select: { thumbnailUrl: true },
      },
      _count: { select: { photos: true } },
    },
  });
  return NextResponse.json(galleries);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!canManageGallery(session)) {
    return NextResponse.json({ error: "Nemáš oprávnění" }, { status: 403 });
  }

  const body = await req.json();
  const { name, description } = body;
  if (!name?.trim()) {
    return NextResponse.json({ error: "Název je povinný" }, { status: 400 });
  }

  const gallery = await prisma.gallery.create({
    data: { name: name.trim(), description: description?.trim() || null },
  });

  return NextResponse.json(gallery, { status: 201 });
}

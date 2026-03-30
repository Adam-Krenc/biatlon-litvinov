import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { canManageGallery } from "@/lib/permissions";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(_req: NextRequest, { params }: Params) {
  const { id } = await params;
  const gallery = await prisma.gallery.findUnique({
    where: { id },
    include: {
      photos: { orderBy: { uploadedAt: "asc" } },
    },
  });
  if (!gallery) return NextResponse.json({ error: "Nenalezeno" }, { status: 404 });
  return NextResponse.json(gallery);
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const { id } = await params;
  const session = await auth();

  if (!canManageGallery(session)) {
    return NextResponse.json({ error: "Nemáš oprávnění" }, { status: 403 });
  }

  await prisma.gallery.delete({ where: { id } });
  return NextResponse.json({ success: true });
}

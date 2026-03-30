import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { canManageGallery } from "@/lib/permissions";
import { cloudinary } from "@/lib/cloudinary";

interface Params {
  params: Promise<{ photoId: string }>;
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const { photoId } = await params;
  const session = await auth();

  if (!canManageGallery(session)) {
    return NextResponse.json({ error: "Nemáš oprávnění" }, { status: 403 });
  }

  const photo = await prisma.photo.findUnique({ where: { id: photoId } });
  if (!photo) return NextResponse.json({ error: "Fotografie nenalezena" }, { status: 404 });

  await cloudinary.uploader.destroy(photo.cloudinaryId);
  await prisma.photo.delete({ where: { id: photoId } });

  return NextResponse.json({ success: true });
}

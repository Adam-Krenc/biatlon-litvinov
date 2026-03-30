import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { canManageGallery } from "@/lib/permissions";
import { cloudinary, getThumbnailUrl } from "@/lib/cloudinary";

interface Params {
  params: Promise<{ id: string }>;
}

export async function POST(req: NextRequest, { params }: Params) {
  const { id: galleryId } = await params;
  const session = await auth();

  if (!canManageGallery(session)) {
    return NextResponse.json({ error: "Nemáš oprávnění" }, { status: 403 });
  }

  const gallery = await prisma.gallery.findUnique({ where: { id: galleryId } });
  if (!gallery) return NextResponse.json({ error: "Galerie nenalezena" }, { status: 404 });

  const formData = await req.formData();
  const file = formData.get("file") as File;
  const caption = formData.get("caption") as string | null;

  if (!file) {
    return NextResponse.json({ error: "Soubor je povinný" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const base64 = buffer.toString("base64");
  const dataUri = `data:${file.type};base64,${base64}`;

  const result = await cloudinary.uploader.upload(dataUri, {
    folder: "biatlon-litvínov",
    resource_type: "image",
  });

  const photo = await prisma.photo.create({
    data: {
      cloudinaryId: result.public_id,
      url: result.secure_url,
      thumbnailUrl: getThumbnailUrl(result.secure_url, 400),
      caption: caption?.trim() || null,
      width: result.width,
      height: result.height,
      galleryId,
      uploaderId: session!.user.id,
    },
  });

  return NextResponse.json(photo, { status: 201 });
}

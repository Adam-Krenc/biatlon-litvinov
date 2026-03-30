import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import GalleryView from "@/components/gallery/GalleryView";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function GalleryPage({ params }: Props) {
  const { id } = await params;

  const gallery = await prisma.gallery.findUnique({
    where: { id },
    include: {
      photos: { orderBy: { uploadedAt: "asc" } },
    },
  });

  if (!gallery) notFound();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Link
        href="/fotogalerie"
        className="text-[#1a3a6b] text-sm hover:underline mb-4 inline-block"
      >
        ← Zpět na fotogalerie
      </Link>
      <h1 className="text-2xl font-bold text-[#1a3a6b] mb-2">{gallery.name}</h1>
      {gallery.description && (
        <p className="text-gray-600 mb-6">{gallery.description}</p>
      )}
      <GalleryView photos={gallery.photos} />
    </div>
  );
}

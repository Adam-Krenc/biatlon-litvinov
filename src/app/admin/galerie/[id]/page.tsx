import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import PhotoUploader from "@/components/gallery/PhotoUploader";
import AdminPhotoGrid from "@/components/gallery/AdminPhotoGrid";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function AdminGalleryDetailPage({ params }: Props) {
  const { id } = await params;
  const session = await auth();
  if (session?.user?.role !== "ADMIN") redirect("/admin");

  const gallery = await prisma.gallery.findUnique({
    where: { id },
    include: { photos: { orderBy: { uploadedAt: "asc" } } },
  });

  if (!gallery) notFound();

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/galerie" className="text-[#1a3a6b] hover:underline text-sm">
          ← Galerie
        </Link>
        <span className="text-gray-400">/</span>
        <h1 className="text-xl font-bold text-[#1a3a6b]">{gallery.name}</h1>
      </div>

      <div className="mb-8 bg-white rounded-lg shadow-sm border border-gray-100 p-5">
        <h2 className="font-semibold text-[#1a3a6b] mb-4">Nahrát fotky</h2>
        <PhotoUploader galleryId={id} />
      </div>

      <h2 className="font-semibold text-[#1a3a6b] mb-4">
        Fotky v albu ({gallery.photos.length})
      </h2>
      <AdminPhotoGrid photos={gallery.photos} />
    </div>
  );
}

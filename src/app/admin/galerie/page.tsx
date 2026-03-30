import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import NewGalleryForm from "./NewGalleryForm";
import DeleteGalleryButton from "./DeleteGalleryButton";

export default async function AdminGaleriePage() {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") redirect("/admin");

  const galleries = await prisma.gallery.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: { select: { photos: true } },
      photos: { take: 1, select: { thumbnailUrl: true } },
    },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1a3a6b] mb-6">Fotogalerie</h1>

      <div className="mb-8 bg-white rounded-lg shadow-sm border border-gray-100 p-5">
        <h2 className="font-semibold text-[#1a3a6b] mb-4">Vytvořit nové album</h2>
        <NewGalleryForm />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {galleries.map((gallery) => (
          <div
            key={gallery.id}
            className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
          >
            <div className="aspect-video bg-gray-100 overflow-hidden">
              {gallery.photos[0] ? (
                <img
                  src={gallery.photos[0].thumbnailUrl}
                  alt={gallery.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                  Prázdné album
                </div>
              )}
            </div>
            <div className="p-3">
              <div className="font-medium text-[#1a3a6b]">{gallery.name}</div>
              <div className="text-gray-500 text-xs mt-0.5 mb-3">
                {gallery._count.photos} fotek · {formatDate(gallery.createdAt)}
              </div>
              <div className="flex gap-2">
                <Link
                  href={`/admin/galerie/${gallery.id}`}
                  className="bg-[#1a3a6b] text-white px-3 py-1 rounded text-xs hover:bg-[#0f2448]"
                >
                  Spravovat
                </Link>
                <Link
                  href={`/fotogalerie/${gallery.id}`}
                  target="_blank"
                  className="border border-gray-300 text-gray-700 px-3 py-1 rounded text-xs hover:bg-gray-50"
                >
                  Zobrazit ↗
                </Link>
                <DeleteGalleryButton galleryId={gallery.id} galleryName={gallery.name} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

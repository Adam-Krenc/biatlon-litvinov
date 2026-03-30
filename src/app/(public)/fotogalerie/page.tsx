import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

export const revalidate = 60;

export default async function FotogaleriePage() {
  const galleries = await prisma.gallery.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      photos: {
        take: 1,
        orderBy: { uploadedAt: "asc" },
        select: { thumbnailUrl: true, url: true },
      },
      _count: { select: { photos: true } },
    },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-[#1a3a6b] mb-8">Fotogalerie</h1>

      {galleries.length === 0 ? (
        <p className="text-gray-500 text-center py-16">Zatím žádná alba.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleries.map((gallery) => (
            <Link
              key={gallery.id}
              href={`/fotogalerie/${gallery.id}`}
              className="group block bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="aspect-video bg-gray-100 overflow-hidden">
                {gallery.photos[0] ? (
                  <img
                    src={gallery.photos[0].thumbnailUrl}
                    alt={gallery.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                    Žádné fotky
                  </div>
                )}
              </div>
              <div className="p-3">
                <div className="font-medium text-[#1a3a6b] text-sm">{gallery.name}</div>
                <div className="text-gray-500 text-xs mt-0.5">
                  {gallery._count.photos} fotek · {formatDate(gallery.createdAt)}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

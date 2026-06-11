import { prisma } from "@/lib/prisma";

export default async function SponsorsBand() {
  const sponsors = await prisma.sponsor.findMany({
    where: { active: true },
    orderBy: { order: "asc" },
  });

  if (sponsors.length === 0) return null;

  return (
    <section className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-[#1a3a6b]">
            Děkujeme za podporu
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Náš klub podporují
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
          {sponsors.map((s) => {
            const logo = (
              <img
                src={s.logoUrl}
                alt={s.name}
                loading="lazy"
                className="max-h-16 max-w-[160px] w-auto object-contain"
              />
            );

            return s.website ? (
              <a
                key={s.id}
                href={s.website}
                target="_blank"
                rel="noopener noreferrer"
                title={s.name}
                className="group flex h-24 w-44 items-center justify-center rounded-xl border border-gray-200 bg-white px-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#1a3a6b]/30 hover:shadow-md"
              >
                {logo}
              </a>
            ) : (
              <div
                key={s.id}
                title={s.name}
                className="flex h-24 w-44 items-center justify-center rounded-xl border border-gray-200 bg-white px-5 shadow-sm"
              >
                {logo}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

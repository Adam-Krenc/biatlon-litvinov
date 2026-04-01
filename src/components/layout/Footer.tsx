import { prisma } from "@/lib/prisma";

export default async function Footer() {
  const sponsors = await prisma.sponsor.findMany({
    where: { active: true },
    orderBy: { order: "asc" },
  });

  return (
    <footer className="bg-[#1a3a6b] text-white mt-auto">
      {/* Sponzoři */}
      {sponsors.length > 0 && (
        <div className="border-b border-white/20 py-4 px-4">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-6">
            <span className="text-xs text-white/40 uppercase tracking-wider shrink-0">
              Partneři &amp; sponzoři
            </span>
            {sponsors.map((s) => (
              <a
                key={s.id}
                href={s.website ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                title={s.name}
                className="opacity-60 hover:opacity-100 transition-opacity"
              >
                <img
                  src={s.logoUrl}
                  alt={s.name}
                  className="h-8 max-w-[100px] object-contain brightness-0 invert"
                />
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Spodní řádek */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-2 text-xs text-white/50">
        <span>© {new Date().getFullYear()} Klub biatlonu Litvínov z.s.</span>
        <span>
          <a href="mailto:biatlonlitvinov@seznam.cz" className="hover:text-white transition-colors">
            biatlonlitvinov@seznam.cz
          </a>
          {" · "}
          <a href="tel:+420776209440" className="hover:text-white transition-colors">
            776 209 440
          </a>
        </span>
      </div>
    </footer>
  );
}

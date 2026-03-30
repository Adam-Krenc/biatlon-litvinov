import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#1a3a6b] text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-[#e8c547] mb-3">
              Klub biatlonu Litvínov
            </h3>
            <p className="text-white/70 text-sm">
              Klub biatlonu Litvínov z.s.
              <br />
              Spojeneckých letců 797
              <br />
              435 11 Lom u Mostu
            </p>
          </div>
          <div>
            <h3 className="font-bold text-[#e8c547] mb-3">Kontakt</h3>
            <p className="text-white/70 text-sm">
              <a
                href="mailto:biatlonlitvinov@seznam.cz"
                className="hover:text-white"
              >
                biatlonlitvinov@seznam.cz
              </a>
              <br />
              <a href="tel:+420776209440" className="hover:text-white">
                776 209 440
              </a>
              <br />
              Předseda: Ing. Miroslav Otcovský
            </p>
          </div>
          <div>
            <h3 className="font-bold text-[#e8c547] mb-3">Navigace</h3>
            <ul className="text-white/70 text-sm space-y-1">
              <li>
                <Link href="/treninky" className="hover:text-white">
                  Tréninky
                </Link>
              </li>
              <li>
                <Link href="/fotogalerie" className="hover:text-white">
                  Fotogalerie
                </Link>
              </li>
              <li>
                <Link href="/nase-uspechy" className="hover:text-white">
                  Naše úspěchy
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="hover:text-white">
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/20 mt-6 pt-4 text-center text-white/40 text-xs">
          © {new Date().getFullYear()} Klub biatlonu Litvínov z.s. IČ:
          01880004
        </div>
      </div>
    </footer>
  );
}

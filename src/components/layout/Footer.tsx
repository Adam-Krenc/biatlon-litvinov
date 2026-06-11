export default function Footer() {
  return (
    <footer className="bg-[#1a3a6b] text-white mt-auto">
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

export default function KontaktPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-[#1a3a6b] mb-8">Kontakt</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h2 className="font-bold text-lg text-[#1a3a6b] mb-4">
            Kontaktní informace
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex gap-3">
              <span className="font-medium w-24 shrink-0">Předseda:</span>
              <span>Ing. Miroslav Otcovský</span>
            </li>
            <li className="flex gap-3">
              <span className="font-medium w-24 shrink-0">Telefon:</span>
              <a href="tel:+420777360346" className="text-[#1a3a6b] hover:underline">
                777 360 346
              </a>
            </li>
            <li className="flex gap-3">
              <span className="font-medium w-24 shrink-0">Email:</span>
              <a href="mailto:biatlonlitvinov@seznam.cz" className="text-[#1a3a6b] hover:underline">
                biatlonlitvinov@seznam.cz
              </a>
            </li>
          </ul>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h2 className="font-bold text-lg text-[#1a3a6b] mb-4">Adresa</h2>
          <address className="not-italic text-gray-700 space-y-1">
            <p className="font-medium">Klub biatlonu Litvínov z.s.</p>
            <p>Spojeneckých letců 797</p>
            <p>435 11 Lom u Mostu</p>
            <p className="mt-2 text-sm text-gray-500">IČ: 01880004</p>
          </address>
        </div>
      </div>
    </div>
  );
}

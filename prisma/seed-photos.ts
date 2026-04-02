/**
 * Aktualizuje obsah článků – přidá všechny fotky ze starého webu.
 * Spustit: npx tsx prisma/seed-photos.ts
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const G = "https://biatlonlitvinov.cz/wp-content/gallery";
const U = "http://biatlonlitvinov.cz/wp-content/uploads";

/** Pomocník: obrázek přes celou šířku */
const full = (src: string) => `<img src="${src}" style="width:100%;margin:0.75rem 0;" />`;

/** Pomocník: dva obrázky vedle sebe */
const pair = (a: string, b: string) =>
  `<img src="${a}" style="width:48%;float:left;margin:0 1rem 0.75rem 0;" /><img src="${b}" style="width:48%;margin:0 0 0.75rem 0;" /><div style="clear:both"></div>`;

/** Pomocník: jeden obrázek vlevo (menší), text vedle */
const left = (src: string) =>
  `<img src="${src}" style="width:45%;float:left;margin:0 1.25rem 0.75rem 0;" />`;

const posts: { slug: string; title: string; excerpt: string; publishedAt: Date; content: string }[] = [
  // ─────────────────────────────────────────────
  // 2023
  // ─────────────────────────────────────────────
  {
    slug: "univerziada-2023-lake-placid",
    title: "Univerziádní hry 2023 – zlatá v Lake Placid!",
    excerpt: "Týně se povedl husarský kousek – na zimních univerziádních hrách v Lake Placid zvítězila v závodě s hromadným startem!",
    publishedAt: new Date("2023-01-25"),
    content: `
<p>Týně se povedl husarský kousek – na zimních univerziádních hrách v americkém Lake Placid zvítězila v závodě s hromadným startem!</p>
<p>Ačkoli na první položce měla tři nesestřelené terče a vybíhala po první střelbě jako vůbec poslední, svou bojovností a zejména další čistou střelbou se postupně propracovala na první místo a celý závod ovládla. Pro náš amatérský klub z Litvínova obrovský úspěch!</p>

${full(`${G}/univerziada/un-1.jpg`)}

<p>Univerziáda je mezinárodní sportovní akce pro studenty vysokých škol a představuje jeden z největších multisportovních světových festivalů. Zimní univerziáda 2023 se konala v lednu v Lake Placid, USA – místě dvou zimních olympijských her (1932 a 1980).</p>

${pair(`${G}/univerziada/un-2.jpg`, `${G}/univerziada/un3.jpg`)}
${pair(`${G}/univerziada/un4.jpg`, `${G}/univerziada/un5.jpg`)}
${full(`${G}/univerziada/un6.jpg`)}

<p>Kristýna Otcovská závodí za reprezentaci ČR a náš klub je na ni nesmírně hrdý. Zlatá medaile z univerziády je dosud největším úspěchem v historii Klubu biatlonu Litvínov.</p>
`.trim(),
  },

  // ─────────────────────────────────────────────
  // 2022
  // ─────────────────────────────────────────────
  {
    slug: "zimni-sezona-2022-23",
    title: "Zimní sezóna 2022/23",
    excerpt: "Týna závodí za reprezentaci ČR v IBU Cupu a chystá se na zimní univerziádní hry v Lake Placid.",
    publishedAt: new Date("2022-11-15"),
    content: `
<p>Noví litvínovští biatlonisté stále nejsou a Týna závodí za reprezentaci ČR v IBU Cupu. Zároveň se chystá na zimní univerziádní hry, která se koná koncem ledna 2023 v americkém Lake Placid.</p>
<p>Informace o závodech jsou průběžně aktualizovány na stránkách <a href="https://www.biatlon.cz">Českého biatlonového svazu</a>.</p>
<p>Pokud by měl někdo z regionu zájem o biatlon, jsme stále k dispozici – náš klub je schopen poskytnout malorážky a pomoci se začátky.</p>
`.trim(),
  },
  {
    slug: "priprava-na-sezonu-2022-23",
    title: "Příprava na sezónu 2022/23 – Týna v reprezentačním B týmu",
    excerpt: "Kristýna Otcovská byla nominována do reprezentačního B týmu žen a trénuje s reprezentačními trenéry.",
    publishedAt: new Date("2022-09-01"),
    content: `
<p>Sen pokračuje! Kristýna Otcovská byla nominována do reprezentačního B týmu žen. Přípravu již absolvuje s reprezentačními trenéry a oddílová příprava je v této fázi minulostí.</p>
<p>Bohužel v Litvínově a okolí nejsou zájemci o biatlon, není koho trénovat. Pokud by měl někdo zájem, samozřejmě je vítán – oddíl je schopen poskytnout případným zájemcům i malorážky.</p>
`.trim(),
  },
  {
    slug: "konec-zimni-sezony-2022",
    title: "Konec zimní sezóny 2022",
    excerpt: "Zimní sezóna 2022 je za námi. Týnu nyní čeká studium a v dubnu start letní přípravy.",
    publishedAt: new Date("2022-04-10"),
    content: `
<p>Vzhledem ke studijním povinnostem Týna již neabsolvovala závěrečné mistrovství ČR v supersprintu v Jablonci nad Nisou.</p>
<p>Nyní ji čeká studium, zasloužený odpočinek a v polovině dubna zahájení letní přípravy na další sezónu. Věříme, že příští zima přinese další skvělé výsledky!</p>
`.trim(),
  },
  {
    slug: "brezen-2022-ibu-cup-ridnaun",
    title: "Březen 2022 – IBU CUP dospělých v Ridnaunu",
    excerpt: "Týna Otcovská startovala na IBU CUP dospělých v italském Ridnaunu – cenná zkušenost na mezinárodním poli.",
    publishedAt: new Date("2022-03-14"),
    content: `
<p>Na závěr sezóny byla Týna Otcovská nominována i na IBU CUP dospělých v italském Ridnaunu (10.–13. března 2022). Ridnaun patří k nejkrásnějším biatlonovým areálům v Alpách.</p>

${pair(`${U}/2022/03/pohled-na-areal-300x210.png`, `${U}/2022/03/tyna-300x191.png`)}

<p>Výsledky ze závodů v Ridnaunu:</p>
<ul>
  <li>Sprint: 42. místo</li>
  <li>Stíhačka: 46. místo</li>
  <li>Mixová štafeta: účast</li>
</ul>

${full(`${U}/2022/04/strelba-tyna-300x216.png`)}

<p>Cenná zkušenost na závodech mezi dospělými závodnicemi světové třídy. Více o závodech na stránkách <a href="https://www.biatlon.cz">biatlon.cz</a>.</p>
`.trim(),
  },
  {
    slug: "juniorske-ms-usa-2022",
    title: "Juniorské mistrovství světa v USA – Soldier Hollow",
    excerpt: "Týna Otcovská reprezentovala ČR na juniorském MS v americkém Soldier Hollow. Nejlepší výsledek – 13. místo ve vytrvalosti.",
    publishedAt: new Date("2022-03-05"),
    content: `
<p>Místem konání juniorského mistrovství světa 2022 byl Soldier Hollow v Utahu – místo olympijských soutěží z roku 2002. Týna reprezentovala ČR a přivezla cenné zkušenosti.</p>

${full(`${G}/usa-1/celkovy-pohled.jpg`)}

${pair(`${U}/2022/03/svaz-usa-1-300x198.png`, `${U}/2022/03/svaz-usa-3-300x216.png`)}

<p>Výsledky Kristýny Otcovské na MSJ 2022:</p>
<ul>
  <li><strong>Vytrvalostní závod 12,5 km:</strong> 13. místo</li>
  <li><strong>Sprint:</strong> 30. místo (ztráta 2:06 min.)</li>
  <li><strong>Stíhačka:</strong> 31. místo (střelba 0+3+1+1)</li>
  <li><strong>Štafeta:</strong> nedokončena (zranění Terezy Jandové)</li>
</ul>

${pair(`${G}/usa-1/na-trati.jpg`, `${G}/usa-1/na-trati-2.jpg`)}
${pair(`${G}/usa-1/na-trati-3.jpg`, `${G}/usa-1/srelnice.jpg`)}
${pair(`${G}/usa-1/pamatnik.jpg`, `${G}/usa-1/celek-2.jpg`)}
${full(`${G}/usa-1/svaz-usa-2.png`)}

<p>Mistrovství bylo sportovně koncertem Terezy Voborníkové, která získala zlato ve sprintu i stíhačce. Týna odvedla solidní výkony a nabyla cenné zkušenosti z vrcholné juniorské soutěže.</p>
`.trim(),
  },
  {
    slug: "unor-2022-nominace-na-ms",
    title: "Únor 2022 – IBU CUP Nové Město + nominace na MS!",
    excerpt: "Kristýna Otcovská se představila na IBU CUP dospělých v Novém Městě na Moravě a získala nominaci na juniorské MS!",
    publishedAt: new Date("2022-02-10"),
    content: `
<p>Neuvěřitelné se stalo skutkem. Kristýna Otcovská byla nominována na juniorské mistrovství světa v biatlonu, které se koná v americkém Soldier Hollow, Utah.</p>
<p>Před nominací Týna absolvovala sprint v IBU Cupu dospělých v Novém Městě na Moravě, kde skončila na 70. místě. Přesto výsledky a výkony v průběhu sezóny přesvědčily trenéry k nominaci na světový šampionát.</p>

${full(`${G}/ibu-cup/20220205_111114.jpg`)}

${pair(`${G}/ibu-cup/tyna-1.jpg`, `${G}/ibu-cup/tyna-2.jpg`)}
${pair(`${G}/ibu-cup/tyna-3.jpg`, `${G}/ibu-cup/tyna-4.jpg`)}
${full(`${G}/ibu-cup/tyna-5.jpg`)}
${full(`${G}/ibu-cup/20220205_112900.jpg`)}

${pair(`${U}/2022/02/svaz-1-300x229.png`, `${U}/2022/02/cp-1-300x243.png`)}

<p>Pro klub biatlonu Litvínov je tato nominace historickým milníkem. Náš klub vznikl teprve před pár lety a již se naše závodnice dostala na juniorský světový šampionát!</p>
`.trim(),
  },
  {
    slug: "zavody-leden-2022",
    title: "Závody v lednu 2022 – Pokljuka a juniorské ME",
    excerpt: "Leden přinesl závody ČP i nominaci na IBU CUP na Pokljuce. Nejlepší výsledek – 13. místo ve sprintu na juniorském ME.",
    publishedAt: new Date("2022-01-28"),
    content: `
<p>Leden přinesl dva závody českého poháru (Nové Město na Moravě a Jablonec nad Nisou), poté nominaci na IBU CUP ve Pokljuce a juniorské mistrovství Evropy.</p>

${full(`${U}/2022/02/svaz-martell-300x203.png`)}

${pair(`${U}/2022/02/svaz-martell-2-300x194.png`, `${U}/2022/02/svaz-martell-3-300x208.png`)}

<p>Nejlepší výsledek sezóny: <strong>13. místo ve sprintu</strong> na juniorském ME. Singl mix štafeta se povedla – české barvy hájil skvělý tým.</p>
<p>Sezóna nabírá na obrátkách a Týna stoupá ve světovém žebříčku.</p>
`.trim(),
  },

  // ─────────────────────────────────────────────
  // 2021
  // ─────────────────────────────────────────────
  {
    slug: "priprava-na-zimu-2021-22",
    title: "Příprava na zimu 2021/2022 – Oberhofu a Martell",
    excerpt: "Týna absolvovala soustředění v Oberhofu a získala nominaci na juniorský IBU CUP do Martellu.",
    publishedAt: new Date("2021-12-01"),
    content: `
<p>Letní příprava graduje! Týna dostala kontakt od reprezentačního trenéra juniorek Zdeňka Vítka a absolvovala soustředění v lyžařském tunelu v německém Oberhofu a v Obertilliachu.</p>

${pair(`${U}/2021/10/vystrizek-1-1-300x234.jpg`, `${U}/2021/10/Vystrizek-3-1-300x222.jpg`)}

<p>Výsledkem dobré letní přípravy je nominace na juniorský IBU CUP do italského Martellu – prestižní mezinárodní závodní sérii pro juniory. Sezóna 2021/22 slibuje být dosud nejúspěšnější v historii klubu.</p>
`.trim(),
  },
  {
    slug: "mcr-letni-biatlon-2021",
    title: "Mistrovství ČR v letním biatlonu 2021 – dva tituly!",
    excerpt: "Kristýna Otcovská se stala dvojnásobnou mistryní ČR v letním biatlonu 2021 – zlato ve sprintu i supersprintu!",
    publishedAt: new Date("2021-09-27"),
    content: `
<p>Mistrovství ČR v letním biatlonu proběhlo 24.–26. září 2021 v Novém Městě na Moravě. Týna Otcovská předvedla výjimečné výkony a přivezla domů zlaté medaile!</p>

<p>Výsledky Kristýny Otcovské:</p>
<ul>
  <li><strong>Sprint:</strong> 🥇 1. místo (střelba 1+2)</li>
  <li><strong>Supersprint:</strong> 🥇 1. místo</li>
  <li><strong>Vytrvalostní závod:</strong> 🥉 3. místo (střelba 2+3+1+3)</li>
</ul>

${full(`${G}/mcr-2021-v-letnim-biatlonu/letni-1.jpg`)}
${pair(`${G}/mcr-2021-v-letnim-biatlonu/letni-2.jpg`, `${G}/mcr-2021-v-letnim-biatlonu/letni-3.jpg`)}
${pair(`${G}/mcr-2021-v-letnim-biatlonu/letni-4.jpg`, `${G}/mcr-2021-v-letnim-biatlonu/letni-5.jpg`)}
${pair(`${G}/mcr-2021-v-letnim-biatlonu/letni-6.jpg`, `${G}/mcr-2021-v-letnim-biatlonu/letni-7.jpg`)}
${full(`${G}/mcr-2021-v-letnim-biatlonu/letni-8.jpg`)}

${pair(`${U}/2021/10/letni-3-627x700.jpg`, `${U}/2021/06/bystrice-2021-300x284.jpg`)}
${pair(`${U}/2021/07/stupne-1-655x700.jpg`, `${U}/2021/07/20200927_141027-700x599.jpg`)}

<p>Týna se stala dvojnásobnou mistryní ČR v letním biatlonu! Obrovský úspěch pro celý klub.</p>
`.trim(),
  },
  {
    slug: "mcr-koleckove-lyze-2021",
    title: "Mistrovství ČR na kolečkových lyžích 2021 – Letohrad",
    excerpt: "Kristýna Otcovská závodila na MČR v kolečkových lyžích v Letohradu a dvakrát skončila na 5. místě.",
    publishedAt: new Date("2021-09-06"),
    content: `
<p>Mistrovství ČR na kolečkových lyžích proběhlo 4.–5. září 2021 v Letohradu. Kristýna Otcovská závodila ve třech disciplínách.</p>

<p>Výsledky:</p>
<ul>
  <li><strong>Sobota – Sprint 7,5 km:</strong> 5. místo (střelba 2+1)</li>
  <li><strong>Sobota – Supersprint:</strong> nepostoupila do finále</li>
  <li><strong>Neděle – Stíhací závod 10 km:</strong> 5. místo</li>
</ul>

${full(`${G}/mcr-2021-koleckove-lyze/kolce-1.jpg`)}
${pair(`${G}/mcr-2021-koleckove-lyze/kolce-2.jpg`, `${G}/mcr-2021-koleckove-lyze/kolce-3.jpg`)}
${pair(`${G}/mcr-2021-koleckove-lyze/kolce-4.jpg`, `${G}/mcr-2021-koleckove-lyze/kolce-5.jpg`)}
${pair(`${G}/mcr-2021-koleckove-lyze/kolce-6.jpg`, `${G}/mcr-2021-koleckove-lyze/kolce-7.jpg`)}
${full(`${G}/mcr-2021-koleckove-lyze/kolce-8.jpg`)}

<p>Kolečkové lyže jsou letní náhradou za zimní biatlon a přípravou na zimní sezónu. Výkony v Letohradu naznačují, že zimní sezóna 2021/22 by mohla být velmi úspěšná.</p>
`.trim(),
  },
  {
    slug: "scm-cup-2021",
    title: "SCM Cup 2021 – Týna porazila všechnu konkurenci!",
    excerpt: "Týna Otcovská zvítězila v SCM Cupu a porazila veškerou konkurenci včetně juniorských reprezentantek.",
    publishedAt: new Date("2021-08-28"),
    content: `
<p>SCM Cup sloužil jako prolog před IBU mistrovstvím světa v biatlonu na kolečkových lyžích. Týna Otcovská připravila sobě i ostatním obrovské překvapení.</p>
<p>V těchto kontrolních závodech zvítězila a porazila všechnu konkurenci – včetně juniorských reprezentantek! Výsledek upoutal pozornost trenérů a otevřel dveře k dalším příležitostem.</p>
<p>SCM (Sportovní centrum mládeže) jsou výběrové závody, kde se hodnotí výkonnost mladých sportovců a rozhoduje o podpoře pro příští sezónu. Vítězství v SCM Cupu je proto velmi cenné.</p>
`.trim(),
  },
  {
    slug: "letni-soustredeni-bozi-dar-2021",
    title: "Letní soustředění Boží Dar 2021",
    excerpt: "Dvoutýdenní letní soustředění na Božím Daru s intenzivním tréninkem běhu, kolečkových lyží a střelby.",
    publishedAt: new Date("2021-08-10"),
    content: `
<p>Přelom července a srpna 2021 – letní soustředění na Božím Daru ve spolupráci s klubem SG Jablonec. Dvoutýdenní soustředění bylo plné intenzivního tréninku.</p>

${full(`${G}/soustredeni-bozi-dar-2021/Bozi-Dar-1.jpg`)}
${pair(`${G}/soustredeni-bozi-dar-2021/Bozi-Dar-2.jpg`, `${G}/soustredeni-bozi-dar-2021/Bozi-Dar-3.jpg`)}
${full(`${G}/soustredeni-bozi-dar-2021/Bozi-Dar-4.jpg`)}

<p>Program soustředění zahrnoval:</p>
<ul>
  <li>Každodenní fyzický trénink – běh, kolečkové lyže, jízda na kole</li>
  <li>Střelecký trénink v Jáchymově</li>
  <li>Střelba v německém Oberwiesenthalu</li>
  <li>Kombinovaný trénink – střelba po fyzické zátěži</li>
</ul>

<p>Boží Dar a okolní hory jsou ideálním místem pro letní biatlon – kombinace krásné přírody, vhodného terénu a střelnice v dosahu.</p>
`.trim(),
  },
  {
    slug: "i-cp-letni-biatlon-2021",
    title: "I. ČP v letním biatlonu 2021 – akademická mistryně ČR!",
    excerpt: "Kristýna Otcovská se stala dvojnásobnou akademickou mistryní ČR v letním biatlonu v Bystřici pod Hostýnem.",
    publishedAt: new Date("2021-06-28"),
    content: `
<p>Závody I. kola Českého poháru v letním biatlonu a akademické mistrovství ČR se konaly 25.–27. června 2021 v Bystřici pod Hostýnem.</p>

<p>Výsledky Kristýny Otcovské:</p>
<ul>
  <li><strong>Akademické MČR – hromadný start:</strong> 🥇 1. místo (akademická mistryně ČR)</li>
  <li><strong>Akademické MČR – sprint:</strong> 🥇 1. místo (akademická mistryně ČR)</li>
  <li><strong>Český pohár – sprint:</strong> 2. místo</li>
  <li><strong>Český pohár – hromadný start:</strong> 2. místo</li>
</ul>

${pair(`${G}/i-cp-letni-2021/20210626_140003.jpg`, `${G}/i-cp-letni-2021/20210627_100702.jpg`)}
${pair(`${G}/i-cp-letni-2021/20210627_101920.jpg`, `${G}/i-cp-letni-2021/20210627_110320.jpg`)}

<p>Týna je dvojnásobnou akademickou mistryní ČR! Honza Němec také závodil a ve výkonnostních třídách dosáhl skvělých výsledků.</p>

<h3>Funkční testy 2021</h3>
<p>V červnu 2021 proběhly také funkční testy na běžeckém pásu – důležitá součást přípravy každého biatlonisty.</p>

${pair(`${G}/funkcni-testy-2021/20210614_155206.jpg`, `${G}/funkcni-testy-2021/20210614_155216.jpg`)}
${pair(`${G}/funkcni-testy-2021/20210614_162014.jpg`, `${G}/funkcni-testy-2021/20210614_162021.jpg`)}
`.trim(),
  },

  // ─────────────────────────────────────────────
  // 2020
  // ─────────────────────────────────────────────
  {
    slug: "mcr-zimni-biatlon-2020",
    title: "Mistrovství ČR v zimním biatlonu 2020 – Nové Město na Moravě",
    excerpt: "Kristýna Otcovská závodila na MČR v zimním biatlonu v Novém Městě na Moravě a vybojovala 2. místo ve sprintu.",
    publishedAt: new Date("2020-02-17"),
    content: `
<p>Mistrovství ČR v zimním biatlonu 2020 se konalo v únoru v Novém Městě na Moravě. Kristýna Otcovská předvedla skvělé výkony a vybojovala stříbrnou medaili ve sprintu!</p>

${full(`${G}/mcr-2020-lyze/20200214_095939.jpg`)}
${pair(`${G}/mcr-2020-lyze/20200214_100006.jpg`, `${G}/mcr-2020-lyze/20200215_102633.jpg`)}
${pair(`${G}/mcr-2020-lyze/20200215_103113.jpg`, `${G}/mcr-2020-lyze/20200216_111817.jpg`)}
${pair(`${G}/mcr-2020-lyze/20200216_112004.jpg`, `${G}/mcr-2020-lyze/20200216_112740.jpg`)}
${full(`${G}/mcr-2020-lyze/20200216_114843.jpg`)}

<p>Výsledky: <strong>2. místo ve sprintu</strong>, 3. místo ve vytrvalostním závodě. Závody potvrdily, že Týna patří mezi nejlepší české juniorky.</p>
`.trim(),
  },
  {
    slug: "mcr-koleckove-lyze-2020",
    title: "Mistrovství ČR na kolečkových lyžích 2020",
    excerpt: "Kristýna Otcovská závodila na MČR v kolečkových lyžích 2020 a vybojovala zlatou medaili ve sprintu!",
    publishedAt: new Date("2020-09-20"),
    content: `
<p>Mistrovství ČR na kolečkových lyžích 2020 přineslo Kristýně Otcovské zlatou medaili ve sprintu – první velký titul v historii Klubu biatlonu Litvínov!</p>

${full(`${G}/mcr-2020-koleckove-lyze/kolce-2020-1.jpg`)}
${pair(`${G}/mcr-2020-koleckove-lyze/kolce-2020-2.jpg`, `${G}/mcr-2020-koleckove-lyze/kolce-2020-3.jpg`)}
${pair(`${G}/mcr-2020-koleckove-lyze/kolce-2020-4.jpg`, `${G}/mcr-2020-koleckove-lyze/kolce-2020-5.jpg`)}
${full(`${G}/mcr-2020-koleckove-lyze/kolce-2020-6.jpg`)}

<p>Výsledky: <strong>🥇 1. místo ve sprintu</strong>, 3. místo ve vytrvalostním závodě. Historický úspěch pro klub!</p>
`.trim(),
  },
  {
    slug: "i-cp-zimni-jablonec-2020",
    title: "I. ČP zimního biatlonu 2020 – Jablonec nad Nisou",
    excerpt: "První závody sezóny 2019/20 v Jablonci nad Nisou – Týna sbírá zkušenosti na lyžích.",
    publishedAt: new Date("2020-01-13"),
    content: `
<p>I. kolo Českého poháru v zimním biatlonu sezóny 2019/20 se konalo v lednu v Jablonci nad Nisou. Pro naše závodníky cenná zkušenost v závodním prostředí na lyžích.</p>

${full(`${G}/i-cp-zimni-jablonec/20200111_112012.jpg`)}
${pair(`${G}/i-cp-zimni-jablonec/20200112_113634.jpg`, `${G}/i-cp-zimni-jablonec/cil.jpg`)}
${full(`${G}/i-cp-zimni-jablonec/rovina.jpg`)}

<p>Zimní závody v Jablonci nad Nisou jsou tradičně výbornou průpravou pro náročnější závodní sezónu.</p>
`.trim(),
  },
  {
    slug: "vitejte-na-novem-webu",
    title: "Vítejte na novém webu!",
    excerpt: "Vítáme vás na novém webu Klubu biatlonu Litvínov.",
    publishedAt: new Date("2024-01-01"),
    content: `<p>Vítáme vás na novém webu Klubu biatlonu Litvínov. Budeme zde zveřejňovat aktuality, výsledky závodů a novinky z tréninků.</p>`,
  },
];

async function main() {
  console.log("📸 Aktualizuji články s fotkami...\n");

  for (const { publishedAt, ...post } of posts) {
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: {
        content: post.content,
        excerpt: post.excerpt,
        title: post.title,
      },
      create: {
        ...post,
        published: true,
        createdAt: publishedAt,
        updatedAt: publishedAt,
        author: { connect: { email: "biatlonlitvinov@seznam.cz" } },
      },
    });
    console.log(`✅ ${post.title}`);
  }

  console.log("\n🎉 Hotovo!");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Admin user
  const hashedPassword = await bcrypt.hash("admin123", 12);
  const admin = await prisma.user.upsert({
    where: { email: "biatlonlitvinov@seznam.cz" },
    update: {},
    create: {
      name: "Miroslav Otcovský",
      email: "biatlonlitvinov@seznam.cz",
      password: hashedPassword,
      role: "ADMIN",
    },
  });
  console.log("✅ Admin vytvořen:", admin.email);

  // Static pages
  const staticPages = [
    {
      slug: "klub",
      title: "Klub",
      content: `<h2>Klub biatlonu Litvínov</h2>
<p>Klub biatlonu Litvínov z.s. je sportovní klub zaměřený na biatlon. Naším cílem je rozvíjet biatlon v regionu a vychovat nové závodníky.</p>
<p>Klub byl založen s cílem sdružovat sportovce, kteří mají zájem o biatlon – kombinaci běhu na lyžích a střelby.</p>
<h3>Kontaktní informace</h3>
<p>Email: biatlonlitvinov@seznam.cz<br>Telefon: 776 209 440</p>`,
    },
    {
      slug: "treninky",
      title: "Tréninky",
      content: `<h2>Tréninky</h2>
<p>Biatlon je kombinací fyzické připravenosti, tréninku střelby a skloubení fyzické zátěže se střeleckou přesností.</p>
<h3>Zimní příprava</h3>
<p>V zimě trénujeme na lyžích v lokalitách Dlouhá Louka nebo Klíny. Pořádáme také soustředění v Jáchymově a Jablonci nad Nisou.</p>
<h3>Letní příprava</h3>
<p>V létě se zaměřujeme na kondici – běhání, jízdu na kole a kolečkové lyže.</p>
<h3>Střelecký trénink</h3>
<p>Střelecký trénink probíhá na střelnici v Meziboří ve spolupráci s místním střeleckým klubem.</p>
<h3>Frekvence tréninků</h3>
<p>Trénujeme minimálně 4–5x týdně odpoledne. Od roku 2020 spolupracujeme s biatlonovým oddílem SG Jablonec.</p>`,
    },
    {
      slug: "pro-zajemce",
      title: "Pro zájemce",
      content: `<h2>Pro zájemce o biatlon</h2>
<p>Máš zájem o biatlon? Rádi tě přivítáme v našem klubu!</p>
<h3>Komu je biatlon určen?</h3>
<p>Biatlon je vhodný pro děti, mládež i dospělé, kteří rádi sportují a chtějí se naučit kombinovat lyžování se střelbou.</p>
<h3>Jak začít?</h3>
<p>Stačí nás kontaktovat na emailu biatlonlitvinov@seznam.cz nebo telefonicky na čísle 776 209 440. Rádi vám odpovíme na všechny otázky.</p>
<h3>Co potřebuješ?</h3>
<p>Na začátku stačí sportovní oblečení a chuť sportovat. Vybavení se dá zapůjčit.</p>`,
    },
    {
      slug: "podporuji-nas",
      title: "Podporují nás",
      content: `<h2>Podporují nás</h2>
<p>Děkujeme všem, kteří nás podporují a umožňují nám rozvíjet biatlon v Litvínově.</p>
<h3>Naši partneři a sponzoři</h3>
<ul>
<li><strong>Luftuj s.r.o.</strong> – Generózní donátor v roce 2023</li>
<li><strong>Ústecký kraj</strong> – Program SPORT (2020–2022)</li>
<li><strong>SSK Litvínov</strong> – Podpora v letech 2021–2022</li>
<li><strong>Národní sportovní agentura</strong> – Podpora v roce 2021</li>
<li><strong>Archa interiér</strong> – Finanční podpora v roce 2020</li>
</ul>
<p>Pokud máte zájem o spolupráci, kontaktujte nás na biatlonlitvinov@seznam.cz</p>`,
    },
    {
      slug: "nase-uspechy",
      title: "Naše úspěchy",
      content: `<h2>Naše úspěchy</h2>
<h3>2023 – Univerziádní hry, Lake Placid</h3>
<p>Týna Otcovská získala zlatou medaili v závodě s hromadným startem.</p>
<h3>2021 – Mistrovství ČR v letním biatlonu</h3>
<p>Týna Otcovská: dva tituly a bronzová medaile (zlato ve sprintu a super-sprintu, bronz v závodě s hromadným startem).</p>
<h3>2021 – Akademické mistrovství ČR</h3>
<p>Kristýna Otcovská: akademická mistryně ČR v závodě s hromadným startem a sprintu.</p>
<h3>2020 – Mistrovství ČR v letním biatlonu (Letohrad)</h3>
<p>Kristýna Otcovská: mistryně ČR ve sprintu, 3. místo v závodě s hromadným startem.</p>
<h3>2020 – Zimní biatlon Cup III (Nové Město na Moravě)</h3>
<p>Kristýna Otcovská: 2. místo ve sprintu.</p>`,
    },
  ];

  for (const page of staticPages) {
    await prisma.staticPage.upsert({
      where: { slug: page.slug },
      update: {},
      create: page,
    });
    console.log(`✅ Stránka "${page.title}" vytvořena`);
  }

  // Articles from old website
  const posts = [
    {
      slug: "vitejte-na-novem-webu",
      title: "Vítejte na novém webu!",
      content: `<p>Vítáme vás na novém webu Klubu biatlonu Litvínov. Budeme zde zveřejňovat aktuality, výsledky závodů a novinky z tréninků.</p>`,
      excerpt: "Vítáme vás na novém webu Klubu biatlonu Litvínov.",
      publishedAt: new Date("2024-01-01"),
    },
    {
      slug: "univerziada-2023-lake-placid",
      title: "Univerziádní hry 2023 – zlatá v Lake Placid!",
      content: `<p>Týně se povedl husarský kousek – na zimních univerziádních hrách v americkém Lake Placid zvítězila v závodě s hromadným startem!</p>

<p>Ačkoli na první položce měla tři nesestřelené terče a vybíhala po první střelbě jako vůbec poslední, svou bojovností a zejména další čistou střelbou se postupně propracovala na první místo a celý závod ovládla. Pro náš amatérský klub z Litvínova obrovský úspěch!</p>

<img src="https://biatlonlitvinov.cz/wp-content/gallery/univerziada/un-1.jpg" style="width: 100%;" />

<p>Univerziáda je mezinárodní sportovní akce pro studenty vysokých škol a představuje jeden z největších multisportovních světových festivalů. Zimní univerziáda 2023 se konala v lednu v Lake Placid, USA – místě dvou zimních olympijských her (1932 a 1980).</p>

<img src="https://biatlonlitvinov.cz/wp-content/gallery/univerziada/un6.jpg" style="width: 48%; float: left; margin: 0 1rem 0.5rem 0;" />
<img src="https://biatlonlitvinov.cz/wp-content/gallery/univerziada/un5.jpg" style="width: 48%;" />

<p style="clear:both">Kristýna Otcovská závodí za reprezentaci ČR a náš klub je na ni nesmírně hrdý. Zlatá medaile z univerziády je dosud největším úspěchem v historii Klubu biatlonu Litvínov.</p>

<img src="https://biatlonlitvinov.cz/wp-content/gallery/univerziada/un4.jpg" style="width: 48%; float: left; margin: 0 1rem 0.5rem 0;" />
<img src="https://biatlonlitvinov.cz/wp-content/gallery/univerziada/un3.jpg" style="width: 48%;" />`,
      excerpt: "Týně se povedl husarský kousek – na zimních univerziádních hrách v Lake Placid zvítězila v závodě s hromadným startem!",
      publishedAt: new Date("2023-01-25"),
    },
    {
      slug: "zimni-sezona-2022-23",
      title: "Zimní sezóna 2022/23",
      content: `<p>Noví litvínovští biatlonisté stále nejsou a Týna závodí za reprezentaci ČR v IBU Cupu. Zároveň se chystá na zimní univerziádní hry, která se koná koncem ledna 2023 v americkém Lake Placid.</p>

<p>Informace o závodech jsou průběžně aktualizovány na stránkách <a href="https://www.biatlon.cz">Českého biatlonového svazu</a>.</p>

<p>Pokud by měl někdo z regionu zájem o biatlon, jsme stále k dispozici – náš klub je schopen poskytnout malorážky a pomoci se začátky.</p>`,
      excerpt: "Týna závodí za reprezentaci ČR v IBU Cupu a chystá se na zimní univerziádní hry v Lake Placid.",
      publishedAt: new Date("2022-11-15"),
    },
    {
      slug: "priprava-na-sezonu-2022-23",
      title: "Příprava na sezónu 2022/23 – Týna v reprezentačním B týmu",
      content: `<p>Sen pokračuje! Kristýna Otcovská byla nominována do reprezentačního B týmu žen. Přípravu již absolvuje s reprezentačními trenéry a oddílová příprava je v této fázi minulostí.</p>

<p>Bohužel v Litvínově a okolí nejsou zájemci o biatlon, není koho trénovat. Pokud by měl někdo zájem, samozřejmě je vítán – oddíl je schopen poskytnout případným zájemcům i malorážky.</p>`,
      excerpt: "Kristýna Otcovská byla nominována do reprezentačního B týmu žen a trénuje s reprezentačními trenéry.",
      publishedAt: new Date("2022-09-01"),
    },
    {
      slug: "konec-zimni-sezony-2022",
      title: "Konec zimní sezóny 2022",
      content: `<p>Vzhledem ke studijním povinnostem Týna již neabsolvovala závěrečné mistrovství ČR v supersprintu v Jablonci nad Nisou.</p>

<p>Nyní ji čeká studium, zasloužený odpočinek a v polovině dubna zahájení letní přípravy na další sezónu. Věříme, že příští zima přinese další skvělé výsledky!</p>`,
      excerpt: "Zimní sezóna 2022 je za námi. Týnu nyní čeká studium a v dubnu start letní přípravy.",
      publishedAt: new Date("2022-04-10"),
    },
    {
      slug: "brezen-2022-ibu-cup-ridnaun",
      title: "Březen 2022 – IBU CUP dospělých v Ridnaunu",
      content: `<p>Na závěr sezóny byla Týna Otcovská nominována i na IBU CUP dospělých v italském Ridnaunu (10.3.–13.3.2022). Ridnaun patří k nejkrásnějším biatlonovým areálům v Alpách.</p>

<img src="http://biatlonlitvinov.cz/wp-content/uploads/2022/03/pohled-na-areal-300x210.png" style="width: 48%; float: left; margin: 0 1rem 0.5rem 0;" />
<img src="http://biatlonlitvinov.cz/wp-content/uploads/2022/04/strelba-tyna-300x216.png" style="width: 48%;" />

<p style="clear:both">Výsledky ze závodů v Ridnaunu:</p>
<ul>
  <li>Sprint: 42. místo</li>
  <li>Stíhačka: 46. místo</li>
  <li>Mixová štafeta: účast</li>
</ul>

<p>Cenná zkušenost na závodech mezi dospělými závodnicemi světové třídy. Více o závodech na stránkách <a href="https://www.biatlon.cz">biatlon.cz</a>.</p>`,
      excerpt: "Týna Otcovská startovala na IBU CUP dospělých v italském Ridnaunu – cenná zkušenost na mezinárodním poli.",
      publishedAt: new Date("2022-03-14"),
    },
    {
      slug: "juniorske-ms-usa-2022",
      title: "Juniorské mistrovství světa v USA – Soldier Hollow",
      content: `<p>Místem konání juniorského mistrovství světa 2022 byl Soldier Hollow v Utahu – místo olympijských soutěží z roku 2002. Týna reprezentovala ČR a přivezla cenné zkušenosti.</p>

<img src="http://biatlonlitvinov.cz/wp-content/uploads/2022/03/svaz-usa-1-300x198.png" style="width: 48%; float: left; margin: 0 1rem 0.5rem 0;" />
<img src="http://biatlonlitvinov.cz/wp-content/uploads/2022/03/svaz-usa-3-300x216.png" style="width: 48%;" />

<p style="clear:both">Výsledky Kristýny Otcovské na MSJ 2022:</p>
<ul>
  <li><strong>Vytrvalostní závod 12,5 km:</strong> 13. místo</li>
  <li><strong>Sprint:</strong> 30. místo (ztráta 2:06 min.)</li>
  <li><strong>Stíhačka:</strong> 31. místo (střelba 0+3+1+1)</li>
  <li><strong>Štafeta:</strong> nedokončena (zranění Terezy Jandové)</li>
</ul>

<img src="http://biatlonlitvinov.cz/wp-content/uploads/2022/02/na-trati-300x263.jpg" style="width: 48%; float: left; margin: 0 1rem 0.5rem 0;" />

<p>Mistrovství bylo sportovně koncertem Terezy Voborníkové, která získala zlato ve sprintu i stíhačce. Týna odvedla solidní výkony a nabyla cenné zkušenosti z vrcholné juniorské soutěže.</p>`,
      excerpt: "Týna Otcovská reprezentovala ČR na juniorském MS v americkém Soldier Hollow. Nejlepší výsledek – 13. místo ve vytrvalosti.",
      publishedAt: new Date("2022-03-05"),
    },
    {
      slug: "unor-2022-nominace-na-ms",
      title: "Únor 2022 – nominace na juniorské MS!",
      content: `<p>Neuvěřitelné se stalo skutkem. Kristýna Otcovská byla nominována na juniorské mistrovství světa v biatlonu, které se koná v americkém Soldier Hollow, Utah.</p>

<img src="http://biatlonlitvinov.cz/wp-content/uploads/2022/02/svaz-1-300x229.png" style="width: 100%;" />

<p>Před nominací Týna absolvovala sprint v IBU Cupu dospělých v Novém Městě na Moravě, kde skončila na 70. místě. Přesto výsledky a výkony v průběhu sezóny přesvědčily trenéry k nominaci na světový šampionát.</p>

<img src="http://biatlonlitvinov.cz/wp-content/uploads/2022/02/cp-1-300x243.png" style="width: 48%; float: left; margin: 0 1rem 0.5rem 0;" />

<p>Pro klub biatlonu Litvínov je tato nominace historickým milníkem. Náš klub vznikl teprve před pár lety a již se naše závodnice dostala na juniorský světový šampionát!</p>`,
      excerpt: "Kristýna Otcovská byla nominována na juniorské MS v biatlonu v americkém Soldier Hollow – historický milník klubu!",
      publishedAt: new Date("2022-02-10"),
    },
    {
      slug: "zavody-leden-2022",
      title: "Závody v lednu 2022 – Pokljuka a juniorské ME",
      content: `<p>Leden přinesl dva závody českého poháru (Nové Město na Moravě a Jablonec nad Nisou), poté nominaci na IBU CUP ve Pokljuce a juniorské mistrovství Evropy.</p>

<img src="http://biatlonlitvinov.cz/wp-content/uploads/2022/02/svaz-martell-300x203.png" style="width: 48%; float: left; margin: 0 1rem 0.5rem 0;" />
<img src="http://biatlonlitvinov.cz/wp-content/uploads/2022/02/svaz-martell-2-300x194.png" style="width: 48%;" />

<p style="clear:both">Nejlepší výsledek sezóny: <strong>13. místo ve sprintu</strong> na juniorském ME. Singl mix štafeta se povedla – české barvy hájil skvělý tým.</p>

<img src="http://biatlonlitvinov.cz/wp-content/uploads/2022/02/svaz-martell-3-300x208.png" style="width: 48%;" />

<p>Sezóna nabírá na obrátkách a Týna stoupá ve světovém žebříčku. Věříme, že zbývající část zimy přinese další dobré výsledky.</p>`,
      excerpt: "Leden přinesl závody ČP i nominaci na IBU CUP na Pokljuce. Nejlepší výsledek – 13. místo ve sprintu na juniorském ME.",
      publishedAt: new Date("2022-01-28"),
    },
    {
      slug: "priprava-na-zimu-2021-22",
      title: "Příprava na zimu 2021/2022 – Oberhofu a Martell",
      content: `<p>Letní příprava graduje! Týna dostala kontakt od reprezentačního trenéra juniorek Zdeňka Vítka a absolvovala soustředění v lyžařském tunelu v německém Oberhofu a v Obertilliachu.</p>

<img src="http://biatlonlitvinov.cz/wp-content/uploads/2021/10/vystrizek-1-1-300x234.jpg" style="width: 48%; float: left; margin: 0 1rem 0.5rem 0;" />
<img src="http://biatlonlitvinov.cz/wp-content/uploads/2021/10/Vystrizek-3-1-300x222.jpg" style="width: 48%;" />

<p style="clear:both">Výsledkem dobré letní přípravy je nominace na juniorský IBU CUP do italského Martellu – prestižní mezinárodní závodní sérii pro juniory. Sezóna 2021/22 slibuje být dosud nejúspěšnější v historii klubu.</p>`,
      excerpt: "Týna absolvovala soustředění v Oberhofu a získala nominaci na juniorský IBU CUP do Martellu.",
      publishedAt: new Date("2021-12-01"),
    },
    {
      slug: "mcr-letni-biatlon-2021",
      title: "Mistrovství ČR v letním biatlonu 2021 – dva tituly!",
      content: `<p>Mistrovství ČR v letním biatlonu proběhlo 24.–26. září 2021 v Novém Městě na Moravě. Týna Otcovská předvedla výjimečné výkony a přivezla domů zlaté medaile!</p>

<img src="http://biatlonlitvinov.cz/wp-content/uploads/2021/10/letni-3-627x700.jpg" style="width: 50%;" />

<p>Výsledky Kristýny Otcovské:</p>
<ul>
  <li><strong>Sprint:</strong> 🥇 1. místo (střelba 1+2)</li>
  <li><strong>Supersprint:</strong> 🥇 1. místo</li>
  <li><strong>Vytrvalostní závod:</strong> 🥉 3. místo (střelba 2+3+1+3)</li>
</ul>

<img src="http://biatlonlitvinov.cz/wp-content/uploads/2021/06/bystrice-2021-300x284.jpg" style="width: 48%; float: left; margin: 0 1rem 0.5rem 0;" />

<p>Týna se stala dvojnásobnou mistryní ČR v letním biatlonu! Obrovský úspěch pro celý klub. Výsledky potvrzují, že tvrdý trénink přináší ovoce.</p>`,
      excerpt: "Kristýna Otcovská se stala dvojnásobnou mistryní ČR v letním biatlonu 2021 – zlato ve sprintu i supersprintu!",
      publishedAt: new Date("2021-09-27"),
    },
    {
      slug: "mcr-koleckove-lyze-2021",
      title: "Mistrovství ČR na kolečkových lyžích 2021 – Letohrad",
      content: `<p>Mistrovství ČR na kolečkových lyžích proběhlo 4.–5. září 2021 v Letohradu. Kristýna Otcovská závodila ve třech disciplínách.</p>

<p>Výsledky:</p>
<ul>
  <li><strong>Sobota – Sprint 7,5 km:</strong> 5. místo (střelba 2+1)</li>
  <li><strong>Sobota – Supersprint:</strong> nepostoupila do finále</li>
  <li><strong>Neděle – Stíhací závod 10 km:</strong> 5. místo</li>
</ul>

<p>Kolečkové lyže jsou letní náhradou za zimní biatlon a přípravou na zimní sezónu. Výkony v Letohradu naznačují, že zimní sezóna 2021/22 by mohla být velmi úspěšná.</p>`,
      excerpt: "Kristýna Otcovská závodila na MČR v kolečkových lyžích v Letohradu a dvakrát skončila na 5. místě.",
      publishedAt: new Date("2021-09-06"),
    },
    {
      slug: "scm-cup-2021",
      title: "SCM Cup 2021 – Týna porazila všechnu konkurenci!",
      content: `<p>SCM Cup sloužil jako prolog před IBU mistrovstvím světa v biatlonu na kolečkových lyžích. Týna Otcovská připravila sobě i ostatním obrovské překvapení.</p>

<p>V těchto kontrolních závodech zvítězila a porazila všechnu konkurenci – včetně juniorských reprezentantek! Výsledek upoutal pozornost trenérů a otevřel dveře k dalším příležitostem.</p>

<p>SCM (Sportovní centrum mládeže) jsou výběrové závody, kde se hodnotí výkonnost mladých sportovců a rozhoduje o podpoře pro příští sezónu. Vítězství v SCM Cupu je proto velmi cenné.</p>`,
      excerpt: "Týna Otcovská zvítězila v SCM Cupu a porazila veškerou konkurenci včetně juniorských reprezentantek.",
      publishedAt: new Date("2021-08-28"),
    },
    {
      slug: "letni-soustredeni-bozi-dar-2021",
      title: "Letní soustředění Boží Dar 2021",
      content: `<p>Přelom července a srpna 2021 – letní soustředění na Božím Daru ve spolupráci s klubem SG Jablonec. Dvoutýdenní soustředění bylo plné intenzivního tréninku.</p>

<p>Program soustředění zahrnoval:</p>
<ul>
  <li>Každodenní fyzický trénink – běh, kolečkové lyže, jízda na kole</li>
  <li>Střelecký trénink v Jáchymově</li>
  <li>Střelba v německém Oberwiesenthalu</li>
  <li>Kombinovaný trénink – střelba po fyzické zátěži</li>
</ul>

<p>Boží Dar a okolní hory jsou ideálním místem pro letní biatlon – kombinace krásné přírody, vhodného terénu a střelnice v dosahu.</p>`,
      excerpt: "Dvoutýdenní letní soustředění na Božím Daru s intenzivním tréninkem běhu, kolečkových lyží a střelby.",
      publishedAt: new Date("2021-08-10"),
    },
    {
      slug: "i-cp-letni-biatlon-2021",
      title: "I. ČP v letním biatlonu 2021 – akademická mistryně ČR!",
      content: `<p>Závody I. kola Českého poháru v letním biatlonu a akademické mistrovství ČR se konaly 25.–27. června 2021 v Bystřici pod Hostýnem.</p>

<img src="https://biatlonlitvinov.cz/wp-content/gallery/i-cp-letni-2021/20210626_140003.jpg" style="width: 48%; float: left; margin: 0 1rem 0.5rem 0;" />
<img src="https://biatlonlitvinov.cz/wp-content/gallery/i-cp-letni-2021/20210627_100702.jpg" style="width: 48%;" />

<p style="clear:both">Výsledky Kristýny Otcovské:</p>
<ul>
  <li><strong>Akademické MČR – hromadný start:</strong> 🥇 1. místo (akademická mistryně ČR)</li>
  <li><strong>Akademické MČR – sprint:</strong> 🥇 1. místo (akademická mistryně ČR)</li>
  <li><strong>Český pohár – sprint:</strong> 2. místo</li>
  <li><strong>Český pohár – hromadný start:</strong> 2. místo</li>
</ul>

<img src="https://biatlonlitvinov.cz/wp-content/gallery/i-cp-letni-2021/20210627_101920.jpg" style="width: 48%; float: left; margin: 0 1rem 0.5rem 0;" />
<img src="https://biatlonlitvinov.cz/wp-content/gallery/i-cp-letni-2021/20210627_110320.jpg" style="width: 48%;" />

<p style="clear:both">Týna je dvojnásobnou akademickou mistryní ČR! Honza Němec také závodil a ve výkonnostních třídách dosáhl skvělých výsledků.</p>`,
      excerpt: "Kristýna Otcovská se stala dvojnásobnou akademickou mistryní ČR v letním biatlonu v Bystřici pod Hostýnem.",
      publishedAt: new Date("2021-06-28"),
    },
  ];

  for (const { publishedAt, ...post } of posts) {
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: {},
      create: {
        ...post,
        published: true,
        authorId: admin.id,
        createdAt: publishedAt,
        updatedAt: publishedAt,
      },
    });
    console.log(`✅ Příspěvek "${post.title}" vytvořen`);
  }

  // Sponsors from biatlonlitvinov.cz
  const sponsors = [
    {
      name: "Luftuj s.r.o.",
      website: "https://www.luftuj.cz/",
      logoUrl: "http://biatlonlitvinov.cz/wp-content/uploads/2023/12/mcm_logo_luftuj_cz_2023-700x222.jpg",
      order: 1,
    },
    {
      name: "Ústecký kraj",
      website: "https://www.kr-ustecky.cz/",
      logoUrl: "http://biatlonlitvinov.cz/wp-content/uploads/2021/06/%C3%BAsteck%C3%BD-kraj-294x300.png",
      order: 2,
    },
    {
      name: "SSK Litvínov",
      website: "https://www.ssk-litvinov.cz/",
      logoUrl: "http://biatlonlitvinov.cz/wp-content/uploads/2021/06/logo-SSK-225x300.jpg",
      order: 3,
    },
    {
      name: "Národní sportovní agentura",
      website: "https://agenturasport.cz/",
      logoUrl: "http://biatlonlitvinov.cz/wp-content/uploads/2022/02/nsa.png",
      order: 4,
    },
    {
      name: "Archa interiér",
      website: "http://www.archainterier.cz/",
      logoUrl: "http://biatlonlitvinov.cz/wp-content/uploads/2021/06/archa-i.jpg",
      order: 5,
    },
  ];

  for (const sponsor of sponsors) {
    const existing = await prisma.sponsor.findFirst({ where: { name: sponsor.name } });
    if (!existing) {
      await prisma.sponsor.create({ data: sponsor });
      console.log(`✅ Sponzor "${sponsor.name}" vytvořen`);
    } else {
      console.log(`⏭ Sponzor "${sponsor.name}" již existuje`);
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

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

  // Sample post
  await prisma.post.upsert({
    where: { slug: "vitejte-na-novem-webu" },
    update: {},
    create: {
      title: "Vítejte na novém webu!",
      slug: "vitejte-na-novem-webu",
      content: `<p>Vítáme vás na novém webu Klubu biatlonu Litvínov. Budeme zde zveřejňovat aktuality, výsledky závodů a novinky z tréninků.</p>`,
      excerpt: "Vítáme vás na novém webu Klubu biatlonu Litvínov.",
      published: true,
      authorId: admin.id,
    },
  });
  console.log("✅ Ukázkový příspěvek vytvořen");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

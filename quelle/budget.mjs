/* ============================================================
   Ladebudget — prueft, was bis zum load-Ereignis hereinkommt

   Ein Budget, das niemand nachrechnet, ist ein Vorsatz. Dieses
   Skript rechnet nach und schlaegt fehl, wenn es reisst.

   Gemessen wird ausdruecklich BIS zum load-Ereignis, nicht laenger.
   Alles danach ist bewusst verzoegert — Heldenfilm, Kapitelbilder,
   Geometrie — und gehoert nicht in dieselbe Zahl. Wer bis zwei
   Sekunden nach load zaehlt, misst die Staffelung mit und haelt
   funktionierende Verzoegerung faelschlich fuer Ballast. Genau
   dieser Fehler ist bei der ersten Messung passiert.

   Aufruf (lokaler Server auf 8099 muss laufen):
       node quelle/budget.mjs
   ============================================================ */
import { chromium } from 'playwright';

const BUDGET = {
  'index.html':                            900,
  'kategorie-antipasti.html':              700,
  'produkt-pistaziencreme-aus-bronte.html': 700,
  /* 820: die Uebersicht zeigt acht Vorschaubilder. Der frueher gemessene
     Wert von 497 KB stammt aus einem Fehler — die Karten standen auf
     opacity:0, Chrome hielt ihre Bilder deshalb zurueck. Sichtbar geworden
     laedt die Seite, was sie wirklich braucht. */
  'rezepte.html':                          820,
};
const ORT = process.env.VECOM_ORT || 'http://localhost:8099';

const browser = await chromium.launch({
  ...(process.env.VECOM_BROWSER ? { executablePath: process.env.VECOM_BROWSER } : {}),
  args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'],
});

async function messen(seite, opts = {}) {
  const seit = await browser.newPage({ viewport: { width: 1440, height: 900 }, ...opts });
  let bis = 0, posten = [];
  seit.on('response', async r => {
    try {
      const n = (await r.body()).length;
      bis += n;
      posten.push({ n, u: r.url().split('/').pop().split('?')[0] });
    } catch (e) { /* abgebrochene Antworten zaehlen nicht */ }
  });
  await seit.goto(`${ORT}/${seite}`, { waitUntil: 'load' });
  await seit.close();
  return { bis, posten };
}

const kb = n => (n / 1024).toFixed(0);
let gerissen = 0;

console.log('Ladebudget — Bytes bis zum load-Ereignis\n');
for (const [seite, grenze] of Object.entries(BUDGET)) {
  const { bis, posten } = await messen(seite);
  const ok = bis / 1024 <= grenze;
  if (!ok) gerissen++;
  console.log(`${ok ? '  ok  ' : ' RISS '} ${seite.padEnd(40)} ${kb(bis).padStart(5)} / ${grenze} KB`);
  if (!ok) {
    posten.sort((a, b) => b.n - a.n).slice(0, 5)
      .forEach(x => console.log(`         ${kb(x.n).padStart(5)} KB  ${x.u}`));
  }
}

/* Das Telefon hat ein eigenes Budget: dort ist jedes Kilobyte teurer. */
const { bis: mobil } = await messen('index.html',
  { viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
const mobilGrenze = 600;
const mobilOk = mobil / 1024 <= mobilGrenze;
if (!mobilOk) gerissen++;
console.log(`${mobilOk ? '  ok  ' : ' RISS '} ${'index.html (Telefon)'.padEnd(40)} ${kb(mobil).padStart(5)} / ${mobilGrenze} KB`);

await browser.close();
console.log(gerissen ? `\n${gerissen} Budget(s) gerissen.` : '\nAlle Budgets eingehalten.');
process.exit(gerissen ? 1 : 0);

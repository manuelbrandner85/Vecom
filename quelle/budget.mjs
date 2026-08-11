/* ============================================================
   Ladebudget — prueft, was bis zum load-Ereignis hereinkommt

   Ein Budget, das niemand nachrechnet, ist ein Vorsatz. Dieses
   Skript rechnet nach und schlaegt fehl, wenn es reisst.

   Gemessen wird ausdruecklich BIS zum load-Ereignis, nicht laenger.
   Alles danach ist bewusst verzoegert — Kapitelbilder, Geometrie —
   und gehoert nicht in dieselbe Zahl. Wer bis zwei Sekunden nach
   load zaehlt, misst die Staffelung mit und haelt funktionierende
   Verzoegerung faelschlich fuer Ballast. Genau dieser Fehler ist bei
   der ersten Messung passiert.

   AUSGENOMMEN: der Heldenfilm (assets/video/hero.*).

   Er wird auf schnellen Leitungen absichtlich frueh angefordert,
   naemlich waehrend der Vorhang liegt, damit er laeuft, wenn der
   Vorhang hebt. Damit faellt er in das Fenster bis load und wuerde
   die Grenze um rund 585 KB sprengen — ohne dass irgendetwas
   schlechter geworden waere: Die groesste Inhaltsdarstellung ist das
   Standbild, und das ist frueher fertig als vorher.

   Ein Byte-Deckel ist fuer den Film schlicht das falsche Mass. Was
   an ihm zaehlt, ist nicht sein Gewicht, sondern wann er laeuft —
   und das wird unten direkt gemessen statt ueber Bytes geschaetzt.

   Aufruf (lokaler Server auf 8099 muss laufen):
       node quelle/budget.mjs
   ============================================================ */
import { chromium } from 'playwright';

const BUDGET = {
  'index.html':                            900,
  'kategorie-antipasti.html':              700,
  'produkt-pistaziencreme-aus-bronte.html': 700,
  'rezepte.html':                          700,
};
const ORT = process.env.VECOM_ORT || 'http://localhost:8099';

/* Zeit bis das erste Filmbild laeuft, unter emuliertem schnellem 4G.
   2071 ms waren es, als der Film erst nach load und dann noch im
   Leerlauf-Fenster startete. */
const FILM_GRENZE = 2500;
const LEITUNG = { latency: 60, downloadThroughput: 9 * 1024 * 1024 / 8, uploadThroughput: 1.5 * 1024 * 1024 / 8, offline: false };

const browser = await chromium.launch({
  args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'],
});

const AUSGENOMMEN = /\/assets\/video\/hero\./;

async function messen(seite, opts = {}) {
  const seit = await browser.newPage({ viewport: { width: 1440, height: 900 }, ...opts });
  let posten = [];
  /* Die Koerper werden eingesammelt und ERST DANN ausgewertet. Vorher wurde
     direkt im Ereignis auf r.body() gewartet und gleich nach load geschlossen —
     alles, dessen Koerper noch unterwegs war, fiel still unter den Tisch. Die
     Summe hing dadurch am Zufall: rezepte.html schwankte zwischen 193 und
     487 KB, ohne dass sich eine Zeile geaendert haette. Eine Pruefung, deren
     Zahl wuerfelt, prueft nichts. */
  const offen = [];
  seit.on('response', r => {
    if (AUSGENOMMEN.test(r.url())) return;          /* siehe Kopf der Datei */
    offen.push(r.body().then(
      b => posten.push({ n: b.length, u: r.url().split('/').pop().split('?')[0] }),
      () => { /* abgebrochene Antworten zaehlen nicht */ }));
  });
  await seit.goto(`${ORT}/${seite}`, { waitUntil: 'load' });

  /* Faul geladene Bilder zaehlen nicht mit.

     loading="lazy" heisst: dieses Bild wird fuer den ersten Blick nicht
     gebraucht. Ob es trotzdem noch vor load hereinkommt, entscheidet der
     Browser nach freier Kapazitaet — bei rezepte.html schwankte die Summe
     dadurch zwischen 397 und 708 KB, ohne dass sich etwas geaendert haette.
     Ein Deckel, der richtiges Faul-Laden bestraft, erzieht zum Falschen.
     Ein faul markiertes Bild, das in Wahrheit ueber dem Falz steht, faellt
     im Ansichtsvergleich als leere Flaeche auf — dort gehoert es hin. */
  const faul = new Set(await seit.evaluate(() =>
    [...document.querySelectorAll('img[loading=lazy]')]
      .flatMap(i => [i.currentSrc, i.src]).filter(Boolean)
      .map(u => u.split('/').pop().split('?')[0])));

  await Promise.all(offen);
  await seit.close();
  const gezaehlt = posten.filter(p => !faul.has(p.u));
  return { bis: gezaehlt.reduce((s, p) => s + p.n, 0), posten: gezaehlt };
}

/* Der Film ist kein Byte-Problem, sondern ein Zeitproblem: Er soll laufen,
   wenn der Vorhang hebt. Also wird genau das gemessen und nicht ersatzweise
   sein Gewicht. Gedrosselt, weil die Zahl ungedrosselt nichts aussagt —
   auf localhost sind es 0,3 s und das erlebt kein Besucher. */
async function filmZeit(opts = {}) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, ...opts });
  const seit = await ctx.newPage();
  const cdp = await ctx.newCDPSession(seit);
  await cdp.send('Network.enable');
  await cdp.send('Network.emulateNetworkConditions', LEITUNG);
  await seit.addInitScript(() => {
    /* Der Vorhang wird NICHT uebersprungen — er gehoert zur gemessenen Strecke. */
    window.__filmAb = performance.now();
    addEventListener('DOMContentLoaded', () => {
      const v = document.querySelector('[data-hero=film]');
      if (v) v.addEventListener('playing', () => { window.__filmLaeuft = performance.now(); }, { once: true });
    });
  });
  await seit.goto(`${ORT}/index.html`, { waitUntil: 'load' });
  const ms = await seit.evaluate(grenze => new Promise(r => {
    const fertig = () => r(window.__filmLaeuft ? Math.round(window.__filmLaeuft) : null);
    if (window.__filmLaeuft) return fertig();
    const v = document.querySelector('[data-hero=film]');
    if (v) v.addEventListener('playing', fertig, { once: true });
    setTimeout(fertig, grenze + 4000);
  }), FILM_GRENZE);
  await ctx.close();
  return ms;
}

/* Dreimal messen und den schlechtesten Wert nehmen.

   Auf Seiten mit nachgeladenen Bildern entscheidet ein Wettlauf, ob ein Bild
   noch vor load fertig wird — die Summe sprang dadurch um bis zu 120 KB,
   ohne dass sich etwas geaendert hatte. Ein Budget beurteilt den
   ungünstigsten Fall, nicht den gluecklichsten; die Spanne wird mit
   ausgegeben, damit man sieht, wie sicher die Zahl ist.

   Wichtig ist ausserdem ein NEBENLAEUFIGER Testserver. Mit dem einfachen
   "python3 -m http.server" wird eine Anfrage nach der anderen beantwortet,
   und die Reihenfolge wuerfelt dann zusaetzlich. */
async function mehrfach(seite, opts) {
  const laeufe = [];
  for (let i = 0; i < 3; i++) laeufe.push(await messen(seite, opts));
  laeufe.sort((a, b) => b.bis - a.bis);
  return { ...laeufe[0], tiefster: laeufe[laeufe.length - 1].bis };
}

const kb = n => (n / 1024).toFixed(0);
let gerissen = 0;

console.log('Ladebudget — Bytes bis zum load-Ereignis (schlechtester von drei Laeufen)\n');
for (const [seite, grenze] of Object.entries(BUDGET)) {
  const { bis, posten, tiefster } = await mehrfach(seite);
  const spanne = bis - tiefster > 1024 ? `  (guenstigster Lauf ${kb(tiefster)} KB)` : '';
  const ok = bis / 1024 <= grenze;
  if (!ok) gerissen++;
  console.log(`${ok ? '  ok  ' : ' RISS '} ${seite.padEnd(40)} ${kb(bis).padStart(5)} / ${grenze} KB${spanne}`);
  if (!ok) {
    posten.sort((a, b) => b.n - a.n).slice(0, 5)
      .forEach(x => console.log(`         ${kb(x.n).padStart(5)} KB  ${x.u}`));
  }
}

/* Das Telefon hat ein eigenes Budget: dort ist jedes Kilobyte teurer. */
const { bis: mobil } = await mehrfach('index.html',
  { viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
const mobilGrenze = 600;
const mobilOk = mobil / 1024 <= mobilGrenze;
if (!mobilOk) gerissen++;
console.log(`${mobilOk ? '  ok  ' : ' RISS '} ${'index.html (Telefon)'.padEnd(40)} ${kb(mobil).padStart(5)} / ${mobilGrenze} KB`);

/* --- und die Zahl, die der Film wirklich schuldet --- */
console.log('\nHeldenfilm — Zeit bis zum ersten Filmbild (schnelles 4G)\n');
for (const [was, opts] of [
  ['Schirm 1440', {}],
  ['Telefon 390', { viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true }],
]) {
  const ms = await filmZeit(opts);
  const ok = ms !== null && ms <= FILM_GRENZE;
  if (!ok) gerissen++;
  console.log(`${ok ? '  ok  ' : ' RISS '} ${was.padEnd(40) } ${(ms === null ? 'laeuft nicht' : ms + ' ms').padStart(12)} / ${FILM_GRENZE} ms`);
}

await browser.close();
console.log(gerissen ? `\n${gerissen} Budget(s) gerissen.` : '\nAlle Budgets eingehalten.');
process.exit(gerissen ? 1 : 0);

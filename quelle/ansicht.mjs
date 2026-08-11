/* ============================================================
   Ansichtsvergleich — was hat sich im Bild geaendert?

   Alle bisherigen Pruefungen fragen "funktioniert es noch".
   Diese fragt "sieht es noch so aus". Das ist etwas anderes,
   und genau dort sind in diesem Projekt die Fehler entstanden:

     · Staffelabstaende auf Takte gelegt — kein Test schlug an,
       die Hero-Zeilen starteten aber ploetzlich gleichzeitig
     · Ueberblendfeld verdeckte das laufende Kapitel sofort —
       alle Funktionspruefungen blieben gruen, die Buehne blieb
       schwarz

   Beides waere hier in einem Bild aufgefallen.

   Verglichen wird gegen die zuletzt gemerkte Fassung. Die
   Ansichten liegen unter .ansichten/ und gehoeren NICHT ins
   Repository: der Pages-Workflow laedt den Projektstamm als
   Ganzes hoch, gemerkte Bilder waeren sonst mit veroeffentlicht.

   Aufruf (lokaler Server auf 8099 muss laufen):
       node quelle/ansicht.mjs --merken     Stand festhalten
       node quelle/ansicht.mjs              dagegen vergleichen

   Rueckgabewert 1, wenn eine Ansicht ueber der Schwelle abweicht.
   ============================================================ */
import { chromium } from 'playwright';
import { mkdirSync, existsSync, readFileSync, writeFileSync, readdirSync } from 'fs';

const ORT     = process.env.VECOM_ORT || 'http://localhost:8099';
const ORDNER  = '.ansichten';
const MERKEN  = process.argv.includes('--merken');
const SCHWELLE = 0.4;          // Prozent abweichender Bildpunkte, ab dem gemeldet wird

/* Jede Ansicht: Name, Seite, Fenster, und wohin gescrollt wird.
   Bewusst mit ?renderer=erzwingen, damit die Inszenierung auch unter
   Software-Rasterisierung mit ins Bild kommt — sonst pruefte man die
   Rueckfallebene und nicht die Seite. */
const ANSICHTEN = [
  { name: 'start-auftakt',   url: 'index.html?renderer=erzwingen',              ziel: 0 },
  { name: 'start-reise',     url: 'index.html?renderer=erzwingen',              ziel: '.reise__spur+600' },
  { name: 'start-sortiment', url: 'index.html?renderer=erzwingen',              ziel: '#grid' },
  { name: 'warengruppe',     url: 'kategorie-antipasti.html?renderer=erzwingen', ziel: 0 },
  { name: 'erzeugnis',       url: 'produkt-pistaziencreme-aus-bronte.html?renderer=erzwingen', ziel: 0 },
  { name: 'rezept',          url: 'rezept-caponata.html',                       ziel: 0 },
  { name: 'telefon-auftakt', url: 'index.html?renderer=erzwingen',              ziel: 0,
    fenster: { width: 390, height: 844 }, finger: true },
  { name: 'telefon-reise',   url: 'index.html?renderer=erzwingen',              ziel: '.reise__spur+600',
    fenster: { width: 390, height: 844 }, finger: true },
];

mkdirSync(ORDNER, { recursive: true });

const browser = await chromium.launch({
  args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'],
});

async function aufnehmen(a) {
  const seite = await browser.newPage({
    viewport: a.fenster || { width: 1440, height: 900 },
    ...(a.finger ? { hasTouch: true, isMobile: true } : {}),
  });
  /* Gleichmaessige Uhr: sonst greift unter Software-Rasterisierung die
     Notbremse und jede Aufnahme zeigt einen anderen Abbaustand. */
  await seite.addInitScript(() => {
    let t = 0;
    const rAF = window.requestAnimationFrame;
    performance.now = () => (t += 16);
    window.requestAnimationFrame = cb => rAF(() => cb(t += 16));
    /* Zufall festnageln, damit Rauschen und Streuung reproduzierbar sind */
    let s = 1;
    Math.random = () => (s = (s * 16807) % 2147483647) / 2147483647;
    try { sessionStorage.setItem('vecom.eintritt', '1'); } catch (e) { }   /* Vorhang ueberspringen */
  });
  await seite.goto(`${ORT}/${a.url}`, { waitUntil: 'load' });
  await seite.waitForTimeout(1200);

  if (a.ziel !== 0) {
    await seite.evaluate(z => {
      const [sel, plus] = String(z).split('+');
      const el = document.querySelector(sel);
      const y = el ? el.getBoundingClientRect().top + scrollY + (+plus || 0) : 0;
      scrollTo({ top: y, behavior: 'instant' });
    }, a.ziel);
  }
  await seite.waitForTimeout(2600);          /* Auftritte und Ueberblendungen auslaufen lassen */

  /* Zwei Quellen von Unruhe stillstellen, sonst meldet der Vergleich bei
     voellig unveraendertem Code Abweichungen — und ein Werkzeug, das
     Fehlalarme gibt, wird nach dem dritten ignoriert.

     Der Heldenfilm laeuft und zeigt je Aufnahme ein anderes Einzelbild.
     Er wird angehalten und auf eine feste Stelle gesetzt.

     Nachgeladene Bilder sind je nach Zeitpunkt da oder nicht. Es wird
     gewartet, bis alle sichtbaren fertig sind. */
  await seite.evaluate(async () => {
    document.querySelectorAll('video').forEach(v => { try { v.pause(); v.currentTime = 0.5; } catch (e) { } });
    const offen = [...document.images].filter(i => !i.complete);
    await Promise.all(offen.map(i => new Promise(r => {
      i.addEventListener('load', r, { once: true });
      i.addEventListener('error', r, { once: true });
      setTimeout(r, 4000);
    })));
  });
  await seite.waitForTimeout(700);
  const bild = await seite.screenshot();
  await seite.close();
  return bild;
}

/* Zwei PNG im Browser dekodieren und Bildpunkte zaehlen, die sich
   deutlich unterscheiden. Spart eine Bildbibliothek als Abhaengigkeit. */
async function vergleichen(a, b) {
  const seite = await browser.newPage();
  const wert = await seite.evaluate(async ({ a, b }) => {
    const lade = async d => createImageBitmap(await (await fetch('data:image/png;base64,' + d)).blob());
    const [x, y] = await Promise.all([lade(a), lade(b)]);
    if (x.width !== y.width || x.height !== y.height) return { masse: true };
    const holen = bm => {
      const c = document.createElement('canvas');
      c.width = bm.width; c.height = bm.height;
      c.getContext('2d').drawImage(bm, 0, 0);
      return c.getContext('2d').getImageData(0, 0, bm.width, bm.height).data;
    };
    const p = holen(x), q = holen(y);
    let anders = 0;
    for (let i = 0; i < p.length; i += 4) {
      if (Math.abs(p[i] - q[i]) + Math.abs(p[i + 1] - q[i + 1]) + Math.abs(p[i + 2] - q[i + 2]) > 24) anders++;
    }
    return { anteil: 100 * anders / (p.length / 4), breite: x.width, hoehe: x.height };
  }, { a: a.toString('base64'), b: b.toString('base64') });
  await seite.close();
  return wert;
}

let gemeldet = 0, verglichen = 0;
console.log(MERKEN ? 'Ansichten merken\n' : 'Ansichten vergleichen\n');

for (const a of ANSICHTEN) {
  const pfad = `${ORDNER}/${a.name}.png`;
  const neu = await aufnehmen(a);

  if (MERKEN) {
    writeFileSync(pfad, neu);
    console.log(`  gemerkt  ${a.name}`);
    continue;
  }
  if (!existsSync(pfad)) {
    writeFileSync(pfad, neu);
    console.log(`  neu      ${a.name}  (kein Vergleichsstand, jetzt gemerkt)`);
    continue;
  }
  const r = await vergleichen(readFileSync(pfad), neu);
  verglichen++;
  if (r.masse) {
    gemeldet++;
    writeFileSync(`${ORDNER}/${a.name}.neu.png`, neu);
    console.log(` GEAENDERT ${a.name}  — andere Bildgroesse`);
    continue;
  }
  const ok = r.anteil <= SCHWELLE;
  if (!ok) {
    gemeldet++;
    writeFileSync(`${ORDNER}/${a.name}.neu.png`, neu);
  }
  console.log(`${ok ? '  gleich ' : ' GEAENDERT'} ${a.name.padEnd(18)} ${r.anteil.toFixed(2)} % abweichend`
            + (ok ? '' : `  ->  ${ORDNER}/${a.name}.neu.png`));
}

await browser.close();

if (MERKEN) {
  console.log(`\n${ANSICHTEN.length} Ansichten gemerkt in ${ORDNER}/`);
} else if (gemeldet) {
  console.log(`\n${gemeldet} von ${verglichen} Ansichten geaendert.`);
  console.log('Die neuen Aufnahmen liegen als *.neu.png daneben — ansehen und entscheiden:');
  console.log('gewollt? dann "node quelle/ansicht.mjs --merken". Sonst ist es ein Fehler.');
} else {
  console.log(`\nAlle ${verglichen} Ansichten unveraendert.`);
}
process.exit(gemeldet ? 1 : 0);

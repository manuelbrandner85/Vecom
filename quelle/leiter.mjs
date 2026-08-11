/* ============================================================
   Groessenleiter — aus einem 4K-Bild die Auslieferfassungen

   Die KI-Hochrechnung liefert PNG mit rund 4096 Pixeln Breite und
   sieben Megabyte. Ausgeliefert wird davon nichts: Der Browser
   bekommt WebP in mehreren Stufen und waehlt ueber srcset selbst.

   Wichtig ist, dass AUCH die kleinen Stufen neu aus der 4K-Quelle
   gerechnet werden, nicht aus dem alten 1376er Bild. Ein aus mehr
   Information heruntergerechnetes Bild ist bei gleicher Dateigroesse
   schaerfer — die Verkleinerung mittelt echte Details, statt bereits
   gemittelte weiterzureichen.

   Die Gueten sind nach Groesse gestaffelt: Ein 3840er Bild wird auf
   einem grossen Schirm nie aus einem Meter Abstand betrachtet, dort
   faellt staerkere Kompression nicht auf. Beim 1376er schon.

   Gemessen an Pantelleria (Trockenmauer, viel Struktur):
       1376 px  122 KB     2560 px  234 KB     3840 px  369 KB
   Bei Salinen (Wasser, Himmel) sind es 96 und 157 KB — die Zahlen
   haengen am Motiv, nicht an der Aufloesung allein.

   Aufruf (lokaler Server auf 8099 muss laufen):
       node quelle/leiter.mjs <4k-bild.png> <zielname> [zielordner]

   Beispiel:
       node quelle/leiter.mjs /tmp/hain-4k.png hain assets/img/reise
   ============================================================ */
import { chromium } from 'playwright';
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const [quelle, name, ordner = 'assets/img/reise'] = process.argv.slice(2);
if (!quelle || !name) {
  console.error('Aufruf: node quelle/leiter.mjs <4k-bild.png> <zielname> [zielordner]');
  process.exit(2);
}

/* Breite -> Guete. Groessere Fassungen vertragen mehr Kompression. */
const STUFEN = [[3840, 0.72], [2560, 0.74], [1376, 0.78], [1000, 0.80]];

const browser = await chromium.launch();
const seite = await browser.newPage();
await seite.goto(process.env.VECOM_ORT || 'http://localhost:8099/404.html');

const roh = readFileSync(resolve(quelle)).toString('base64');
const aus = await seite.evaluate(async ({ roh, stufen }) => {
  const bm = await createImageBitmap(await (await fetch('data:image/png;base64,' + roh)).blob());
  const r = { quelle: bm.width + ' x ' + bm.height };
  for (const [breite, guete] of stufen) {
    if (breite > bm.width) continue;            /* nie hochrechnen, nur herunter */
    const hoehe = Math.round(breite * bm.height / bm.width);
    const c = document.createElement('canvas');
    c.width = breite; c.height = hoehe;
    const g = c.getContext('2d');
    g.imageSmoothingQuality = 'high';
    g.drawImage(bm, 0, 0, breite, hoehe);
    r[breite] = { d: c.toDataURL('image/webp', guete).split(',')[1], hoehe };
  }
  return r;
}, { roh, stufen: STUFEN });

await browser.close();

console.log(`${name}  aus ${aus.quelle}`);
let summe = 0;
for (const [breite] of STUFEN) {
  if (!aus[breite]) continue;
  const puffer = Buffer.from(aus[breite].d, 'base64');
  const ziel = `${ordner}/${name}-${breite}.webp`;
  writeFileSync(ziel, puffer);
  summe += puffer.length;
  console.log(`  ${String(breite).padStart(4)} x ${String(aus[breite].hoehe).padEnd(4)}`
            + `${(puffer.length / 1024).toFixed(0).padStart(5)} KB   ${ziel}`);
}
console.log(`  zusammen ${(summe / 1024).toFixed(0)} KB`);

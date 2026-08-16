/* ============================================================
   Zugaenglichkeit — Kontrast, Trefferflaechen, Semantik

   Warum es diese Datei gibt: Kontrast, Ueberlauf und Tastatur
   wurden in diesem Projekt bisher jedes Mal von Hand nachgebaut.
   Dabei war die Pruefroutine zweimal falsch, bevor sie stimmte —
   sie fand die eigene Auszeichnung und meldete 251 Fehler, wo
   keiner war. Eine Pruefung, die immer anschlaegt, ist wertlos.

   Der Kontrast wird hier NICHT aus dem CSS gerechnet. Text steht
   in diesem Projekt ueber Fotos, Filmen und Verlaeufen; ein aus
   background-color abgeleiteter Wert waere frei erfunden. Statt-
   dessen: Seite zweimal rendern, einmal mit unsichtbarem Text,
   und die hellsten zehn Prozent des tatsaechlichen Untergrunds
   gegen die Textfarbe rechnen. So sind die Werte entstanden, die
   in der README stehen, und nur so sind sie ueberpruefbar.

   Aufruf (lokaler Server auf 8099 muss laufen):
       node quelle/zugang.mjs            alle Seiten
       node quelle/zugang.mjs index.html eine Seite
   ============================================================ */
import { chromium } from 'playwright';
import { readdirSync } from 'node:fs';

const ORT = process.env.VECOM_ORT || 'http://localhost:8099';
const NUR = process.argv[2];

/* WCAG 2.1: 4.5:1 fuer Text, 3:1 ab 24 px oder ab 18.66 px fett */
const SOLL_TEXT  = 4.5;
const SOLL_GROSS = 3.0;
const SOLL_FLAECHE = 44;          /* CSS-Pixel, empfohlene Mindestgroesse */

const BREITEN = [
  { name: 'Telefon',  viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true },
  { name: 'Desktop',  viewport: { width: 1440, height: 900 } },
];

function leuchtdichte([r, g, b]) {
  const f = v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}
function verhaeltnis(a, b) {
  const [x, y] = [leuchtdichte(a), leuchtdichte(b)];
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
}

async function pruefeSeite(browser, datei, lage) {
  const seite = await browser.newPage(lage);
  const meldungen = [];
  seite.on('pageerror', f => meldungen.push({ art: 'js', text: String(f).slice(0, 90) }));
  seite.on('console', m => {
    if (m.type() === 'error') meldungen.push({ art: 'konsole', text: m.text().slice(0, 90) });
  });

  await seite.goto(`${ORT}/${datei}`, { waitUntil: 'load' });
  await seite.waitForTimeout(lage.isMobile ? 1200 : 2200);

  const befunde = [];

  /* --- 1. Waagerechter Ueberlauf --- */
  const ueber = await seite.evaluate(() =>
    document.documentElement.scrollWidth - document.documentElement.clientWidth);
  if (ueber > 0) befunde.push(`waagerechter Ueberlauf ${ueber} px`);

  /* --- 2. Semantik --- */
  const bau = await seite.evaluate(() => ({
    h1: document.querySelectorAll('h1').length,
    ohneAlt: [...document.images].filter(b => !b.hasAttribute('alt')).length,
    ohneName: [...document.querySelectorAll('button, a[href]')]
      .filter(e => e.offsetParent !== null)
      .filter(e => !(e.textContent || '').trim()
                && !e.getAttribute('aria-label')
                && !e.getAttribute('title')).length,
    ohneBeschriftung: [...document.querySelectorAll('input, select, textarea')]
      .filter(e => e.type !== 'hidden' && e.offsetParent !== null)
      .filter(e => !e.labels?.length && !e.getAttribute('aria-label')).length,
    sprache: document.documentElement.lang || '(fehlt)',
  }));
  if (bau.h1 !== 1)          befunde.push(`${bau.h1} Ueberschriften erster Ordnung (soll: 1)`);
  if (bau.ohneAlt)           befunde.push(`${bau.ohneAlt} Bilder ohne alt-Attribut`);
  if (bau.ohneName)          befunde.push(`${bau.ohneName} Schaltflaechen ohne zugaenglichen Namen`);
  if (bau.ohneBeschriftung)  befunde.push(`${bau.ohneBeschriftung} Eingabefelder ohne Beschriftung`);
  if (bau.sprache === '(fehlt)') befunde.push('Sprachauszeichnung am Dokument fehlt');

  /* --- 3. Trefferflaechen ---
     Zwei Fallen, in die eine naive Pruefung hier laeuft:

     · Karten vergroessern ihre Trefferflaeche ueber ein ::after mit
       inset:0. Der Verweis misst 131×41 px, der Nutzer trifft aber die
       ganze Karte. Erkannt wird das ueber getComputedStyle(e,'::after').
     · Unter Mobilgeraete-Emulation werden 44 CSS-Pixel als 43,34
       gerendert. Deshalb wird in CSS-Pixeln gemessen (offsetWidth),
       nicht im gerenderten Kasten. */
  const klein = await seite.evaluate(mindest => {
    const raus = [];
    for (const e of document.querySelectorAll('a[href], button, input, select, [role="button"]')) {
      if (!e.offsetParent) continue;
      let breite = e.offsetWidth, hoehe = e.offsetHeight;
      if (breite < 1 || hoehe < 1) continue;

      /* Im Fliesstext eingebettet: Satzbestandteil, keine Bedienflaeche */
      const eltern = e.parentElement;
      if (eltern && /^(P|LI|DD|SPAN|LABEL|SMALL)$/.test(eltern.tagName)
          && eltern.textContent.trim().length > e.textContent.trim().length + 8) continue;

      /* Aufgespannte Trefferflaeche durch ein absolut gesetztes ::after */
      const nach = getComputedStyle(e, '::after');
      if (nach && nach.content !== 'none' && nach.position === 'absolute') {
        const bezug = e.closest('.card, .weiter__karte, .betrieb__link, .rezept__karte, li, article') || eltern;
        if (bezug) { breite = Math.max(breite, bezug.offsetWidth); hoehe = Math.max(hoehe, bezug.offsetHeight); }
      }
      /* Ein Verweis, der eine ganze Karte umschliesst */
      if (e.tagName === 'A' && e.querySelector('img, .weiter__name, .betrieb__name')) {
        breite = Math.max(breite, e.offsetWidth); hoehe = Math.max(hoehe, e.offsetHeight);
      }

      if (hoehe < mindest || breite < mindest) {
        raus.push({
          was: (e.textContent || e.getAttribute('aria-label') || e.tagName).trim().slice(0, 26),
          b: breite, h: hoehe,
        });
      }
    }
    return raus;
  }, SOLL_FLAECHE);
  for (const k of klein) befunde.push(`Trefferflaeche ${k.b}×${k.h} px — ${k.was || '(ohne Text)'}`);

  /* --- 4. Kontrast an echten Pixeln --- */
  const proben = await seite.evaluate(() => {
    const sichtbar = e => {
      const r = e.getBoundingClientRect();
      return r.width > 4 && r.height > 4 && r.top < innerHeight && r.bottom > 0;
    };
    const aus = [];
    for (const e of document.querySelectorAll('h1, h2, h3, p, a, li, dt, dd, span, button, label')) {
      const eigen = [...e.childNodes].filter(n => n.nodeType === 3 && n.textContent.trim());
      if (!eigen.length || !sichtbar(e)) continue;
      const s = getComputedStyle(e);
      if (s.visibility === 'hidden' || +s.opacity < 0.1) continue;
      const px = parseFloat(s.fontSize);
      const fett = parseInt(s.fontWeight, 10) >= 700;
      const r = e.getBoundingClientRect();
      aus.push({
        text: eigen.map(n => n.textContent.trim()).join(' ').slice(0, 34),
        farbe: s.color,
        gross: px >= 24 || (px >= 18.66 && fett),
        kasten: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) },
      });
    }
    return aus.slice(0, 60);
  });

  /* Zwei Aufnahmen: einmal mit Text, einmal ohne. Die Differenz ergibt
     eine Maske der Buchstaben. Gemessen wird der Untergrund NUR dort, wo
     wirklich Text steht — ein heller Bildbereich neben der Zeile darf das
     Ergebnis nicht verfaelschen. */
  /* Alles anhalten, bevor verglichen wird. Ohne das erfasst die Maske
     nicht die Buchstaben, sondern die laufende Kamerafahrt: zwischen den
     beiden Aufnahmen verschiebt sich das Hintergrundbild, und der hellste
     Punkt dieser Bewegung landet als „Untergrund“ im Ergebnis. Genau so
     entstand hier ein Kontrastwert von 1,02:1 fuer goldenen Text. */
  await seite.evaluate(() => {
    document.querySelectorAll('video').forEach(v => v.pause());
    const halt = document.createElement('style');
    halt.textContent = '*,*::before,*::after{animation-play-state:paused !important;'
                     + 'transition:none !important}';
    document.head.appendChild(halt);
  });
  await seite.waitForTimeout(320);

  const bildMit = await seite.screenshot();
  /* Nur die Schrift durchsichtig, nicht das Element: bei Schaltflaechen
     mit eigenem Hintergrund verschwaende visibility:hidden auch die Flaeche.
     Gemessen wuerde dann Text gegen das Bild dahinter statt gegen den Knopf —
     so kam hier 1,31:1 fuer dunklen Text auf goldenem Grund zustande. */
  await seite.evaluate(() => {
    const halt = document.createElement('style');
    halt.id = 'zugang-schrift-aus';
    halt.textContent = '*{color:transparent !important;text-shadow:none !important;'
                     + '-webkit-text-fill-color:transparent !important}';
    document.head.appendChild(halt);
  });
  await seite.waitForTimeout(220);
  const bildOhne = await seite.screenshot();
  await seite.evaluate(() => document.getElementById('zugang-schrift-aus')?.remove());

  const grundFarben = await seite.evaluate(async ({ mitD, ohneD, kaesten }) => {
    const laden = async d => createImageBitmap(
      new Blob([Uint8Array.from(atob(d), c => c.charCodeAt(0))], { type: 'image/png' }));
    const [bm, bo] = [await laden(mitD), await laden(ohneD)];
    const flaeche = (b) => { const l = new OffscreenCanvas(b.width, b.height);
      l.getContext('2d').drawImage(b, 0, 0); return l.getContext('2d'); };
    const [km, ko] = [flaeche(bm), flaeche(bo)];
    const massstab = bm.width / innerWidth;

    return kaesten.map(({ x, y, w, h }) => {
      const bx = Math.max(0, Math.round(x * massstab));
      const by = Math.max(0, Math.round(y * massstab));
      const bw = Math.min(bm.width - bx, Math.max(1, Math.round(w * massstab)));
      const bh = Math.min(bm.height - by, Math.max(1, Math.round(h * massstab)));
      if (bw < 1 || bh < 1) return null;
      const dm = km.getImageData(bx, by, bw, bh).data;
      const doo = ko.getImageData(bx, by, bw, bh).data;

      /* Buchstabenpixel: dort hat sich beim Ausblenden etwas geaendert */
      const unter = [];
      for (let i = 0; i < dm.length; i += 4) {
        const abstand = Math.abs(dm[i] - doo[i]) + Math.abs(dm[i+1] - doo[i+1]) + Math.abs(dm[i+2] - doo[i+2]);
        if (abstand > 40) unter.push([doo[i], doo[i+1], doo[i+2]]);
      }
      if (unter.length < 12) return null;          /* zu wenig Text erkannt */
      unter.sort((a, b) => (b[0]+b[1]+b[2]) - (a[0]+a[1]+a[2]));
      const n = Math.max(1, Math.floor(unter.length / 10));
      const s = unter.slice(0, n).reduce((s, p) => [s[0]+p[0], s[1]+p[1], s[2]+p[2]], [0,0,0]);
      return s.map(v => Math.round(v / n));
    });
  }, { mitD: bildMit.toString('base64'), ohneD: bildOhne.toString('base64'),
       kaesten: proben.map(p => p.kasten) });

  proben.forEach((p, i) => {
    const grund = grundFarben[i];
    if (!grund) return;                            /* kein Text erkannt */
    const m = p.farbe.match(/[\d.]+/g);
    if (!m) return;
    const vorn = m.slice(0, 3).map(Number);
    const deckung = m[3] !== undefined ? Number(m[3]) : 1;
    if (deckung < 0.25) return;
    const wert = verhaeltnis(vorn, grund);
    const soll = p.gross ? SOLL_GROSS : SOLL_TEXT;
    if (wert < soll) befunde.push(`Kontrast ${wert.toFixed(2)}:1 (soll ${soll}) — „${p.text}“`);
  });

  for (const m of meldungen) befunde.push(`${m.art}: ${m.text}`);
  await seite.close();
  return befunde;
}

const seiten = NUR ? [NUR]
  : readdirSync('.').filter(f => f.endsWith('.html')).sort();

/* Der Browser kommt aus der Umgebung: VECOM_BROWSER zeigt auf eine
   vorhandene Chromium-Installation, sonst nimmt Playwright seine eigene. */
const browser = await chromium.launch({
  args: ['--autoplay-policy=no-user-gesture-required'],
  ...(process.env.VECOM_BROWSER ? { executablePath: process.env.VECOM_BROWSER } : {}),
});
let beanstandet = 0;

console.log('Zugaenglichkeit — Kontrast an echten Pixeln, Trefferflaechen, Semantik\n');
for (const lage of BREITEN) {
  console.log(`${lage.name} (${lage.viewport.width} px)`);
  for (const datei of seiten) {
    const befunde = await pruefeSeite(browser, datei, lage);
    if (befunde.length) {
      beanstandet += befunde.length;
      console.log(`  ${datei}`);
      for (const b of befunde) console.log(`      ${b}`);
    }
  }
  console.log('');
}
await browser.close();

if (beanstandet) {
  console.log(`${beanstandet} Beanstandung(en).`);
  process.exit(1);
}
console.log(`Ohne Beanstandung — ${seiten.length} Seiten auf ${BREITEN.length} Breiten.`);

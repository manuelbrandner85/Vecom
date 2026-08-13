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
  /* Die beiden Uebersichten. Sie fehlten hier, und genau auf ihnen sind zwoelf
     Betriebe und acht Rezepte monatelang unsichtbar geblieben: Das Stilblatt
     setzte die Listenpunkte auf Deckkraft 0, das Skript kannte sie nicht.
     Beide Seiten sahen unterhalb der Karte einfach leer aus. Kein
     Funktionstest schlug an — die Elemente waren ja da. */
  { name: 'erzeuger',        url: 'erzeuger.html',                              ziel: '.betriebe+-260' },
  { name: 'rezeptliste',     url: 'rezepte.html',                               ziel: '.rezepte+-200' },
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
    let t = 0, bilder = 0, eingefroren = false;
    const rAF = window.requestAnimationFrame;
    performance.now = () => (t += 16);
    window.requestAnimationFrame = cb => rAF(() => {
      if (eingefroren) return;
      bilder++;
      cb(t += 16);
    });
    /* Die gestellte Uhr haengt an der Bildzahl, gewartet wurde aber nach
       Wanduhr — und die Bildzahl schwankte dabei zwischen 114 und 139, also
       um 400 ms gestellter Zeit. Alles, was ueber rAF laeuft (Traegheit,
       Atmosphaere, Buehne), stand deshalb je Aufnahme woanders. Darum wird
       auf eine FESTE Bildzahl gewartet und danach angehalten. */
    window.__bilder = () => bilder;
    window.__einfrieren = () => { eingefroren = true; };
    /* Zufall festnageln, damit Rauschen und Streuung reproduzierbar sind */
    let s = 1;
    Math.random = () => (s = (s * 16807) % 2147483647) / 2147483647;
    try { sessionStorage.setItem('vecom.eintritt', '1'); } catch (e) { }   /* Vorhang ueberspringen */
  });
  await seite.goto(`${ORT}/${a.url}`, { waitUntil: 'load' });
  await seite.waitForTimeout(1200);

  let zielY = null;
  if (a.ziel !== 0) {
    /* Einmal springen genuegt nicht. Die Seite hat eine traege
       Bildlaufsteuerung, die nach einem programmierten Sprung noch auf ihr
       eigenes Ziel nachzieht — und je nach Lauf blieb sie ein paar Pixel
       woanders stehen. Im Bild sah man dasselbe Sortiment, nur um wenige
       Zeilen verschoben: start-sortiment meldete dann 9,03 % Abweichung,
       zweimal exakt derselbe Wert. Ein wiederkehrender exakter Wert ist ein
       Zustand, kein Rauschen.

       Also: springen, warten bis der Stand steht, und wenn er weggelaufen
       ist, noch einmal springen. */
    for (let versuch = 0; versuch < 6; versuch++) {
      zielY = await seite.evaluate(z => {
        const [sel, plus] = String(z).split('+');
        const el = document.querySelector(sel);
        const y = el ? el.getBoundingClientRect().top + scrollY + (+plus || 0) : 0;
        const ganz = Math.round(y);
        scrollTo({ top: ganz, behavior: 'instant' });
        return ganz;
      }, a.ziel);
      await seite.waitForTimeout(500);
      const x = await seite.evaluate(() => Math.round(scrollY));
      await seite.waitForTimeout(350);
      const y = await seite.evaluate(() => Math.round(scrollY));
      if (x === y) break;                     /* steht */
    }
  }
  await seite.waitForTimeout(2600);          /* Auftritte und Ueberblendungen auslaufen lassen */

  /* Zwei Quellen von Unruhe stillstellen, sonst meldet der Vergleich bei
     voellig unveraendertem Code Abweichungen — und ein Werkzeug, das
     Fehlalarme gibt, wird nach dem dritten ignoriert.

     Der Heldenfilm laeuft und zeigt je Aufnahme ein anderes Einzelbild.
     Er wird angehalten und ausgeblendet — Begruendung unten.

     Nachgeladene Bilder sind je nach Zeitpunkt da oder nicht. Es wird
     gewartet, bis alle sichtbaren fertig sind. */
  await seite.evaluate(async () => {
    /* Der Heldenfilm wird angehalten UND ausgeblendet, das Standbild darunter
       wieder eingeblendet.

       Warum nicht einfach auf ein festes Einzelbild setzen? Weil das nicht
       haelt. Nachgemessen: v.currentTime = 0.5 klemmt der Browser auf 0, und
       gemalt wird trotzdem der zuletzt dekodierte Frame — auch nach "seeked"
       und requestVideoFrameCallback. Drei Aufnahmen desselben unveraenderten
       Standes ergaben zwei verschiedene Bilder, Abweichungen bis 23 %. Ein
       Werkzeug, das bei unveraendertem Code Alarm gibt, wird ignoriert.

       Verloren geht dadurch nichts: Dieser Vergleich prueft Gestaltung —
       Satz, Abstaende, Staffelung, Ueberblendfelder. OB der Film ueberhaupt
       laeuft und wann, misst quelle/budget.mjs direkt und in Millisekunden,
       und zwar zuverlaessiger als ein Bildvergleich das je koennte.

       Die Kapitelfilme der Reise bleiben unangetastet: sie werden als Textur
       in die WebGL-Buehne geladen, dort wuerde Ausblenden die Buehne aendern. */
    const held = document.querySelector('.hero__film');
    if (held) {
      try { held.pause(); } catch (e) { }
      held.style.display = 'none';
      const buehne = document.querySelector('.hero--film');
      if (buehne) buehne.classList.remove('film-laeuft');
      /* Damit faengt die langsame Kamerafahrt des Standbilds wieder an zu
         laufen — sie war unter .film-laeuft angehalten. Sie haengt an der
         Wanduhr, nicht an der gestellten, und stand deshalb je Aufnahme
         woanders. Hier wird derselbe Endstand eingestellt, den die Seite
         auch bei "prefers-reduced-motion" zeigt. */
      const stand = document.querySelector('.hero__bild');
      if (stand) {
        stand.style.animation = 'none';
        stand.style.transform = 'scale(1.02)';
        stand.style.opacity = '1';
      }
    }

    const offen = [...document.images].filter(i => !i.complete);
    await Promise.all(offen.map(i => new Promise(r => {
      i.addEventListener('load', r, { once: true });
      i.addEventListener('error', r, { once: true });
      setTimeout(r, 4000);
    })));
  });
  /* Warten, bis das Netz ruhig ist. Nach dem Scrollen faengt der Beobachter
     an, Bilder nachzuladen; ohne diese Zeile entscheidet der Zufall, welche
     Karte schon ein Bild hat. Danach noch einen Moment fuer die letzten
     Auftritte. */
  await seite.waitForLoadState('networkidle').catch(() => { });
  await seite.waitForTimeout(900);

  /* Auf eine feste Bildzahl warten und dann anhalten — siehe oben. 200 liegt
     ueber allem, was hier je gemessen wurde (114 bis 139), und bleibt damit
     auch auf einer schnelleren Maschine der bindende Wert. */
  await seite.waitForFunction(() => window.__bilder() >= 200, null, { timeout: 30000 }).catch(() => { });
  await seite.evaluate(() => window.__einfrieren());

  /* Uebergaenge abschalten. Die Karten treten gestaffelt auf — bis 350 ms
     Verzoegerung plus 780 ms Dauer — und wann der Beobachter ausloest, haengt
     am Scrollzeitpunkt. Die Aufnahme traf dadurch mal den Endstand und mal
     kurz davor: rezeptliste meldete 0,85 % bei voellig unveraendertem Code.

     Wichtig: Es wird nur die BEWEGUNG abgeschaltet, nicht die Klasse "da"
     gesetzt. Ein Element, das seinen Auftritt nie bekommen hat, bleibt also
     unsichtbar und faellt weiter auf — genau dieser Fehler hat zwoelf
     Betriebe und acht Rezepte verschwinden lassen. */
  await seite.addStyleTag({
    content: '*,*::before,*::after{transition:none !important;' +
             'animation-duration:0s !important;animation-delay:0s !important}',
  });

  /* Jetzt erst auf ganze Bildpunkte setzen — vorher hatte es keinen Zweck.
     Die traege Bildlaufsteuerung laeuft ueber rAF und schrieb nach jedem
     Sprung selbst weiter; sie landete bei 10280,6 statt 10281, und ein
     einziges Pixel verschiebt das ganze Raster um eine Zeile. Bei einer
     Schwelle von 24 unterscheiden sich dann saemtliche Kanten, und
     start-sortiment meldete immer wieder exakt 9,03 %. Nach dem Einfrieren
     kann niemand mehr dazwischenfunken. */
  if (zielY !== null) await seite.evaluate(y => scrollTo({ top: y, behavior: 'instant' }), zielY);
  await seite.waitForTimeout(250);
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

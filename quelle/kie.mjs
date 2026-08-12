/* ============================================================
   kie.ai — ein Bild hochrechnen lassen

   Higgsfield ist raus. Gerechnet wird jetzt mit topaz/image-upscale.
   Der Unterschied ist keine Geschmacksfrage: Topaz ist ein OPTISCHER
   Hochrechner. Er rechnet vorhandene Bildinformation sauber auf mehr
   Pixel, statt fehlende zu erfinden. Ein generativer Upscaler malt an
   Trockenmauern und Mandelblueten Dinge hinein, die nie da waren —
   bei 3840 Pixeln ueber den ganzen Schirm sieht man das.

   Eingabe ist eine Adresse, kein Upload. Die veroeffentlichte Seite
   liefert sie, deshalb wird von dort geholt und nicht von der Platte.

   upscale_factor ist ein FAKTOR, kein Zielmass: "1", "2" oder "4".
   Aus 1376 x 774 wird bei "4" also 5504 x 3096. Mehr als die groesste
   Auslieferstufe braucht — und genau so ist es gewollt, denn die
   kleinen Stufen werden daraus heruntergerechnet.

   Der Schluessel steht NICHT in dieser Datei und in keinem Commit.
   Er kommt aus der Umgebung:
       export KIE_SCHLUESSEL=...

   Aufruf:
       node quelle/kie.mjs <quelladresse> <zieldatei>
       node quelle/kie.mjs --kontostand

   Beispiel:
       node quelle/kie.mjs \
         https://manuelbrandner85.github.io/Vecom/assets/img/reise/hain-1376.webp \
         /tmp/hain-gross
   ============================================================ */
import { writeFileSync } from 'fs';

const SCHLUESSEL = process.env.KIE_SCHLUESSEL;
if (!SCHLUESSEL) {
  console.error('KIE_SCHLUESSEL fehlt in der Umgebung. Der Schluessel gehoert nicht ins Repository.');
  process.exit(2);
}
const BASIS = 'https://api.kie.ai/api/v1';
const KOPF = { 'Authorization': `Bearer ${SCHLUESSEL}`, 'Content-Type': 'application/json' };

const schlaf = ms => new Promise(r => setTimeout(r, ms));

export async function kontostand() {
  const a = await (await fetch(`${BASIS}/chat/credit`, { headers: KOPF })).json();
  if (a.code !== 200) throw new Error('Kontostand: ' + JSON.stringify(a));
  return a.data;
}

/* Auftrag anlegen und warten, bis er fertig ist.
   Zurueck kommt die Adresse des Ergebnisses. */
export async function hochrechnen(quelle, faktor = '4') {
  const anlegen = await (await fetch(`${BASIS}/jobs/createTask`, {
    method: 'POST', headers: KOPF,
    body: JSON.stringify({ model: 'topaz/image-upscale', input: { image_url: quelle, upscale_factor: faktor } }),
  })).json();
  if (anlegen.code !== 200 || !anlegen.data?.taskId) throw new Error('Auftrag: ' + JSON.stringify(anlegen));
  const auftrag = anlegen.data.taskId;

  /* Nachfragen, bis etwas anderes als "laeuft" herauskommt. Zehn Minuten
     Geduld; danach ist etwas faul und es soll auffallen statt haengen. */
  const bis = Date.now() + 600000;
  let letzte = null;
  while (Date.now() < bis) {
    await schlaf(5000);
    const a = await (await fetch(`${BASIS}/jobs/recordInfo?taskId=${auftrag}`, { headers: KOPF })).json();
    letzte = a;
    const d = a.data || {};
    const zustand = String(d.state ?? d.status ?? '').toLowerCase();
    if (['success', 'succeeded', 'completed', 'done'].includes(zustand)) {
      /* resultJson kommt je nach Modell als Zeichenkette oder als Objekt. */
      let ergebnis = d.resultJson ?? d.resultUrls ?? d.result;
      if (typeof ergebnis === 'string') { try { ergebnis = JSON.parse(ergebnis); } catch (e) { } }
      const adressen = ergebnis?.resultUrls ?? ergebnis?.result_urls ?? ergebnis;
      const adresse = Array.isArray(adressen) ? adressen[0] : adressen;
      if (typeof adresse !== 'string') throw new Error('Kein Ergebnis in: ' + JSON.stringify(a));
      return adresse;
    }
    if (['fail', 'failed', 'error'].includes(zustand)) throw new Error('Fehlgeschlagen: ' + JSON.stringify(a));
    process.stdout.write('.');
  }
  throw new Error('Zeit abgelaufen. Zuletzt: ' + JSON.stringify(letzte));
}

/* --- als Programm aufgerufen --- */
if (import.meta.url === `file://${process.argv[1]}`) {
  if (process.argv[2] === '--kontostand') {
    console.log(await kontostand());
  } else {
    const [quelle, ziel, faktor = '4'] = process.argv.slice(2);
    if (!quelle || !ziel) {
      console.error('Aufruf: node quelle/kie.mjs <quelladresse> <zieldatei-ohne-endung> [faktor]');
      process.exit(2);
    }
    const vorher = await kontostand();
    console.log(`Kontostand vorher ${vorher}`);
    const adresse = await hochrechnen(quelle, faktor);
    console.log(`\nErgebnis ${adresse}`);

    const roh = Buffer.from(await (await fetch(adresse)).arrayBuffer());
    const endung = (adresse.split('?')[0].match(/\.(png|jpe?g|webp)$/i)?.[1] || 'png').toLowerCase();
    const datei = `${ziel}.${endung}`;
    writeFileSync(datei, roh);

    const nachher = await kontostand();
    console.log(`${datei}  ${(roh.length / 1024 / 1024).toFixed(2)} MB`);
    console.log(`Kontostand nachher ${nachher}  —  gekostet ${(vorher - nachher).toFixed(2)}`);
  }
}

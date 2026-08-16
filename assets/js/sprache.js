/* ============================================================
   Sprachumschaltung

   Der Shop liegt als deutscher Seitenbaum vor. Statt ihn zu
   verdoppeln, werden die sichtbaren Texte im Browser getauscht.
   Das hat zwei Folgen, die man kennen muss:

     · Google indexiert weiterhin nur Deutsch. Fuer echten Verkauf
       nach Italien braeuchte es eigene Adressen je Sprache — dann
       aber auch Versandzonen und italienische Rechtstexte.
     · Ein geteilter Link oeffnet zuerst deutsch und schaltet dann
       um. Die Wahl wird gemerkt, beim naechsten Besuch ist sie da.

   Was fehlt, bleibt deutsch stehen. Ein halb uebersetzter Shop ist
   unschoen, ein kaputter waere schlimmer.
   ============================================================ */
(function sprache(){
  const SPEICHER = 'vecom.sprache';
  const wurzel = document.documentElement;

  /* Elemente, deren Inhalt nicht uebersetzt werden darf */
  const TABU = 'script, style, code, pre, [data-nicht-uebersetzen]';

  let paket = null;
  let beobachterAn = false, warteZeit = null;
  let originale = null;         /* Textknoten -> deutscher Urtext */

  function urtexteSichern(){
    if(originale) return;
    originale = new Map();
    const lauf = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(n){
        if(!n.textContent.trim()) return NodeFilter.FILTER_REJECT;
        if(n.parentElement.closest(TABU)) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    let n;
    while((n = lauf.nextNode())) originale.set(n, n.textContent);
  }

  /* Auch Beschriftungen, Platzhalter und Titel uebersetzen —
     ein Vorleseprogramm liest sonst deutsche Namen vor. */
  const ATTRIBUTE = ['aria-label', 'placeholder', 'title', 'alt', 'aria-description'];
  let attrOriginale = null;

  function attributeSichern(){
    if(attrOriginale) return;
    attrOriginale = [];
    for(const e of document.querySelectorAll('[aria-label],[placeholder],[title],[alt]')){
      for(const a of ATTRIBUTE){
        const v = e.getAttribute(a);
        if(v && v.trim()) attrOriginale.push({e, a, v});
      }
    }
  }

  function uebersetze(text){
    const roh = text.trim();
    if(!roh) return null;
    /* Im Markup umbrochene Absaetze enthalten Zeilenumbrueche und
       Einrueckungen. Ohne Normalisierung findet das Woerterbuch sie nie —
       und genau die langen Fliesstexte blieben deutsch stehen. */
    const glatt = roh.replace(/\s+/g, ' ');
    if(paket[glatt]) return text.replace(roh, paket[glatt]);
    if(paket[roh]) return text.replace(roh, paket[roh]);
    /* Zusammengesetzte Zeilen: Satzteile einzeln versuchen */
    if(glatt.includes(' · ')){
      const teile = glatt.split(' · ');
      if(teile.some(t => paket[t.trim()])){
        return text.replace(roh, teile.map(t => paket[t.trim()] || t).join(' · '));
      }
    }
    return null;
  }

  /* Absaetze, die durch <span lang="it"> in mehrere Textknoten zerfallen,
     stehen nie am Stueck im Woerterbuch. Deshalb werden auch ganze Elemente
     geprueft — aber nur solche, deren einzige Element-Kinder <span> sind.
     Ein <li>, das ein <p> enthaelt, darf nicht ersetzt werden: textContent
     wuerde das <p> loeschen und die Liste um einen Eintrag verkuerzen. */
  const GANZ = 'p, dd, dt, h1, h2, h3, figcaption';
  let ganzeOriginale = null;

  function ganzeSichern(){
    if(ganzeOriginale) return;
    ganzeOriginale = [];
    for(const e of document.querySelectorAll(GANZ)){
      if(e.closest(TABU)) continue;
      if([...e.children].some(k => k.tagName !== 'SPAN')) continue;
      if(!e.querySelector('span')) continue;          /* einteilig: Textknoten genuegt */
      const glatt = e.textContent.trim().replace(/\s+/g, ' ');
      if(glatt.length > 12) ganzeOriginale.push({e, html: e.innerHTML, glatt});
    }
  }

  function anwenden(nachIt){
    urtexteSichern();
    attributeSichern();
    ganzeSichern();

    for(const {e, html, glatt} of ganzeOriginale){
      if(!e.isConnected) continue;
      if(nachIt){
        if(paket[glatt] && e.innerHTML === html) e.textContent = paket[glatt];
      } else if(e.innerHTML !== html){
        e.innerHTML = html;
      }
    }

    for(const [knoten, urtext] of originale){
      if(!knoten.isConnected) continue;
      if(nachIt){
        const neu = uebersetze(urtext);
        if(neu) knoten.textContent = neu;
      } else if(knoten.textContent !== urtext){
        knoten.textContent = urtext;
      }
    }
    for(const {e, a, v} of attrOriginale){
      if(!e.isConnected) continue;
      if(nachIt){
        const neu = paket[v.trim()];
        if(neu) e.setAttribute(a, neu);
      } else if(e.getAttribute(a) !== v){
        e.setAttribute(a, v);
      }
    }

    wurzel.lang = nachIt ? 'it' : 'de';
    /* Italienische Fachbegriffe sind im deutschen Text als lang="it"
       ausgezeichnet. In der italienischen Fassung waere das doppelt
       gemoppelt und verwirrt Vorleseprogramme. */
    /* Nur Auszeichnungen im Inhalt, nicht das Dokument selbst — sonst
       loescht diese Schleife die eben gesetzte Dokumentsprache. */
    document.querySelectorAll('body [lang="it"]').forEach(e => {
      if(nachIt) { e.dataset.warIt = '1'; e.removeAttribute('lang'); }
      else if(e.dataset.warIt) { e.setAttribute('lang', 'it'); delete e.dataset.warIt; }
    });

    hinweisZeigen(nachIt);
    knopfSetzen(nachIt);
  }

  /* Rechtstexte bleiben deutsch — das muss dastehen, nicht verschwiegen werden */
  function hinweisZeigen(nachIt){
    let h = document.getElementById('recht-hinweis');
    if(!nachIt){ if(h) h.remove(); return; }
    if(h) return;
    const ziel = document.querySelector('.foot__grid') || document.querySelector('.foot .wrap');
    if(!ziel) return;
    h = document.createElement('p');
    h.id = 'recht-hinweis';
    h.className = 'recht-hinweis';
    h.lang = 'it';
    h.textContent = paket['__RECHT_HINWEIS__'] || '';
    ziel.after(h);
  }

  /* ---------- Umschalter ---------- */
  const knopf = document.createElement('button');
  knopf.type = 'button';
  knopf.className = 'iconbtn sprachbtn';
  knopf.id = 'sprachToggle';
  knopf.innerHTML = '<span class="sprachbtn__kuerzel">DE</span>';

  let knopfSetzen = function(nachIt){
    knopf.querySelector('.sprachbtn__kuerzel').textContent = nachIt ? 'IT' : 'DE';
    knopf.setAttribute('aria-label', nachIt
      ? 'Cambia lingua in tedesco' : 'Sprache auf Italienisch umstellen');
    knopf.setAttribute('title', nachIt ? 'Italiano · Deutsch' : 'Deutsch · Italiano');
    knopf.setAttribute('aria-pressed', String(nachIt));
  };

  /* Das Woerterbuch ist auf vier Dateien verteilt: Oberflaeche zuerst,
     dann die Fliesstexte. Alle schreiben in dasselbe Objekt und werden
     nur geholt, wenn jemand tatsaechlich umschaltet. */
  const TEILE = ['sprache-it.js', 'sprache-it-2.js', 'sprache-it-3.js', 'sprache-it-4.js'];

  function teilLaden(datei){
    return new Promise(fertig => {
      const s = document.createElement('script');
      s.src = 'assets/js/' + datei;
      s.onload = () => fertig(true);
      s.onerror = () => fertig(false);
      document.head.appendChild(s);
    });
  }

  let geladen = false;
  async function paketLaden(){
    if(geladen){ paket = window.VECOM_IT; return true; }
    const ergebnis = await Promise.all(TEILE.map(teilLaden));
    if(!ergebnis[0]) return false;          /* ohne Oberflaeche gar nicht erst */
    geladen = true;
    paket = window.VECOM_IT || {};
    return true;
  }

  async function umschalten(nachIt){
    if(nachIt && !(await paketLaden())) return;
    beobachterAn = false;
    anwenden(nachIt);
    requestAnimationFrame(() => { beobachterAn = true; });
    try { localStorage.setItem(SPEICHER, nachIt ? 'it' : 'de'); } catch(e){}
  }

  knopf.addEventListener('click', () => umschalten(wurzel.lang !== 'it'));

  const werkzeuge = document.querySelector('.tools');
  if(werkzeuge) werkzeuge.insertBefore(knopf, werkzeuge.firstChild);
  knopfSetzen(false);

  /* Zweiter Zugang in der grossen Navigation — auf schmalen Displays
     ist er der einzige, dort fehlt in der Kopfzeile der Platz. */
  const neben = document.querySelector('.welt__neben');
  if(neben){
    const feld = document.createElement('div');
    feld.className = 'welt__sprache';
    const zweit = document.createElement('button');
    zweit.type = 'button';
    zweit.innerHTML = '<b class="welt__sprache__kuerzel">IT</b><span>Italiano</span>';
    zweit.addEventListener('click', () => umschalten(wurzel.lang !== 'it'));
    feld.appendChild(zweit);
    neben.appendChild(feld);
    const alt = knopfSetzen;
    knopfSetzen = function(nachIt){
      alt(nachIt);
      zweit.querySelector('b').textContent = nachIt ? 'DE' : 'IT';
      zweit.querySelector('span').textContent = nachIt ? 'Deutsch' : 'Italiano';
      zweit.setAttribute('aria-label', nachIt ? 'Passa al tedesco' : 'Auf Italienisch umstellen');
    };
    knopfSetzen(wurzel.lang === 'it');
  }

  /* Gemerkte Wahl, sonst Browsersprache */
  let wunsch = null;
  try { wunsch = localStorage.getItem(SPEICHER); } catch(e){}
  if(!wunsch && (navigator.language || '').toLowerCase().startsWith('it')) wunsch = 'it';
  if(wunsch === 'it') umschalten(true);

  /* Nachgeladene Inhalte — Warenkorb, Kasse, Dialoge — mituebersetzen.
     Der Beobachter wird waehrend des Uebersetzens abgeschaltet: sonst
     loesen die eigenen Aenderungen ihn erneut aus und die Seite haengt.
     Zusaetzlich entprellt, weil ein Dialog auf einen Schlag hunderte
     Knoten einfuegt. */
  const beobachter = new MutationObserver(aenderungen => {
    if(!beobachterAn || wurzel.lang !== 'it' || !paket) return;
    if(!aenderungen.some(a => a.addedNodes.length)) return;
    clearTimeout(warteZeit);
    warteZeit = setTimeout(() => {
      beobachterAn = false;
      originale = null; attrOriginale = null; ganzeOriginale = null;
      anwenden(true);
      requestAnimationFrame(() => { beobachterAn = true; });
    }, 60);
  });
  beobachter.observe(document.body, {childList: true, subtree: true});
  requestAnimationFrame(() => { beobachterAn = true; });
})();

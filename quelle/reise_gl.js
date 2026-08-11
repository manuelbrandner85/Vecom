/* ============================================================
   18 — Reise-Renderer (WebGL2): Tiefenrelief

   Sechs fotografische Kapitel, teils als Bewegtbild. Bisher lag
   jedes Bild flach auf einem Vollbild-Dreieck, und die „Kamerafahrt"
   war ein Hineinskalieren — dieselbe Bewegung für Vordergrund und
   Horizont. Das ist kein Hineinfahren, das ist Zoom.

   Jetzt ist jedes Kapitel Geometrie. Zu jedem Bild liegt eine
   Tiefenkarte im Bestand (512 × 288, rund 3 KB); sie verschiebt ein
   Gitter aus rund 35 000 Dreiecken entlang der Blickstrahlen. Eine
   echte Kamera fährt hinein. Die Kaper im Vordergrund wandert dann
   schneller aus dem Bild als der Hang dahinter — Parallaxe, die aus
   der Aufnahme selbst stammt und nicht aus einer Zahl.

   Der Kniff, damit nichts verrutscht: Jeder Gitterpunkt sitzt auf
   dem Blickstrahl, der durch seinen eigenen Bildpunkt geht. Steht
   die Kamera im Ausgangspunkt, deckt sich die Projektion darum
   wieder exakt mit dem Originalbild — unabhängig von der Tiefe.
   Erst die Bewegung erzeugt die Verschiebung.

   Wo die Tiefe springt, wird das Gitter gedehnt; hinter der Kaper
   liegt keine Bildinformation. Statt Löcher zu stopfen, dunkelt der
   Shader diese Flanken ab — eine gedehnte Kante liest sich so als
   Eigenschatten statt als Fehler.

   Fällt etwas aus — kein WebGL2, Software-Rasterizer, kleine
   Anzeige, Bewegungsreduktion, zu wenig Bildrate — übernimmt
   lautlos die CSS-Fassung. Fehlt nur die Tiefenkarte, bleibt das
   Kapitel flach und alles andere läuft weiter.
   ============================================================ */
(function reiseRenderer(){
  const spur   = document.querySelector(".reise__spur");
  const buehne = document.querySelector(".reise__buehne");
  const felder = Array.from(document.querySelectorAll(".reise__bild"));
  if(!spur || !buehne || felder.length < 2) return;
  if(matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  /* ?renderer=erzwingen hebt die Hardwaresperre zum Prüfen auf */
  const erzwingen = /[?&]renderer=erzwingen/.test(location.search);

  const leinwand = document.createElement("canvas");
  leinwand.className = "reise__gl";
  leinwand.setAttribute("aria-hidden", "true");
  const gl = leinwand.getContext("webgl2", {
    alpha: false, antialias: false, depth: true, stencil: false,
    powerPreference: "high-performance"
  });
  if(!gl) return;

  const info  = gl.getExtension("WEBGL_debug_renderer_info");
  const karte = (info ? gl.getParameter(info.UNMASKED_RENDERER_WEBGL)
                      : gl.getParameter(gl.RENDERER)) || "";
  if(!erzwingen && /swiftshader|llvmpipe|software|basic render|microsoft basic/i.test(karte)) return;
  if(!erzwingen && innerWidth < 900) return;

  /* ---------------- Shader ---------------- */
  const VERT = `#version 300 es
layout(location=0) in vec2 aNdc;          /* Gitterpunkt im Bildschirmraum, -1 … 1 */

uniform sampler2D uTiefe;
uniform vec2  uRes, uBild, uTexel;
uniform float uFahrt, uRelief, uHatTiefe, uSeitlich;

out vec2  vUV;
out float vStreck, vFerne;

/* Bildschirmpunkt auf Bildkoordinate: das Bild deckt die Bühne,
   der Überstand wird beschnitten — wie object-fit: cover. */
vec2 deckung(vec2 ndc){
  float za = uRes.x / uRes.y;
  float zb = uBild.x / uBild.y;
  vec2  s  = za > zb ? vec2(1.0, zb / za) : vec2(za / zb, 1.0);
  vec2  uv = ndc * 0.5 + 0.5;
  return (uv - 0.5) / s + 0.5;
}

float tiefeBei(vec2 uv){
  /* Hell heißt FERN — so sind die Karten dieses Bestands angelegt, ueber alle
     sieben nachgemessen: der Dunst am oberen Rand liegt bei 151…246, der nahe
     Bewuchs am unteren bei 11…109. Andersherum liefe die Parallaxe verkehrt,
     der Horizont zoege schneller als der Vordergrund.
     Ohne Karte bleibt das Kapitel eine ebene Flaeche. */
  return uHatTiefe > 0.5 ? texture(uTiefe, clamp(uv, 0.0, 1.0)).r : 0.5;
}

void main(){
  vec2 uv = deckung(aNdc);
  vUV = uv;

  float t = tiefeBei(uv);
  vFerne = t;                                /* 0 = nah, 1 = fern */

  /* Wie stark springt die Tiefe hier? Daraus wird später der
     Eigenschatten an gedehnten Flanken. */
  float dx = abs(tiefeBei(uv + vec2(uTexel.x, 0.0)) - t);
  float dy = abs(tiefeBei(uv + vec2(0.0, uTexel.y)) - t);
  vStreck = clamp((dx + dy) * 7.0, 0.0, 1.0);

  /* Blickstrahl durch genau diesen Bildpunkt. Weil der Punkt auf
     seinem eigenen Strahl sitzt, deckt sich die Projektion im
     Ausgangspunkt der Kamera wieder mit dem Originalbild. */
  float tanH = 0.4142;                       /* tan(45°/2) — 45 Grad Bildwinkel */
  float za   = uRes.x / uRes.y;
  vec3 strahl = vec3(aNdc.x * tanH * za, aNdc.y * tanH, -1.0);

  float nah = 1.0, fern = 1.0 + 1.15 * uRelief;
  vec3  welt = strahl * mix(nah, fern, t);      /* dunkel = nah, hell = fern */

  /* Die Fahrt: hinein und ein Hauch zur Seite, damit die Parallaxe nicht nur
     radial aus der Bildmitte laeuft. Die Kamera schaut nach -z, hinein heisst
     also, ihren Standort nach -z zu ruecken — und der Standort wird vom Punkt
     abgezogen, nicht addiert. Andersherum entfernt sich das Bild. */
  vec3 kamera = vec3(uSeitlich * 0.055 * uRelief, 0.0, -uFahrt * 0.42 * uRelief);
  welt -= kamera;

  float n = 0.05, f = 12.0;
  float p = 1.0 / tanH;
  gl_Position = vec4(welt.x * p / za, welt.y * p,
                     (welt.z * (f + n) + 2.0 * f * n) / (n - f),
                     -welt.z);
}`;

  const FRAG = `#version 300 es
precision highp float;
in vec2  vUV;
in float vStreck, vFerne;
out vec4 farbe;

uniform sampler2D uBildT;
uniform vec2  uRes;
uniform float uZeit, uPost, uTempo, uMisch, uIstB;

float hash(vec2 p){
  vec3 q = fract(vec3(p.xyx) * 0.1031);
  q += dot(q, q.yzx + 33.33);
  return fract((q.x + q.y) * q.z);
}
float rauschen(vec2 p){
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1,0)), f.x),
             mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), f.x), f.y);
}
float fbm(vec2 p){
  float s = 0.0, a = 0.5;
  for(int i = 0; i < 3; i++){ s += a * rauschen(p); p *= 2.07; a *= 0.5; }
  return s;
}

void main(){
  vec2 s = gl_FragCoord.xy / uRes;

  /* Das Objektiv reagiert auf die Fahrt: ein harter Schwenk treibt den
     Farbquerfehler an den Rand, so wie eine echte Optik unter Tempo leidet. */
  float ab = (0.0035 + uTempo * 0.0075) * uPost;
  float r  = length(s - 0.5);
  vec2  d  = normalize(s - 0.5 + 1e-6) * (r * r) * ab;

  vec3 c = vec3(texture(uBildT, clamp(vUV + d, 0.0, 1.0)).r,
                texture(uBildT, clamp(vUV,     0.0, 1.0)).g,
                texture(uBildT, clamp(vUV - d, 0.0, 1.0)).b);

  /* Gedehnte Flanken werden zu Eigenschatten, statt als Loch aufzufallen */
  c *= 1.0 - vStreck * 0.55;

  float hell = smoothstep(0.62, 1.0, dot(c, vec3(0.2126, 0.7152, 0.0722)));
  c += vec3(1.0, 0.86, 0.62) * hell * 0.16 * uPost;

  /* Luftperspektive: Entferntes verliert Kontrast und nimmt die Farbe des
     Lichts an. Das ist die Tiefenwirkung, die eine echte Weite hat — und sie
     traegt weiter als Korn, weil sie aus der Tiefenkarte stammt und nicht
     gleichmaessig ueber dem Bild liegt. Quadratisch, damit der Vordergrund
     unangetastet bleibt und erst der Horizont weich wird. */
  vec3 dunst = vec3(0.87, 0.81, 0.67);
  c = mix(c, dunst, vFerne * vFerne * 0.20 * uPost);

  c = pow(max(c, 0.0), vec3(0.98, 1.0, 1.045));
  c = mix(vec3(dot(c, vec3(0.2126, 0.7152, 0.0722))), c, 1.07);
  c *= vec3(1.02, 1.0, 0.965);

  float vig = smoothstep(1.02, 0.32, length((s - 0.5) * vec2(uRes.x / uRes.y, 1.0)));
  c *= mix(1.0, 0.52 + 0.48 * vig, uPost);


  /* Der Kapitelwechsel läuft als Kante durchs Bild, nicht als Blende.
     Nur der zweite Durchgang trägt sie. */
  float a = 1.0;
  if(uIstB > 0.5){
    /* Jeder Bildpunkt bekommt eine eigene Schwelle aus Hoehe und Rauschen;
       der Wechsel schiebt sie als Kante durchs Bild. Entscheidend ist, dass
       bei uMisch = 0 wirklich nichts und bei uMisch = 1 wirklich alles steht —
       sonst deckt das naechste Kapitel das laufende sofort zu. */
    float nz = fbm(s * 3.2 + vec2(0.0, uZeit * 0.02));
    float schwelle = s.y * 0.45 + nz * 0.55;
    a = smoothstep(schwelle - 0.18, schwelle + 0.18, uMisch * 1.36 - 0.18);
  }
  farbe = vec4(clamp(c, 0.0, 1.0), clamp(a, 0.0, 1.0));
}`;

  function shader(art, quelle){
    const s = gl.createShader(art);
    gl.shaderSource(s, quelle); gl.compileShader(s);
    if(!gl.getShaderParameter(s, gl.COMPILE_STATUS)){
      if(erzwingen) window.__shaderFehler = (window.__shaderFehler || []).concat(gl.getShaderInfoLog(s));
      return null;
    }
    return s;
  }
  const vs = shader(gl.VERTEX_SHADER, VERT), fs = shader(gl.FRAGMENT_SHADER, FRAG);
  if(!vs || !fs) return;
  const prog = gl.createProgram();
  gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog);
  if(!gl.getProgramParameter(prog, gl.LINK_STATUS)){
    if(erzwingen) window.__programmFehler = gl.getProgramInfoLog(prog);
    return;
  }
  gl.useProgram(prog);

  const U = {};
  ["uTiefe","uBildT","uRes","uBild","uTexel","uFahrt","uRelief","uHatTiefe",
   "uSeitlich","uZeit","uPost","uTempo","uMisch","uIstB"]
    .forEach(nm => U[nm] = gl.getUniformLocation(prog, nm));
  gl.uniform1i(U.uBildT, 0);
  gl.uniform1i(U.uTiefe, 1);

  /* ---------------- Gitter ---------------- */
  /* Nur der Bildschirmort je Punkt; Tiefe und Weltlage rechnet der
     Vertex-Shader. Ein Puffer, ein Indexpuffer, sonst nichts. */
  let gitterX = 176, gitterY = 99, indexAnzahl = 0;
  const vao = gl.createVertexArray();
  const eckPuffer = gl.createBuffer(), idxPuffer = gl.createBuffer();

  function gitterBauen(nx, ny){
    const ecken = new Float32Array((nx + 1) * (ny + 1) * 2);
    let o = 0;
    for(let y = 0; y <= ny; y++)
      for(let x = 0; x <= nx; x++){
        ecken[o++] = (x / nx) * 2 - 1;
        ecken[o++] = (y / ny) * 2 - 1;
      }
    const reihe = nx + 1;
    const idx = new Uint32Array(nx * ny * 6);
    let k = 0;
    for(let y = 0; y < ny; y++)
      for(let x = 0; x < nx; x++){
        const a = y * reihe + x, b = a + 1, c = a + reihe, d = c + 1;
        idx[k++] = a; idx[k++] = c; idx[k++] = b;
        idx[k++] = b; idx[k++] = c; idx[k++] = d;
      }
    gl.bindVertexArray(vao);
    gl.bindBuffer(gl.ARRAY_BUFFER, eckPuffer);
    gl.bufferData(gl.ARRAY_BUFFER, ecken, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, idxPuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, idx, gl.STATIC_DRAW);
    gl.bindVertexArray(null);
    indexAnzahl = idx.length;
  }
  gitterBauen(gitterX, gitterY);

  /* ---------------- Texturen ---------------- */
  const n        = felder.length;
  const texturen = new Array(n).fill(null);
  const tiefen   = new Array(n).fill(null);
  const masse    = felder.map(() => [16, 9]);
  const tMasse   = felder.map(() => [512, 288]);
  const filme    = new Array(n).fill(null);
  const bewegt   = new Array(n).fill(false);

  const platzhalter = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, platzhalter);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
                new Uint8Array([28, 34, 8, 255]));
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

  function neueTextur(){
    const t = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, t);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    return t;
  }

  function bildHochladen(i){
    if(texturen[i]) return;
    const bild = felder[i].querySelector("img");
    if(!bild || !bild.complete || !bild.naturalWidth) return;
    texturen[i] = neueTextur();
    gl.bindTexture(gl.TEXTURE_2D, texturen[i]);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, bild);
    masse[i] = [bild.naturalWidth, bild.naturalHeight];
  }

  /* Die Tiefenkarte trägt denselben Schlüssel wie das Kapitelbild —
     im Markup steht er ohnehin schon. */
  function tiefeHolen(i){
    if(tiefen[i] !== null) return;
    const bild = felder[i].querySelector("img");
    const schluessel = bild && bild.dataset.reise;
    /* data-tiefe="nein" sagt: zu diesem Kapitel gibt es (noch) keine Karte.
       Ohne die Abmeldung holte der Lader eine Datei, von der wir wissen, dass
       sie fehlt — ein 404 in der Konsole und eine Anfrage fuer nichts. */
    if(!schluessel || felder[i].dataset.tiefe === "nein"){ tiefen[i] = false; return; }
    tiefen[i] = false;                                  /* bis sie wirklich da ist */
    const k = new Image();
    k.decoding = "async";
    k.onload = () => {
      const t = neueTextur();
      gl.bindTexture(gl.TEXTURE_2D, t);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, k);
      tiefen[i] = t;
      tMasse[i] = [k.naturalWidth || 512, k.naturalHeight || 288];
    };
    k.onerror = () => { tiefen[i] = false; };            /* flach ist besser als gar nicht */
    k.src = "assets/img/tiefe/" + schluessel + ".webp";
  }

  felder.forEach((f, i) => {
    const bild = f.querySelector("img");
    if(!bild) return;
    if(bild.complete && bild.naturalWidth) bildHochladen(i);
    else bild.addEventListener("load", () => bildHochladen(i), {once:true});
  });

  /* ---------------- Bewegtbild ---------------- */
  const netz = navigator.connection || {};
  const bewegtErlaubt = !netz.saveData
      && !/(2g|slow-2g|3g)/.test(netz.effectiveType || "");

  function filmHolen(i){
    if(!bewegtErlaubt || filme[i] !== null) return;
    let quellen = null;
    try { quellen = JSON.parse(felder[i].dataset.film || "null"); } catch(e){}
    if(!quellen || !quellen.length){ filme[i] = false; return; }
    const v = document.createElement("video");
    v.muted = true; v.loop = true; v.playsInline = true; v.preload = "auto";
    v.setAttribute("muted", ""); v.setAttribute("playsinline", "");
    quellen.forEach(q => {
      const s = document.createElement("source");
      s.src = q.datei; s.type = q.typ; v.appendChild(s);
    });
    v.addEventListener("playing", () => { bewegt[i] = true; }, {once:true});
    v.addEventListener("error", () => { filme[i] = false; }, {once:true});
    filme[i] = v;
    v.load();
    v.play().catch(() => {});
  }

  function filmHochladen(i){
    const v = filme[i];
    if(!v || v === false || !bewegt[i] || v.readyState < 2 || !texturen[i]) return;
    gl.bindTexture(gl.TEXTURE_2D, texturen[i]);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, v);
    if(v.videoWidth) masse[i] = [v.videoWidth, v.videoHeight];
  }

  /* ---------------- Adaptive Qualität ---------------- */
  const maxDpr = Math.min(devicePixelRatio || 1, 2);
  let dpr = maxDpr, post = 1.0, relief = 1.0, tempoGlatt = 0;
  let fenster = 0, bilder = 0, gut = 0, aus = false;

  function groesse(){
    const b = buehne.getBoundingClientRect();
    const w = Math.max(1, Math.round(b.width  * dpr));
    const h = Math.max(1, Math.round(b.height * dpr));
    if(leinwand.width !== w || leinwand.height !== h){
      leinwand.width = w; leinwand.height = h;
      gl.viewport(0, 0, w, h);
      gl.uniform2f(U.uRes, w, h);
    }
  }

  function abschalten(){
    aus = true;
    filme.forEach(v => { if(v && v !== false){ v.pause(); v.removeAttribute("src"); v.load(); } });
    leinwand.remove();
    buehne.classList.remove("gl-an");
  }

  let letzte = performance.now();

  /* Ein Kapitel zeichnen: Bild, Tiefe, Fahrt, Rolle im Wechsel */
  function kapitel(i, fahrt, seitlich, istB, misch){
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texturen[i] || platzhalter);
    gl.activeTexture(gl.TEXTURE1);
    const tf = tiefen[i];
    gl.bindTexture(gl.TEXTURE_2D, tf || platzhalter);

    gl.uniform2f(U.uBild, masse[i][0], masse[i][1]);
    gl.uniform2f(U.uTexel, 1 / tMasse[i][0], 1 / tMasse[i][1]);
    gl.uniform1f(U.uHatTiefe, tf ? 1 : 0);
    gl.uniform1f(U.uFahrt, fahrt);
    gl.uniform1f(U.uSeitlich, seitlich);
    gl.uniform1f(U.uRelief, relief);
    gl.uniform1f(U.uIstB, istB);
    gl.uniform1f(U.uMisch, misch);

    gl.bindVertexArray(vao);
    gl.drawElements(gl.TRIANGLES, indexAnzahl, gl.UNSIGNED_INT, 0);
    gl.bindVertexArray(null);
  }

  function zeichnen(jetzt){
    if(aus) return;
    requestAnimationFrame(zeichnen);

    const r = spur.getBoundingClientRect();
    if(r.bottom < -100 || r.top > innerHeight + 100){
      letzte = jetzt;
      filme.forEach(v => { if(v && v !== false && !v.paused) v.pause(); });
      return;
    }

    const dt = jetzt - letzte; letzte = jetzt;
    fenster += dt; bilder++;
    if(fenster > 800){
      const mittel = fenster / bilder;
      fenster = 0; bilder = 0;
      if(mittel > 26){
        /* Erst feiner rechnen, dann flacher, dann grober, dann fort */
        if(dpr > 1){ dpr = Math.max(1, dpr - 0.5); groesse(); }
        else if(post > 0){ post = 0; }
        else if(gitterX > 64){ gitterX = 64; gitterY = 36; gitterBauen(gitterX, gitterY); }
        else if(relief > 0){ relief = 0; }
        else { abschalten(); return; }
      } else if(mittel < 15){
        if(++gut > 6 && dpr < maxDpr){ gut = 0; dpr = maxDpr; groesse(); }
      }
    }

    groesse();

    const weg = r.height - innerHeight;
    const p   = weg > 0 ? Math.min(Math.max(-r.top / weg, 0), 1) : 0;
    const roh = p * n;
    const i   = Math.min(Math.floor(roh), n - 1);
    const j   = Math.min(i + 1, n - 1);
    const t   = Math.min(Math.max(roh - i, 0), 1);

    /* Laufendes und nächstes Kapitel bewegt halten, den Rest anhalten */
    for(let k = 0; k < n; k++){
      const v = filme[k];
      if(k === i || k === j){
        filmHolen(k); tiefeHolen(k);
        const w2 = filme[k];
        if(w2 && w2 !== false && w2.paused) w2.play().catch(() => {});
      } else if(v && v !== false && !v.paused){
        v.pause();
      }
    }
    filmHochladen(i);
    if(j !== i) filmHochladen(j);

    const rohTempo = (window.VECOM && VECOM.bildlauf)
                   ? Math.min(Math.abs(VECOM.bildlauf().tempo) / 55, 1) : 0;
    tempoGlatt += (rohTempo - tempoGlatt) * 0.12;

    gl.uniform1f(U.uZeit, jetzt * 0.001);
    gl.uniform1f(U.uPost, post);
    gl.uniform1f(U.uTempo, tempoGlatt);

    gl.enable(gl.DEPTH_TEST);
    gl.clearColor(0.11, 0.13, 0.03, 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    /* Laufendes Kapitel: die Fahrt geht über den ganzen Abschnitt hinein */
    kapitel(i, t, t - 0.5, 0.0, 0.0);

    /* Das nächste Kapitel setzt am Anfang seiner eigenen Fahrt an und
       schiebt sich als Kante darüber. Eigener Tiefenpuffer, damit es
       nicht mit dem vorigen Relief ringt. */
    if(j !== i && t > 0.001){
      gl.clear(gl.DEPTH_BUFFER_BIT);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      kapitel(j, 0.0, -0.5, 1.0, t);
      gl.disable(gl.BLEND);
    }
  }

  function start(){
    if(!texturen[0]) return false;
    buehne.insertBefore(leinwand, buehne.firstChild);
    buehne.classList.add("gl-an");
    groesse();
    addEventListener("resize", groesse);
    document.addEventListener("visibilitychange", () => {
      if(document.hidden) filme.forEach(v => { if(v && v !== false) v.pause(); });
      else letzte = performance.now();
    });
    requestAnimationFrame(zeichnen);
    return true;
  }
  if(erzwingen) window.__rendererStand = () => ({
    texturen: texturen.map(x => !!x),
    tiefen: tiefen.map(x => x === null ? null : !!x),
    bilder: felder.map(f => { const i = f.querySelector("img"); return i ? i.naturalWidth : -1; }),
    aus, dpr, post, relief, gitter: gitterX + "x" + gitterY, dreiecke: indexAnzahl / 3
  });
  const warten = setInterval(() => { if(start()) clearInterval(warten); }, 120);
  setTimeout(() => clearInterval(warten), 20000);
})();

/* ============================================================
   18 — Reise-Renderer (WebGL2)

   Sechs fotografische Kapitel, teils als Bewegtbild. Kein Modell,
   kein Licht, keine Physik — also kein Szenengraph und keine
   Bibliothek. Ein Vollbild-Dreieck, ein Programm, zwei Texturen.

   Was er leistet und CSS nicht leisten kann:
     · Auflösung statt Blende — eine Rauschschwelle wandert durchs Bild
     · Farbquerfehler nur am Rand, wie bei einem echten Objektiv
     · Lichthof auf hellen Stellen
     · Tonnenverzeichnung, Randabdunklung, helligkeitsgekoppeltes Korn

   Fällt etwas aus — kein WebGL2, Software-Rasterizer, kleine Anzeige,
   Bewegungsreduktion, zu wenig Bildrate — übernimmt lautlos die
   CSS-Fassung, die dieselbe Kamerafahrt beherrscht.
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
    alpha: false, antialias: false, depth: false, stencil: false,
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
void main(){
  vec2 p = vec2((gl_VertexID << 1) & 2, gl_VertexID & 2);
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`;

  const FRAG = `#version 300 es
precision highp float;
out vec4 farbe;

uniform sampler2D uA, uB;
uniform vec2  uRes, uBildA, uBildB;
uniform float uMisch, uFahrtA, uFahrtB, uZeit, uPost, uTempo;

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

vec2 kamera(vec2 uv, vec2 bild, float fahrt){
  float za = uRes.x / uRes.y;
  float zb = bild.x / bild.y;
  vec2 s = za > zb ? vec2(1.0, zb / za) : vec2(za / zb, 1.0);
  uv = (uv - 0.5) / s + 0.5;
  float z = 1.14 - fahrt * 0.14;
  vec2  v = vec2((fahrt - 0.5) * 0.018, (fahrt - 0.5) * -0.032);
  return (uv - 0.5) * z + 0.5 + v;
}

vec3 hole(sampler2D t, vec2 uv, vec2 bild, float fahrt, float ab){
  vec2 p = kamera(uv, bild, fahrt);
  float r = length(uv - 0.5);
  vec2 d = normalize(uv - 0.5 + 1e-6) * (r * r) * ab;
  return vec3(texture(t, clamp(p + d, 0.0, 1.0)).r,
              texture(t, clamp(p,     0.0, 1.0)).g,
              texture(t, clamp(p - d, 0.0, 1.0)).b);
}

void main(){
  vec2 uv = gl_FragCoord.xy / uRes;
  uv.y = 1.0 - uv.y;
  vec2 m = uv - 0.5;
  uv = 0.5 + m * (1.0 + 0.055 * dot(m, m) * uPost);

  /* Das Objektiv reagiert auf die Fahrt: ein harter Schwenk treibt den
     Farbquerfehler an den Rand, so wie eine echte Optik unter Tempo leidet. */
  float ab = (0.0035 + uTempo * 0.0075) * uPost;
  vec3 a = hole(uA, uv, uBildA, uFahrtA, ab);
  vec3 c = a;

  if(uMisch > 0.001){
    vec3 b = hole(uB, uv, uBildB, uFahrtB, ab);
    float nz = fbm(uv * 3.2 + vec2(0.0, uZeit * 0.02));
    float kante = clamp(uMisch * 1.34 - 0.17, 0.0, 1.0);
    float w = smoothstep(kante - 0.16, kante + 0.16, 1.0 - (uv.y * 0.55 + nz * 0.45));
    c = mix(a, b, clamp(w, 0.0, 1.0));
  }

  float hell = smoothstep(0.62, 1.0, dot(c, vec3(0.2126, 0.7152, 0.0722)));
  c += vec3(1.0, 0.86, 0.62) * hell * 0.16 * uPost;

  c = pow(max(c, 0.0), vec3(0.98, 1.0, 1.045));
  c = mix(vec3(dot(c, vec3(0.2126, 0.7152, 0.0722))), c, 1.07);
  c *= vec3(1.02, 1.0, 0.965);

  float vig = smoothstep(1.02, 0.32, length((uv - 0.5) * vec2(uRes.x / uRes.y, 1.0)));
  c *= mix(1.0, 0.52 + 0.48 * vig, uPost);

  float korn = hash(gl_FragCoord.xy + fract(uZeit) * 137.0) - 0.5;
  c += korn * (0.045 + uTempo * 0.030) * uPost * (1.0 - hell * 0.6);

  farbe = vec4(clamp(c, 0.0, 1.0), 1.0);
}`;

  function shader(art, quelle){
    const s = gl.createShader(art);
    gl.shaderSource(s, quelle); gl.compileShader(s);
    if(!gl.getShaderParameter(s, gl.COMPILE_STATUS)){
      const log = gl.getShaderInfoLog(s);
      if(erzwingen) window.__shaderFehler = (window.__shaderFehler || []).concat(log);
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
  ["uA","uB","uRes","uBildA","uBildB","uMisch","uFahrtA","uFahrtB","uZeit","uPost","uTempo"]
    .forEach(nm => U[nm] = gl.getUniformLocation(prog, nm));
  gl.uniform1i(U.uA, 0);
  gl.uniform1i(U.uB, 1);

  const leer = gl.createVertexArray();   /* WebGL2 verlangt ein gebundenes VAO */
  gl.bindVertexArray(leer);

  /* ---------------- Texturen ---------------- */
  const n        = felder.length;
  const texturen = new Array(n).fill(null);
  const masse    = felder.map(() => [16, 9]);
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
  let dpr = maxDpr, post = 1.0, tempoGlatt = 0;
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
        if(dpr > 1){ dpr = Math.max(1, dpr - 0.5); groesse(); }
        else if(post > 0){ post = 0; }
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
        filmHolen(k);
        const w2 = filme[k];
        if(w2 && w2 !== false && w2.paused) w2.play().catch(() => {});
      } else if(v && v !== false && !v.paused){
        v.pause();
      }
    }
    filmHochladen(i);
    if(j !== i) filmHochladen(j);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texturen[i] || platzhalter);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, texturen[j] || texturen[i] || platzhalter);

    gl.uniform2f(U.uBildA, masse[i][0], masse[i][1]);
    gl.uniform2f(U.uBildB, masse[j][0], masse[j][1]);
    gl.uniform1f(U.uMisch, i === j ? 0.0 : t);
    gl.uniform1f(U.uFahrtA, t);
    gl.uniform1f(U.uFahrtB, 0.0);
    gl.uniform1f(U.uZeit, jetzt * 0.001);
    gl.uniform1f(U.uPost, post);
    /* Geschwindigkeit aus der Traegheit; geglaettet, damit das Objektiv
       nicht zuckt, sondern nachgibt. */
    const rohTempo = (window.VECOM && VECOM.bildlauf)
                   ? Math.min(Math.abs(VECOM.bildlauf().tempo) / 55, 1) : 0;
    tempoGlatt += (rohTempo - tempoGlatt) * 0.12;
    gl.uniform1f(U.uTempo, tempoGlatt);

    gl.drawArrays(gl.TRIANGLES, 0, 3);
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
    bilder: felder.map(f => { const i = f.querySelector("img"); return i ? i.naturalWidth : -1; }),
    aus, dpr, post
  });
  const warten = setInterval(() => { if(start()) clearInterval(warten); }, 120);
  setTimeout(() => clearInterval(warten), 20000);
})();

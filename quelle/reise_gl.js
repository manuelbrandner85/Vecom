/* ============================================================
   18 — Reise-Renderer (WebGL2)

   Was hier passiert und warum es keine 3D-Bibliothek braucht:
   Die Reise zeigt sechs fotografische Kapitel. Kein Modell, kein Licht,
   keine Physik — also auch kein Szenengraph. Gebraucht wird genau eines:
   zwei Texturen pro Bild, eine Kamerafahrt im Texturraum und ein
   filmischer Ausklang, den CSS nicht leisten kann.

   Deshalb: ein Vollbild-Dreieck, ein Shader, kein Fremdcode.
   Fällt irgendetwas aus — kein WebGL2, gedrosselte Bildrate,
   Bewegungsreduktion — übernimmt lautlos wieder die CSS-Fassung.
   ============================================================ */
(function reiseGL(){
  const spur   = document.querySelector(".reise__spur");
  const buehne = document.querySelector(".reise__buehne");
  const felder = Array.from(document.querySelectorAll(".reise__bild"));
  if(!spur || !buehne || felder.length < 2) return;
  if(matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const leinwand = document.createElement("canvas");
  leinwand.className = "reise__gl";
  leinwand.setAttribute("aria-hidden", "true");
  const gl = leinwand.getContext("webgl2", {
    alpha: false, antialias: false, depth: false, stencil: false,
    powerPreference: "high-performance", preserveDrawingBuffer: false
  });
  if(!gl) return;   /* Kein WebGL2: die CSS-Fassung bleibt einfach stehen */

  /* Software-Rasterizer erkennen. Ein Shader, den die CPU zeichnet, ist
     langsamer als jede CSS-Lösung — dann gar nicht erst anfangen. */
  const info = gl.getExtension("WEBGL_debug_renderer_info");
  const karte = (info ? gl.getParameter(info.UNMASKED_RENDERER_WEBGL)
                      : gl.getParameter(gl.RENDERER)) || "";
  if(/swiftshader|llvmpipe|software|basic render|microsoft basic/i.test(karte)) return;
  /* Sehr kleine Geräte bekommen die ruhige Fassung */
  if(innerWidth < 700) return;

  /* ---------- Shader ---------- */
  const VERT = `#version 300 es
  void main(){
    /* Ein Dreieck deckt den Bildschirm ab — günstiger als zwei */
    vec2 p = vec2((gl_VertexID << 1) & 2, gl_VertexID & 2);
    gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
  }`;

  const FRAG = `#version 300 es
  precision highp float;
  out vec4 farbe;

  uniform sampler2D uA, uB;
  uniform vec2  uRes;          /* Zeichenfläche in Pixeln            */
  uniform vec2  uBildA, uBildB;/* Seitenverhältnisse der Texturen    */
  uniform float uMisch;        /* 0..1 Übergang von A nach B         */
  uniform float uFahrtA, uFahrtB; /* Kamerafortschritt je Kapitel    */
  uniform float uZeit;
  uniform float uPost;         /* 0 = nur Bild, 1 = voller Ausklang  */

  /* --- Rauschen für Auflösung und Korn --- */
  /* Streuung ohne Sinus: bei großen Bildkoordinaten erzeugt sin() auf vielen
     Grafiktreibern senkrechte Streifen statt Rauschen. */
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

  /* Bild einpassen wie object-fit: cover, plus Kamerafahrt */
  vec2 kamera(vec2 uv, vec2 bild, float fahrt){
    float za = uRes.x / uRes.y;
    vec2 s = za > bild.x / bild.y
           ? vec2(1.0, (bild.y / bild.x) * za)
           : vec2((bild.x / bild.y) / za, 1.0);
    uv = (uv - 0.5) / s + 0.5;
    /* Heranfahren und leichter Versatz — die Bewegung einer echten Kamera */
    float z = 1.14 - fahrt * 0.14;
    vec2  v = vec2((fahrt - 0.5) * 0.018, (fahrt - 0.5) * -0.032);
    return (uv - 0.5) * z + 0.5 + v;
  }

  vec3 hole(sampler2D t, vec2 uv, vec2 bild, float fahrt, float ab){
    vec2 p = kamera(uv, bild, fahrt);
    /* Farbquerfehler: nur am Rand, wie bei einem echten Objektiv */
    float r = length(uv - 0.5);
    vec2 d = normalize(uv - 0.5 + 1e-6) * (r * r) * ab;
    vec3 c;
    c.r = texture(t, clamp(p + d, 0.0, 1.0)).r;
    c.g = texture(t, clamp(p,     0.0, 1.0)).g;
    c.b = texture(t, clamp(p - d, 0.0, 1.0)).b;
    return c;
  }

  void main(){
    vec2 uv = gl_FragCoord.xy / uRes;
    uv.y = 1.0 - uv.y;

    /* Tonnenverzeichnung, sehr sanft */
    vec2 m = uv - 0.5;
    uv = 0.5 + m * (1.0 + 0.055 * dot(m, m) * uPost);

    float ab = 0.0035 * uPost;
    vec3 a = hole(uA, uv, uBildA, uFahrtA, ab);
    /* Die zweite Textur nur anfassen, wenn sie sichtbar wird */
    vec3 b = uMisch > 0.001 ? hole(uB, uv, uBildB, uFahrtB, ab) : a;

    /* Auflösung statt Blende: eine Rauschschwelle wandert durchs Bild.
       Das ist der Schnitt, den eine CSS-Überblendung nicht kann. */
    float n = fbm(uv * 3.2 + vec2(0.0, uZeit * 0.02));
    float kante = smoothstep(0.0, 1.0, (uMisch * 1.34 - 0.17) * 1.0);
    float w = smoothstep(kante - 0.16, kante + 0.16, 1.0 - (uv.y * 0.55 + n * 0.45));
    vec3 c = mix(a, b, clamp(w, 0.0, 1.0));

    /* Lichthof: helle Stellen strahlen in die Umgebung ab */
    float hell = smoothstep(0.62, 1.0, dot(c, vec3(0.2126, 0.7152, 0.0722)));
    c += vec3(1.0, 0.86, 0.62) * hell * 0.16 * uPost;

    /* Abstimmung: warme Lichter, kühle Schatten, leichte Anhebung */
    c = pow(max(c, 0.0), vec3(0.98, 1.0, 1.045));
    c = mix(vec3(dot(c, vec3(0.2126, 0.7152, 0.0722))), c, 1.07);
    c *= vec3(1.02, 1.0, 0.965);

    /* Randabdunklung */
    float vig = smoothstep(1.02, 0.32, length((uv - 0.5) * vec2(uRes.x / uRes.y, 1.0)));
    c *= mix(1.0, 0.52 + 0.48 * vig, uPost);

    /* Korn, an die Helligkeit gekoppelt — in Lichtern feiner als in Schatten */
    float korn = (hash(gl_FragCoord.xy + fract(uZeit) * 137.0) - 0.5);
    c += korn * 0.045 * uPost * (1.0 - hell * 0.6);

    farbe = vec4(clamp(c, 0.0, 1.0), 1.0);
  }`;

  function baue(art, quelle){
    const s = gl.createShader(art);
    gl.shaderSource(s, quelle); gl.compileShader(s);
    if(!gl.getShaderParameter(s, gl.COMPILE_STATUS)){
      console.warn("Shader:", gl.getShaderInfoLog(s)); return null;
    }
    return s;
  }
  const vs = baue(gl.VERTEX_SHADER, VERT), fs = baue(gl.FRAGMENT_SHADER, FRAG);
  if(!vs || !fs) return;
  const prog = gl.createProgram();
  gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog);
  if(!gl.getProgramParameter(prog, gl.LINK_STATUS)){
    console.warn("Programm:", gl.getProgramInfoLog(prog)); return;
  }
  gl.useProgram(prog);

  const u = {};
  ["uA","uB","uRes","uBildA","uBildB","uMisch","uFahrtA","uFahrtB","uZeit","uPost"]
    .forEach(n => u[n] = gl.getUniformLocation(prog, n));
  gl.uniform1i(u.uA, 0); gl.uniform1i(u.uB, 1);

  /* ---------- Texturen ---------- */
  const texturen = felder.map(() => null);
  const masse    = felder.map(() => [16, 9]);
  const platzhalter = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, platzhalter);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
                new Uint8Array([32, 38, 10, 255]));

  function hochladen(i){
    const bild = felder[i].querySelector("img");
    if(!bild || !bild.complete || !bild.naturalWidth || texturen[i]) return;
    const t = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, t);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, bild);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.generateMipmap(gl.TEXTURE_2D);
    texturen[i] = t;
    masse[i] = [bild.naturalWidth, bild.naturalHeight];
  }
  felder.forEach((f, i) => {
    const bild = f.querySelector("img");
    if(!bild) return;
    if(bild.complete && bild.naturalWidth) hochladen(i);
    else bild.addEventListener("load", () => hochladen(i), {once:true});
  });

  /* ---------- Adaptive Qualität ---------- */
  const grenzeDpr = Math.min(devicePixelRatio || 1, 2);
  let dpr = grenzeDpr;
  let post = 1.0;
  let fenster = 0, bilder = 0, gut = 0, aus = false;

  function groesse(){
    const b = buehne.getBoundingClientRect();
    const w = Math.max(1, Math.round(b.width  * dpr));
    const h = Math.max(1, Math.round(b.height * dpr));
    if(leinwand.width !== w || leinwand.height !== h){
      leinwand.width = w; leinwand.height = h;
      gl.viewport(0, 0, w, h);
      gl.uniform2f(u.uRes, w, h);
    }
  }

  /* ---------- Zeichnen ---------- */
  const n = felder.length;
  let letzte = performance.now();

  function zeichnen(jetzt){
    if(aus) return;
    requestAnimationFrame(zeichnen);

    const r = spur.getBoundingClientRect();
    if(r.bottom < -100 || r.top > innerHeight + 100) { letzte = jetzt; return; }

    /* Bildrate über ein Zeitfenster mitteln — nicht über eine Bildzahl.
       Bei 2 fps wären 45 Bilder zwanzig Sekunden, das merkt jeder. */
    const dt = jetzt - letzte; letzte = jetzt;
    fenster += dt; bilder++;
    if(fenster > 800){
      const mittel = fenster / bilder;
      fenster = 0; bilder = 0;
      if(mittel > 26){
        if(dpr > 1)      { dpr = Math.max(1, dpr - 0.5); groesse(); }
        else if(post > 0){ post = 0; }
        else             { abschalten(); return; }
      } else if(mittel < 15){
        gut++;
        if(gut > 6 && dpr < grenzeDpr){ gut = 0; dpr = grenzeDpr; groesse(); }
      }
    }

    groesse();

    const weg = r.height - innerHeight;
    const p   = weg > 0 ? Math.min(Math.max(-r.top / weg, 0), 1) : 0;
    const roh = p * n;
    const i   = Math.min(Math.floor(roh), n - 1);
    const j   = Math.min(i + 1, n - 1);
    const t   = Math.min(Math.max(roh - i, 0), 1);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texturen[i] || platzhalter);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, texturen[j] || texturen[i] || platzhalter);

    gl.uniform2f(u.uBildA, masse[i][0], masse[i][1]);
    gl.uniform2f(u.uBildB, masse[j][0], masse[j][1]);
    gl.uniform1f(u.uMisch, i === j ? 0.0 : t);
    gl.uniform1f(u.uFahrtA, t);
    gl.uniform1f(u.uFahrtB, Math.max(t - 1.0, 0.0) + t * 0.0);
    gl.uniform1f(u.uZeit, jetzt * 0.001);
    gl.uniform1f(u.uPost, post);

    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  function abschalten(){
    aus = true;
    leinwand.remove();
    buehne.classList.remove("gl-an");
  }

  /* Erst starten, wenn wenigstens das erste Bild steht */
  function start(){
    if(!texturen[0]) return false;
    buehne.insertBefore(leinwand, buehne.firstChild);
    buehne.classList.add("gl-an");
    groesse();
    addEventListener("resize", groesse);
    document.addEventListener("visibilitychange", () => {
      if(!document.hidden && !aus){ letzte = performance.now(); }
    });
    requestAnimationFrame(zeichnen);
    return true;
  }
  const wartet = setInterval(() => { if(start()) clearInterval(wartet); }, 120);
  setTimeout(() => clearInterval(wartet), 15000);
})();

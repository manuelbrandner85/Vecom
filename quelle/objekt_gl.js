/* ============================================================
   19 — Objektrenderer (WebGL2)

   Ein einzelnes Erzeugnis als echte Geometrie: drehbar, beleuchtet,
   mit Glasanmutung. Kein Three.js — dessen Szenengraph, Loader-Zoo
   und Materialsystem kosten über 600 KB und lösen Probleme, die hier
   nicht existieren. Gebraucht wird: ein Mesh, ein Material, drei
   Lichter, eine Kamera. Das sind rund 200 Zeilen.

   Der GLB-Lader liest genau das, was dieses Modell enthält:
   POSITION, NORMAL, TEXCOORD_0, Indizes und eine Basisfarbtextur.

   Zwei Dinge nimmt er zusätzlich in Kauf, weil beide sonst still
   danebengehen:

   Quantisierte Attribute. Position und Normale liegen als int16
   vor, Texturkoordinaten als uint16 — das spart ein gutes Viertel
   der Datei. Die glTF-Komponententypen sind zufällig genau die
   GL-Konstanten, die Grafikkarte rechnet normalisierte Ganzzahlen
   also von sich aus zurück. Nur die Position wird auf der CPU
   entpackt, weil sie für die Einpassung ohnehin gebraucht wird.

   Fehlende Normalen. Ohne sie rechnet der Shader normalize(vec3(0)),
   sämtliche Lichtterme fallen auf null und das Erzeugnis steht
   flach im Bild — ein Fehler, der nicht kracht, sondern bloß
   schlecht aussieht. Fehlen sie, werden sie hier erzeugt.
   ============================================================ */
(function objektRenderer(){
  const halter = document.querySelector("[data-objekt]");
  if(!halter) return;
  if(matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const erzwingen = /[?&]renderer=erzwingen/.test(location.search);
  const quelle = halter.dataset.objekt;
  if(!quelle) return;

  const leinwand = document.createElement("canvas");
  leinwand.className = "objekt__gl";
  const gl = leinwand.getContext("webgl2", {alpha:true, antialias:true, depth:true,
                                            premultipliedAlpha:false, powerPreference:"high-performance"});
  if(!gl) return;
  /* Das Einzelobjekt bleibt der vollen Stufe vorbehalten: es ist ein
     Download von rund einem Megabyte und ein zweiter GL-Kontext auf
     derselben Seite. Auf dem Telefon traegt die Reise die Inszenierung. */
  const geraet = (window.VECOM && VECOM.geraet) ? VECOM.geraet() : {stufe:"hoch", dpr:2};
  if(geraet.stufe !== "hoch") return;

  /* ---------------- Matrizen ---------------- */
  const M = {
    eins: () => new Float32Array([1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1]),
    mal(a, b){
      const r = new Float32Array(16);
      for(let i=0;i<4;i++) for(let j=0;j<4;j++){
        let s=0; for(let k=0;k<4;k++) s += a[k*4+j] * b[i*4+k];
        r[i*4+j] = s;
      }
      return r;
    },
    perspektive(fov, seite, nah, fern){
      const f = 1/Math.tan(fov/2), d = nah - fern;
      return new Float32Array([f/seite,0,0,0, 0,f,0,0, 0,0,(fern+nah)/d,-1, 0,0,2*fern*nah/d,0]);
    },
    schieben(x,y,z){ const m=M.eins(); m[12]=x; m[13]=y; m[14]=z; return m; },
    drehY(w){ const c=Math.cos(w), s=Math.sin(w); const m=M.eins(); m[0]=c; m[2]=-s; m[8]=s; m[10]=c; return m; },
    drehX(w){ const c=Math.cos(w), s=Math.sin(w); const m=M.eins(); m[5]=c; m[6]=s; m[9]=-s; m[10]=c; return m; },
    normal(m){
      /* Für reine Drehung und gleichmäßige Skalierung genügt der obere 3×3-Block */
      return new Float32Array([m[0],m[1],m[2], m[4],m[5],m[6], m[8],m[9],m[10]]);
    }
  };

  /* ---------------- GLB lesen ---------------- */
  async function glbLaden(url){
    const puffer = await (await fetch(url)).arrayBuffer();
    const sicht = new DataView(puffer);
    if(sicht.getUint32(0, true) !== 0x46546C67) throw new Error("kein GLB");
    let ort = 12, json = null, bin = null;
    while(ort < puffer.byteLength){
      const laenge = sicht.getUint32(ort, true);
      const art    = sicht.getUint32(ort + 4, true);
      const daten  = puffer.slice(ort + 8, ort + 8 + laenge);
      if(art === 0x4E4F534A) json = JSON.parse(new TextDecoder().decode(daten));
      else if(art === 0x004E4942) bin = daten;
      ort += 8 + laenge + ((4 - (laenge % 4)) % 4);
    }
    if(!json || !bin) throw new Error("GLB unvollständig");

    const TYP = {5120:Int8Array, 5121:Uint8Array, 5122:Int16Array,
                 5123:Uint16Array, 5125:Uint32Array, 5126:Float32Array};
    const ANZ = {SCALAR:1, VEC2:2, VEC3:3, VEC4:4};

    /* Ein Attribut samt Typ — der Typ entscheidet später, wie die
       Grafikkarte die Zahlen zu lesen hat. */
    function lesen(nr){
      const a = json.accessors[nr];
      const s = json.bufferViews[a.bufferView];
      const T = TYP[a.componentType], n = ANZ[a.type];
      const versatz = (s.byteOffset || 0) + (a.byteOffset || 0);
      return {feld: new T(bin, versatz, a.count * n),
              typ: a.componentType, norm: !!a.normalized};
    }

    /* Ganzzahlen auf Fließkomma zurückrechnen, so wie es die Norm
       für normalisierte Zugriffe vorschreibt. */
    function entpacken(z){
      if(z.typ === 5126) return z.feld;
      const grenze = {5120:127, 5121:255, 5122:32767, 5123:65535}[z.typ] || 1;
      const f = new Float32Array(z.feld.length);
      for(let i = 0; i < f.length; i++)
        f[i] = z.norm ? Math.max(z.feld[i] / grenze, -1) : z.feld[i];
      return f;
    }

    /* Flächengewichtete Normalen, gemittelt über gleiche Positionen.
       Das Kreuzprodukt ist bereits proportional zur Dreiecksfläche —
       große Dreiecke wiegen dadurch von selbst schwerer. Gemittelt
       wird über die Position, nicht über die Ecke: sonst zöge sich
       die Naht der Texturkoordinaten als Kante durchs Bild. */
    function normalenRechnen(p, idx){
      const anzahl = p.length / 3;
      const topf = new Map(), zu = new Int32Array(anzahl);
      for(let i = 0; i < anzahl; i++){
        const k = p[3*i] + "," + p[3*i+1] + "," + p[3*i+2];
        let g = topf.get(k);
        if(g === undefined){ g = topf.size; topf.set(k, g); }
        zu[i] = g;
      }
      const summe = new Float32Array(topf.size * 3);
      /* Ohne Indexpuffer bilden je drei aufeinanderfolgende Ecken ein Dreieck */
      const ecken = idx ? idx.length : anzahl;
      const holen = idx ? (t => idx[t]) : (t => t);
      for(let t = 0; t + 2 < ecken; t += 3){
        const a = holen(t), b = holen(t+1), c = holen(t+2);
        const ux = p[3*b] - p[3*a], uy = p[3*b+1] - p[3*a+1], uz = p[3*b+2] - p[3*a+2];
        const vx = p[3*c] - p[3*a], vy = p[3*c+1] - p[3*a+1], vz = p[3*c+2] - p[3*a+2];
        const nx = uy*vz - uz*vy, ny = uz*vx - ux*vz, nz = ux*vy - uy*vx;
        for(const ecke of [a, b, c]){
          const g = zu[ecke] * 3;
          summe[g] += nx; summe[g+1] += ny; summe[g+2] += nz;
        }
      }
      const f = new Float32Array(anzahl * 3);
      for(let i = 0; i < anzahl; i++){
        const g = zu[i] * 3;
        const x = summe[g], y = summe[g+1], z = summe[g+2];
        const l = Math.hypot(x, y, z);
        if(l < 1e-12) f[3*i+1] = 1;          /* entartet: nach oben, statt NaN */
        else { f[3*i] = x/l; f[3*i+1] = y/l; f[3*i+2] = z/l; }
      }
      return f;
    }

    /* Erstes Mesh mit Dreiecken genügt — das Modell hat genau eines */
    const prim = json.meshes[0].primitives[0];
    const pos  = entpacken(lesen(prim.attributes.POSITION));
    const idx  = prim.indices !== undefined ? lesen(prim.indices).feld : null;
    const nrm  = prim.attributes.NORMAL !== undefined
               ? lesen(prim.attributes.NORMAL)
               : {feld: normalenRechnen(pos, idx), typ: 5126, norm: false};
    const uv   = prim.attributes.TEXCOORD_0 !== undefined
               ? lesen(prim.attributes.TEXCOORD_0)
               : {feld: new Float32Array(pos.length / 3 * 2), typ: 5126, norm: false};

    /* Basisfarbtextur, falls vorhanden */
    let bild = null;
    const mat = prim.material !== undefined ? json.materials[prim.material] : null;
    const tex = mat && mat.pbrMetallicRoughness && mat.pbrMetallicRoughness.baseColorTexture;
    if(tex){
      const q = json.images[json.textures[tex.index].source];
      if(q.bufferView !== undefined){
        const s = json.bufferViews[q.bufferView];
        const blob = new Blob([bin.slice(s.byteOffset || 0, (s.byteOffset || 0) + s.byteLength)],
                              {type: q.mimeType || "image/png"});
        bild = await createImageBitmap(blob);
      }
    }
    return {pos, nrm, uv, idx, bild};
  }

  /* ---------------- Shader ---------------- */
  const VERT = `#version 300 es
layout(location=0) in vec3 aPos;
layout(location=1) in vec3 aNrm;
layout(location=2) in vec2 aUV;
uniform mat4 uModell, uSicht, uProj;
uniform mat3 uNrmM;
out vec3 vNrm, vPos;
out vec2 vUV;
void main(){
  vec4 welt = uModell * vec4(aPos, 1.0);
  vPos = welt.xyz;
  vNrm = normalize(uNrmM * aNrm);
  vUV  = aUV;
  gl_Position = uProj * uSicht * welt;
}`;

  const FRAG = `#version 300 es
precision highp float;
in vec3 vNrm, vPos;
in vec2 vUV;
out vec4 farbe;
uniform sampler2D uTex;
uniform float uHatTex, uZeit;

void main(){
  vec3 n = normalize(vNrm);
  vec3 blick = normalize(-vPos);

  /* Drei Lichter: Führung warm von links oben, Aufheller kühl von rechts,
     Kante von hinten — das klassische Produktlicht. */
  vec3 l1 = normalize(vec3(-0.6, 0.8, 0.7));
  vec3 l2 = normalize(vec3( 0.9, 0.2, 0.5));
  vec3 l3 = normalize(vec3( 0.1,-0.4,-1.0));

  vec3 grund = uHatTex > 0.5 ? texture(uTex, vUV).rgb : vec3(0.42, 0.46, 0.24);

  float d1 = max(dot(n, l1), 0.0);
  float d2 = max(dot(n, l2), 0.0);
  float kante = pow(1.0 - max(dot(n, blick), 0.0), 2.2);

  vec3 c = grund * (0.22 + 1.05 * d1 * vec3(1.0, 0.94, 0.82)
                         + 0.30 * d2 * vec3(0.78, 0.86, 1.0));

  /* Glanzlichter */
  vec3 h1 = normalize(l1 + blick);
  vec3 h2 = normalize(l2 + blick);
  c += vec3(1.0, 0.96, 0.86) * pow(max(dot(n, h1), 0.0), 96.0) * 0.9;
  c += vec3(0.85, 0.92, 1.0) * pow(max(dot(n, h2), 0.0), 48.0) * 0.35;

  /* Kantenlicht von hinten — trennt das Glas vom dunklen Grund */
  c += vec3(1.0, 0.88, 0.62) * kante * max(dot(n, l3), 0.0) * 0.85;
  c += vec3(0.95, 0.86, 0.66) * kante * 0.16;

  c = pow(max(c, 0.0), vec3(0.95, 0.97, 1.02));
  farbe = vec4(c, 1.0);
}`;

  function shader(art, q){
    const s = gl.createShader(art);
    gl.shaderSource(s, q); gl.compileShader(s);
    if(!gl.getShaderParameter(s, gl.COMPILE_STATUS)){
      if(erzwingen) window.__objektFehler = gl.getShaderInfoLog(s);
      return null;
    }
    return s;
  }

  let prog, U, vao, anzahl, art, textur = null, hatTex = 0;
  let dreh = 0.6, ziel = 0.6, neig = 0.06, zielNeig = 0.06;
  let aus = false, zieht = false, letzterX = 0, letzterY = 0, angefasst = false;

  function bauen(daten){
    const vs = shader(gl.VERTEX_SHADER, VERT), fs = shader(gl.FRAGMENT_SHADER, FRAG);
    if(!vs || !fs) return false;
    prog = gl.createProgram();
    gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog);
    if(!gl.getProgramParameter(prog, gl.LINK_STATUS)){
      if(erzwingen) window.__objektFehler = gl.getProgramInfoLog(prog);
      return false;
    }
    gl.useProgram(prog);
    U = {};
    ["uModell","uSicht","uProj","uNrmM","uTex","uHatTex","uZeit"]
      .forEach(n => U[n] = gl.getUniformLocation(prog, n));

    /* Mittelpunkt und Größe normieren, damit jedes Modell gleich sitzt */
    const p = daten.pos;
    let mi = [1e9,1e9,1e9], ma = [-1e9,-1e9,-1e9];
    for(let i = 0; i < p.length; i += 3)
      for(let k = 0; k < 3; k++){
        if(p[i+k] < mi[k]) mi[k] = p[i+k];
        if(p[i+k] > ma[k]) ma[k] = p[i+k];
      }
    const mitte = mi.map((v,k) => (v + ma[k]) / 2);
    const spanne = Math.max(ma[0]-mi[0], ma[1]-mi[1], ma[2]-mi[2]) || 1;
    const s = 1.75 / spanne;
    for(let i = 0; i < p.length; i += 3)
      for(let k = 0; k < 3; k++) p[i+k] = (p[i+k] - mitte[k]) * s;

    vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    /* Die glTF-Komponententypen sind genau die GL-Konstanten; normalisierte
       Ganzzahlen rechnet die Grafikkarte beim Lesen selbst zurück. */
    const puffer = (z, ort, groesse) => {
      const b = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, b);
      gl.bufferData(gl.ARRAY_BUFFER, z.feld, gl.STATIC_DRAW);
      gl.enableVertexAttribArray(ort);
      gl.vertexAttribPointer(ort, groesse, z.typ, z.norm, 0, 0);
    };
    puffer({feld: p, typ: gl.FLOAT, norm: false}, 0, 3);
    puffer(daten.nrm, 1, 3);
    puffer(daten.uv,  2, 2);

    if(daten.idx){
      const ib = gl.createBuffer();
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ib);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, daten.idx, gl.STATIC_DRAW);
      anzahl = daten.idx.length;
      art = daten.idx.BYTES_PER_ELEMENT === 4 ? gl.UNSIGNED_INT : gl.UNSIGNED_SHORT;
    } else {
      anzahl = p.length / 3; art = null;
    }
    gl.bindVertexArray(null);

    if(daten.bild){
      textur = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, textur);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, daten.bild);
      gl.generateMipmap(gl.TEXTURE_2D);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      hatTex = 1;
    }
    return true;
  }

  function groesse(){
    const r = halter.getBoundingClientRect();
    const dpr = Math.min(devicePixelRatio || 1, 2);
    const w = Math.max(1, Math.round(r.width * dpr));
    const h = Math.max(1, Math.round(r.height * dpr));
    if(leinwand.width !== w || leinwand.height !== h){
      leinwand.width = w; leinwand.height = h;
      gl.viewport(0, 0, w, h);
    }
  }

  let fenster = 0, bilder = 0;
  let letzte = performance.now();

  function zeichnen(jetzt){
    if(aus) return;
    requestAnimationFrame(zeichnen);
    const r = halter.getBoundingClientRect();
    if(r.bottom < 0 || r.top > innerHeight){ letzte = jetzt; return; }

    const dt = jetzt - letzte; letzte = jetzt;
    fenster += dt; bilder++;
    if(fenster > 900){
      const mittel = fenster / bilder; fenster = 0; bilder = 0;
      if(mittel > 30){ aus = true; leinwand.remove(); halter.classList.remove("objekt-an"); return; }
    }

    groesse();
    if(!angefasst) ziel += 0.0032;            /* leises Eigendrehen */
    dreh += (ziel - dreh) * 0.09;             /* Nachlauf, kein hartes Folgen */
    neig += (zielNeig - neig) * 0.09;

    gl.enable(gl.DEPTH_TEST);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.useProgram(prog);

    const modell = M.mal(M.drehY(dreh), M.drehX(neig));
    const sicht  = M.schieben(0, 0, -4.2);
    const proj   = M.perspektive(0.62, leinwand.width / leinwand.height, 0.1, 40);

    gl.uniformMatrix4fv(U.uModell, false, modell);
    gl.uniformMatrix4fv(U.uSicht,  false, sicht);
    gl.uniformMatrix4fv(U.uProj,   false, proj);
    gl.uniformMatrix3fv(U.uNrmM,   false, M.normal(modell));
    gl.uniform1f(U.uZeit, jetzt * 0.001);
    gl.uniform1f(U.uHatTex, hatTex);
    if(textur){ gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, textur); gl.uniform1i(U.uTex, 0); }

    gl.bindVertexArray(vao);
    if(art) gl.drawElements(gl.TRIANGLES, anzahl, art, 0);
    else    gl.drawArrays(gl.TRIANGLES, 0, anzahl);
    gl.bindVertexArray(null);
  }

  /* Ziehen mit Maus, Finger und Tastatur */
  function binden(){
    leinwand.addEventListener("pointerdown", e => {
      zieht = true; angefasst = true; letzterX = e.clientX; letzterY = e.clientY;
      leinwand.setPointerCapture(e.pointerId);
    });
    leinwand.addEventListener("pointermove", e => {
      if(!zieht) return;
      ziel     += (e.clientX - letzterX) * 0.008;
      zielNeig  = Math.max(-0.5, Math.min(0.5, zielNeig + (e.clientY - letzterY) * 0.004));
      letzterX = e.clientX; letzterY = e.clientY;
    });
    ["pointerup","pointercancel","pointerleave"].forEach(n =>
      leinwand.addEventListener(n, () => { zieht = false; }));
    halter.addEventListener("keydown", e => {
      if(e.key === "ArrowLeft"){ ziel -= 0.25; angefasst = true; e.preventDefault(); }
      if(e.key === "ArrowRight"){ ziel += 0.25; angefasst = true; e.preventDefault(); }
    });
  }

  /* Erst laden, wenn das Objekt in Sichtweite kommt */
  new IntersectionObserver((es, beob) => {
    es.forEach(async e => {
      if(!e.isIntersecting) return;
      beob.disconnect();
      try{
        const daten = await glbLaden(quelle);
        if(!bauen(daten)) return;
        halter.insertBefore(leinwand, halter.firstChild);
        halter.classList.add("objekt-an");
        halter.setAttribute("tabindex", "0");
        halter.setAttribute("role", "img");
        binden();
        groesse();
        addEventListener("resize", groesse);
        requestAnimationFrame(zeichnen);
        if(erzwingen) window.__objektStand = () => ({dreiecke: anzahl / 3, textur: !!textur, aus});
      }catch(f){
        if(erzwingen) window.__objektFehler = String(f);
      }
    });
  }, {rootMargin: "600px 0px"}).observe(halter);
})();

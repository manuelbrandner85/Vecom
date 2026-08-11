#!/usr/bin/env python3
"""
============================================================
Modell-Werkstatt — GLB fuer die Auslieferung herrichten

Der Objektrenderer bekommt genau eine Datei, also muss genau
diese Datei stimmen. Das Werkzeug macht drei Dinge:

  1. NORMALEN ERGAENZEN
     Ohne Normalen ist jede Beleuchtung wirkungslos: der Shader
     rechnet normalize(vec3(0)) und alle Lichtterme fallen auf
     null. Das Erzeugnis steht dann flach im Bild wie ein
     Aufkleber. Erzeugt werden flaechengewichtete Normalen,
     gemittelt ueber gleiche Positionen — die Naht der
     Texturkoordinaten darf in der Schattierung nicht auftauchen.

  2. ATTRIBUTE QUANTISIEREN  (KHR_mesh_quantization)
     Position und Normale als int16, Texturkoordinaten als
     uint16. Halbiert den Anteil der Geometrie, ohne dass man
     es sieht: 16 Bit ueber die Ausdehnung des Modells sind
     rund drei Hundertstel Promille davon.

  3. INDIZES VERKLEINERN
     uint32 lohnt erst ab 65536 Ecken. Darunter ist die Haelfte
     der Indexdaten Verpackung.

  4. TEXTUR ERSETZEN  (optional)
     Erzeugte Netze bringen oft eine 2048er Textur mit, die mehr
     wiegt als die ganze uebrige Datei. Mit --textur wird eine
     kleinere eingesetzt; verkleinert wird ausserhalb, hier wird
     nur getauscht.

Der Wiederhersteller-Knoten bekommt Massstab und Verschiebung
zurueck, damit die Datei in jedem normgerechten Betrachter
weiterhin in Originalgroesse steht — nicht nur in unserem
eigenen Lader.

Aufruf:
    python3 quelle/modell.py assets/modelle/pistacchio.glb
    python3 quelle/modell.py modell.glb --textur klein.jpg
============================================================
"""

import json
import struct
import sys
from pathlib import Path

JSON_CHUNK = 0x4E4F534A
BIN_CHUNK = 0x004E4942

COMPONENT = {5120: "b", 5121: "B", 5122: "h", 5123: "H", 5125: "I", 5126: "f"}
COUNT = {"SCALAR": 1, "VEC2": 2, "VEC3": 3, "VEC4": 4}


# ---------------------------------------------------------------- lesen


def glb_lesen(pfad):
    roh = Path(pfad).read_bytes()
    if struct.unpack_from("<I", roh, 0)[0] != 0x46546C67:
        raise SystemExit(f"{pfad}: kein GLB")
    ort, js, binaer = 12, None, None
    while ort < len(roh):
        laenge, art = struct.unpack_from("<II", roh, ort)
        stueck = roh[ort + 8: ort + 8 + laenge]
        if art == JSON_CHUNK:
            js = json.loads(stueck)
        elif art == BIN_CHUNK:
            binaer = stueck
        ort += 8 + laenge + ((4 - (laenge % 4)) % 4)
    if js is None or binaer is None:
        raise SystemExit(f"{pfad}: GLB unvollstaendig")
    return js, binaer


def zugriff(js, binaer, nr):
    a = js["accessors"][nr]
    bv = js["bufferViews"][a["bufferView"]]
    ort = bv.get("byteOffset", 0) + a.get("byteOffset", 0)
    n = COUNT[a["type"]] * a["count"]
    return list(struct.unpack_from(f"<{n}{COMPONENT[a['componentType']]}", binaer, ort))


# ---------------------------------------------------------------- normalen


def normalen_rechnen(pos, idx):
    """Flaechengewichtete Normalen, gemittelt ueber identische Positionen.

    Das Kreuzprodukt zweier Kantenvektoren ist bereits proportional zur
    Dreiecksflaeche — grosse Dreiecke wiegen dadurch von selbst schwerer,
    ohne dass irgendetwas normiert werden muesste.
    """
    anzahl = len(pos) // 3

    # Ecken, die auf derselben Stelle liegen, teilen sich eine Normale.
    # Sonst zieht sich die Naht der Texturkoordinaten als Kante durchs Bild.
    gruppe = {}
    zu_gruppe = [0] * anzahl
    for i in range(anzahl):
        schluessel = (pos[3 * i], pos[3 * i + 1], pos[3 * i + 2])
        if schluessel not in gruppe:
            gruppe[schluessel] = len(gruppe)
        zu_gruppe[i] = gruppe[schluessel]

    summe = [0.0] * (len(gruppe) * 3)
    for t in range(0, len(idx), 3):
        a, b, c = idx[t], idx[t + 1], idx[t + 2]
        ax, ay, az = pos[3 * a], pos[3 * a + 1], pos[3 * a + 2]
        bx, by, bz = pos[3 * b], pos[3 * b + 1], pos[3 * b + 2]
        cx, cy, cz = pos[3 * c], pos[3 * c + 1], pos[3 * c + 2]
        ux, uy, uz = bx - ax, by - ay, bz - az
        vx, vy, vz = cx - ax, cy - ay, cz - az
        nx = uy * vz - uz * vy
        ny = uz * vx - ux * vz
        nz = ux * vy - uy * vx
        for ecke in (a, b, c):
            g = zu_gruppe[ecke] * 3
            summe[g] += nx
            summe[g + 1] += ny
            summe[g + 2] += nz

    nrm = [0.0] * (anzahl * 3)
    for i in range(anzahl):
        g = zu_gruppe[i] * 3
        x, y, z = summe[g], summe[g + 1], summe[g + 2]
        laenge = (x * x + y * y + z * z) ** 0.5
        if laenge < 1e-12:
            nrm[3 * i + 1] = 1.0          # entartet: nach oben, statt NaN
        else:
            nrm[3 * i] = x / laenge
            nrm[3 * i + 1] = y / laenge
            nrm[3 * i + 2] = z / laenge
    return nrm


def nach_aussen(pos, nrm):
    """Zeigen die Normalen nach aussen? Sonst ist die Wicklung verdreht."""
    mitte = [sum(pos[k::3]) / (len(pos) / 3) for k in range(3)]
    treffer = 0
    for i in range(0, len(pos) // 3, 37):          # Stichprobe genuegt
        d = sum((pos[3 * i + k] - mitte[k]) * nrm[3 * i + k] for k in range(3))
        treffer += 1 if d > 0 else -1
    return treffer > 0


# ---------------------------------------------------------------- schreiben


def quantisieren(werte, takt, tiefe, vorzeichen=True):
    """Auf ganze Zahlen abbilden; takt ist der Wert, der auf tiefe faellt.

    Mit Vorzeichen liegt das Ergebnis in [-tiefe, tiefe], sonst in [0, tiefe].
    Die Rueckrechnung im Shader ist in beiden Faellen ein Teilen durch tiefe —
    genau das, was die Norm fuer normalisierte Zugriffe vorschreibt.
    """
    unten = -tiefe if vorzeichen else 0
    return [max(unten, min(tiefe, int(round(v / takt * tiefe)))) for v in werte]


def spanne_von(werte, schritt, tiefe):
    """Kleinster und groesster Wert je Achse, bereits zurueckgerechnet."""
    achsen = range(schritt)
    return ([min(werte[k::schritt]) / tiefe for k in achsen],
            [max(werte[k::schritt]) / tiefe for k in achsen])


def glb_schreiben(pfad, js, binaer):
    js_roh = json.dumps(js, separators=(",", ":")).encode("utf-8")
    js_roh += b" " * ((4 - len(js_roh) % 4) % 4)
    bin_roh = binaer + b"\0" * ((4 - len(binaer) % 4) % 4)
    gesamt = 12 + 8 + len(js_roh) + 8 + len(bin_roh)
    with open(pfad, "wb") as f:
        f.write(struct.pack("<III", 0x46546C67, 2, gesamt))
        f.write(struct.pack("<II", len(js_roh), JSON_CHUNK))
        f.write(js_roh)
        f.write(struct.pack("<II", len(bin_roh), BIN_CHUNK))
        f.write(bin_roh)
    return gesamt


def herrichten(pfad, ersatz_textur=None):
    js, binaer = glb_lesen(pfad)
    prim = js["meshes"][0]["primitives"][0]
    attribute = prim["attributes"]

    pos = zugriff(js, binaer, attribute["POSITION"])
    idx = zugriff(js, binaer, prim["indices"])
    uv = zugriff(js, binaer, attribute["TEXCOORD_0"]) if "TEXCOORD_0" in attribute else None
    anzahl = len(pos) // 3

    if "NORMAL" in attribute:
        nrm = zugriff(js, binaer, attribute["NORMAL"])
        quelle = "vorhanden"
    else:
        nrm = normalen_rechnen(pos, idx)
        quelle = "erzeugt"
        if not nach_aussen(pos, nrm):
            nrm = [-v for v in nrm]
            quelle = "erzeugt, umgedreht"

    # --- Position auf [-1, 1] legen; der Knoten holt die Groesse zurueck ---
    mi = [min(pos[k::3]) for k in range(3)]
    ma = [max(pos[k::3]) for k in range(3)]
    mitte = [(mi[k] + ma[k]) / 2 for k in range(3)]
    spanne = max(ma[k] - mi[k] for k in range(3)) / 2 or 1.0
    mittig = [(pos[i] - mitte[i % 3]) for i in range(len(pos))]

    q_pos = quantisieren(mittig, spanne, 32767)
    q_nrm = quantisieren(nrm, 1.0, 32767)
    q_uv = quantisieren(uv, 1.0, 65535, vorzeichen=False) if uv else None
    kurz = max(idx) < 65536

    # --- neuen Binaerblock zusammensetzen ---
    ansichten, neu_bin = [], bytearray()

    def ablegen(daten, format_, ziel=None):
        while len(neu_bin) % 4:
            neu_bin.append(0)
        start = len(neu_bin)
        neu_bin.extend(struct.pack(f"<{len(daten)}{format_}", *daten))
        ansicht = {"buffer": 0, "byteOffset": start, "byteLength": len(neu_bin) - start}
        if ziel is not None:
            ansicht["target"] = ziel
        ansichten.append(ansicht)
        return len(ansichten) - 1

    i_idx = ablegen(idx, "H" if kurz else "I", 34963)
    i_pos = ablegen(q_pos, "h", 34962)
    i_nrm = ablegen(q_nrm, "h", 34962)
    i_uv = ablegen(q_uv, "H", 34962) if q_uv else None

    # Textur uebernehmen — oder gegen eine kleinere tauschen
    bild_ansicht = None
    for bild in js.get("images", []):
        if "bufferView" in bild:
            if ersatz_textur:
                roh = Path(ersatz_textur).read_bytes()
                bild["mimeType"] = ("image/png" if roh[:4] == b"\x89PNG"
                                    else "image/webp" if roh[8:12] == b"WEBP"
                                    else "image/jpeg")
            else:
                alt = js["bufferViews"][bild["bufferView"]]
                roh = binaer[alt["byteOffset"]: alt["byteOffset"] + alt["byteLength"]]
            while len(neu_bin) % 4:
                neu_bin.append(0)
            start = len(neu_bin)
            neu_bin.extend(roh)
            ansichten.append({"buffer": 0, "byteOffset": start, "byteLength": len(roh)})
            bild_ansicht = len(ansichten) - 1
            bild["bufferView"] = bild_ansicht

    p_min, p_max = spanne_von(q_pos, 3, 32767)
    zugriffe = [
        {"bufferView": i_idx, "componentType": 5123 if kurz else 5125,
         "count": len(idx), "type": "SCALAR"},
        {"bufferView": i_pos, "componentType": 5122, "normalized": True,
         "count": anzahl, "type": "VEC3", "min": p_min, "max": p_max},
        {"bufferView": i_nrm, "componentType": 5122, "normalized": True,
         "count": anzahl, "type": "VEC3"},
    ]
    neue_attribute = {"POSITION": 1, "NORMAL": 2}
    if i_uv is not None:
        zugriffe.append({"bufferView": i_uv, "componentType": 5123, "normalized": True,
                         "count": anzahl, "type": "VEC2"})
        neue_attribute["TEXCOORD_0"] = 3

    js["accessors"] = zugriffe
    js["bufferViews"] = ansichten
    js["buffers"] = [{"byteLength": len(neu_bin)}]
    prim["attributes"] = neue_attribute
    prim["indices"] = 0

    # Quantisierung rueckgaengig im Knoten — die Datei bleibt normgerecht
    knoten = js["nodes"][0]
    knoten.pop("matrix", None)
    knoten["scale"] = [spanne, spanne, spanne]
    knoten["translation"] = list(mitte)
    js["extensionsUsed"] = sorted(set(js.get("extensionsUsed", []) + ["KHR_mesh_quantization"]))
    js["extensionsRequired"] = sorted(set(js.get("extensionsRequired", []) + ["KHR_mesh_quantization"]))

    vorher = Path(pfad).stat().st_size
    nachher = glb_schreiben(pfad, js, bytes(neu_bin))

    print(f"{pfad}")
    print(f"  Ecken      {anzahl}   Dreiecke {len(idx) // 3}")
    print(f"  Normalen   {quelle}")
    print(f"  Indizes    {'uint16' if kurz else 'uint32'}")
    if ersatz_textur:
        print(f"  Textur     ersetzt durch {ersatz_textur}")
    # Vorzeichen wie eine Groessenaenderung lesen: minus heisst kleiner
    print(f"  Groesse    {vorher / 1024:.0f} KB  ->  {nachher / 1024:.0f} KB"
          f"   ({100 * (nachher - vorher) / vorher:+.0f} %)")


if __name__ == "__main__":
    argumente = sys.argv[1:]
    textur = None
    if "--textur" in argumente:
        i = argumente.index("--textur")
        textur = argumente[i + 1]
        del argumente[i:i + 2]
    for ziel in argumente or ["assets/modelle/pistacchio.glb"]:
        herrichten(ziel, textur)

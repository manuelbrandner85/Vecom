#!/usr/bin/env python3
"""
Seekarte — baut die Sizilienkarte im Stil einer Portolan-Karte neu.

Die Geometrie bleibt unangetastet: Kuestenlinie und Standorte sind echte
Geodaten und echte Koordinaten. Geaendert wird nur die Darstellung.

Vorbild sind die Portolan-Karten des 14. bis 16. Jahrhunderts: Pergament,
eine Kompassrose mit ausstrahlenden Windlinien, Kuesten als Federstrich mit
landeinwaerts gesetzter Schraffur, eine Kartusche fuer den Titel und eine
Massstabsleiste. Ortsnamen stehen in Kapitaelchen neben dem Punkt.

Aufruf:  python3 quelle/seekarte.py
"""
import pathlib, re, math, sys

WURZEL = pathlib.Path(__file__).resolve().parent.parent
sys.path.insert(0, str(WURZEL / 'quelle'))
from erzeuger import ERZEUGER

# ---------------------------------------------------------------- Projektion
LON0, LON1, LAT0, LAT1, W, PAD = 11.45, 16.15, 36.25, 39.25, 900.0, 54
K  = math.cos(math.radians((LAT0 + LAT1) / 2))
SX = (W - 2 * PAD) / ((LON1 - LON0) * K)

def prj(lo, la):
    return (PAD + (lo - LON0) * K * SX, PAD + (LAT1 - la) * SX)

def slug(s):
    ers = {'ä':'ae','ö':'oe','ü':'ue','ß':'ss','’':'','\'':'','–':'-','—':'-'}
    s = ''.join(ers.get(c, c) for c in s).lower()
    return re.sub(r'[^a-z0-9]+', '-', s).strip('-')

# ---------------------------------------------------------------- Geometrie
def geometrie_lesen():
    """Kuestenpfade aus quelle/kueste.json.

    Frueher wurden sie aus erzeuger.html gelesen — beim zweiten Lauf las das
    Skript damit sein eigenes Ergebnis, und die Nebeninseln gingen verloren.
    Geodaten gehoeren in die Quelle, nicht in erzeugtes Markup."""
    import json
    d = json.loads((WURZEL / 'quelle' / 'kueste.json').read_text(encoding='utf-8'))
    return d['haupt'], d['inseln'], d.get('echo', '')

# ---------------------------------------------------------------- Bausteine
def kompassrose(cx, cy, r):
    """Achtstrahlige Rose, wie sie auf Portolan-Karten den Ursprung der
       Windlinien markiert. Der Nordstrahl traegt eine Lilie."""
    teile = []
    for i in range(8):
        w = math.radians(i * 45)
        lang = r if i % 2 == 0 else r * 0.62
        sp = math.radians(11)
        x1, y1 = cx + math.sin(w) * lang, cy - math.cos(w) * lang
        x2, y2 = cx + math.sin(w - sp) * (lang * 0.22), cy - math.cos(w - sp) * (lang * 0.22)
        x3, y3 = cx + math.sin(w + sp) * (lang * 0.22), cy - math.cos(w + sp) * (lang * 0.22)
        fuell = '#3B2A10' if i % 2 == 0 else 'none'
        teile.append(f'<path d="M{x1:.1f},{y1:.1f} L{x2:.1f},{y2:.1f} L{cx:.1f},{cy:.1f} '
                     f'L{x3:.1f},{y3:.1f} Z" fill="{fuell}" stroke="#3B2A10" stroke-width=".7"/>')
    teile.append(f'<circle cx="{cx}" cy="{cy}" r="{r*0.30:.1f}" fill="none" stroke="#3B2A10" stroke-width=".9"/>')
    teile.append(f'<circle cx="{cx}" cy="{cy}" r="{r*0.20:.1f}" fill="none" stroke="#3B2A10" stroke-width=".6"/>')
    # Nordlilie
    ny = cy - r - 12
    teile.append(f'<path d="M{cx:.1f},{ny:.1f} l4.5,9 h-9 Z" fill="#7C4A20" stroke="#3B2A10" stroke-width=".6"/>')
    return '<g class="karte__rose" pointer-events="none">' + ''.join(teile) + '</g>'

def windlinien(cx, cy, laenge=1500):
    """Die Rhumb-Linien: 32 Strahlen, wie sie von jeder Rose ausgehen."""
    aus = []
    for i in range(32):
        w = math.radians(i * 11.25)
        x = cx + math.sin(w) * laenge
        y = cy - math.cos(w) * laenge
        stark = ".85" if i % 4 == 0 else ".45"
        deck = ".30" if i % 4 == 0 else ".17"
        aus.append(f'<path d="M{cx:.0f},{cy:.0f} L{x:.0f},{y:.0f}" stroke-width="{stark}" opacity="{deck}"/>')
    return '<g class="karte__wind" stroke="#6B4A22" fill="none" pointer-events="none">' + ''.join(aus) + '</g>'

def wellen():
    """Feine Wellenlinien im offenen Meer — Kupferstichmanier."""
    aus = []
    for r, y in enumerate(range(96, 740, 34)):
        pfad = [f'M-20,{y}']
        for x in range(-20, 940, 26):
            hoch = 3.4 if (x // 26 + r) % 2 == 0 else -3.4
            pfad.append(f'q13,{hoch} 26,0')
        aus.append(f'<path d="{" ".join(pfad)}"/>')
    return ('<g class="karte__wellen" stroke="#5B7E8C" fill="none" stroke-width=".7" opacity=".26" pointer-events="none">'
            + ''.join(aus) + '</g>')

def kartusche(x, y):
    return f'''<g class="karte__kartusche" pointer-events="none" transform="translate({x},{y})">
      <path d="M0,0 h216 l14,15 v58 l-14,15 H0 l-14,-15 V15 Z"
            fill="#EDDFBC" stroke="#5B4423" stroke-width="1.4"/>
      <path d="M6,6 h204 l9,9 v46 l-9,9 H6 l-9,-9 V15 Z"
            fill="none" stroke="#8B6B3A" stroke-width=".7"/>
      <text x="108" y="36" text-anchor="middle" class="karte__titel">SICILIA</text>
      <text x="108" y="58" text-anchor="middle" class="karte__unter">TAVOLA DEI PRODUTTORI</text>
    </g>'''

def massstab(x, y):
    """Massstabsleiste in Seemeilen, wie auf historischen Karten."""
    km100 = 100 / 111.32 * K * SX          # 100 km in Bildpunkten
    felder = []
    for i in range(4):
        fuell = '#3B2A10' if i % 2 == 0 else '#EDDFBC'
        felder.append(f'<rect x="{i*km100/2:.1f}" y="0" width="{km100/2:.1f}" height="7" '
                      f'fill="{fuell}" stroke="#3B2A10" stroke-width=".7"/>')
    return f'''<g class="karte__massstab" pointer-events="none" transform="translate({x},{y})">
      {''.join(felder)}
      <text x="0" y="20" class="karte__mass">0</text>
      <text x="{km100:.0f}" y="20" text-anchor="middle" class="karte__mass">100</text>
      <text x="{km100*2:.0f}" y="20" text-anchor="end" class="karte__mass">200 km</text>
    </g>'''

# ---------------------------------------------------------------- Karte
def karte(aktiv=None, verlinkt=False):
    haupt, inseln, echo = geometrie_lesen()
    rx, ry = 726, 168                       # Rose im Tyrrhenischen Meer

    # ---------------- Beschriftungen platzieren ----------------
    # Ein Name darf weder einen anderen Namen noch einen fremden Punkt
    # ueberdecken. Frueher wurde nur die Zeilenhoehe geprueft — dadurch lief
    # „Frantoio Sciacca“ quer ueber den Punkt von Ribera.
    punkte = {e['id']: prj(e['lon'], e['lat']) for e in ERZEUGER}
    BREITE_JE_ZEICHEN = 6.15          # Playfair kursiv bei 12.5 px
    HOEHE = 13.0

    def kasten(tx, ty, text, links):
        b = len(text) * BREITE_JE_ZEICHEN
        x0 = tx - b if links else tx
        return (x0, ty - HOEHE / 2, x0 + b, ty + HOEHE / 2)

    def stoert(k, eigene):
        x0, y0, x1, y1 = k
        for kx0, ky0, kx1, ky1 in belegt:
            if x0 < kx1 and kx0 < x1 and y0 < ky1 and ky0 < y1:
                return True
        for pid, (px, py) in punkte.items():
            if pid == eigene:
                continue
            if x0 - 6 < px < x1 + 6 and y0 - 6 < py < y1 + 6:
                return True
        return False

    belegt = []
    def platz(e):
        """Sucht eine freie Stelle: erst rechts, dann links, dann versetzt."""
        x, y = punkte[e['id']]
        name = e['name']
        for links in (x > 560, x <= 560):          # bevorzugte Seite zuerst
            for schritt in range(11):
                versatz = (schritt + 1) // 2 * 14 * (1 if schritt % 2 else -1)
                tx = x - 12 if links else x + 12
                ty = y + versatz
                k = kasten(tx, ty, name, links)
                if k[0] < 24 or k[2] > 876 or k[1] < 30 or k[3] > 700:
                    continue
                if not stoert(k, e['id']):
                    belegt.append(k)
                    return tx, ty, links
        belegt.append(kasten(x + 12, y, name, False))
        return x + 12, y, False

    orte = []
    for e in sorted(ERZEUGER, key=lambda q: prj(q['lon'], q['lat'])[1]):
        x, y = punkte[e['id']]
        ist = e['id'] == aktiv
        tx, ty, links = platz(e)
        anker = 'end' if links else 'start'
        name = e['name'].replace('&', '&amp;')
        kern = (
            f'<circle cx="{x:.0f}" cy="{y:.0f}" r="{9 if ist else 6.5:.1f}" '
            f'fill="{"#8C1C13" if ist else "#F2E6C8"}" stroke="#3B2A10" stroke-width="{1.8 if ist else 1.3}"/>'
            f'<circle cx="{x:.0f}" cy="{y:.0f}" r="{3.2 if ist else 2.0:.1f}" '
            f'fill="{"#F2E6C8" if ist else "#7C4A20"}"/>'
        )
        if ist:
            kern = (f'<circle cx="{x:.0f}" cy="{y:.0f}" r="17" fill="none" stroke="#8C1C13" '
                    f'stroke-width="1.1" opacity=".55"/>' + kern)
        fuehrung = ('' if abs(ty - y) < 3 else
                    f'<path d="M{x + (-8 if links else 8):.0f},{y:.0f} '
                    f'L{tx + (4 if links else -4):.0f},{ty:.0f}" stroke="#6B4A22" '
                    f'stroke-width=".8" fill="none" opacity=".6"/>')
        beschriftung = fuehrung + (
            f'<text x="{tx:.0f}" y="{ty+3.5:.0f}" text-anchor="{anker}" '
            f'class="karte__ort-name{" ist" if ist else ""}">{name}</text>')
        titel = f'<title>{name}, {e["ort"]}</title>'
        inhalt = titel + kern + beschriftung
        orte.append(f'<a href="erzeuger-{slug(e["name"])}.html" class="karte__ort">{inhalt}</a>'
                    if verlinkt else f'<g class="karte__ort">{inhalt}</g>')

    return f'''<svg viewBox="0 0 900 747" class="karte" role="img"
     aria-label="Sizilien als Seekarte mit den Standorten der zwölf Betriebe">
  <defs>
    <filter id="pergament" x="-6%" y="-6%" width="112%" height="112%">
      <feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="4" seed="7" result="k"/>
      <feColorMatrix in="k" type="saturate" values="0" result="g"/>
      <feComponentTransfer in="g" result="w">
        <feFuncA type="linear" slope=".22"/>
      </feComponentTransfer>
      <feComposite in="w" in2="SourceGraphic" operator="in" result="korn"/>
      <feBlend in="SourceGraphic" in2="korn" mode="multiply"/>
    </filter>
    <filter id="flecken" x="-8%" y="-8%" width="116%" height="116%">
      <feTurbulence type="fractalNoise" baseFrequency=".012" numOctaves="3" seed="19" result="f"/>
      <feColorMatrix in="f" type="matrix" result="m"
        values="0 0 0 0 .52  0 0 0 0 .38  0 0 0 0 .18  0 0 0 .30 0"/>
      <feComposite in="m" in2="SourceGraphic" operator="in"/>
    </filter>
    <radialGradient id="alterung" cx="50%" cy="46%" r="72%">
      <stop offset="55%" stop-color="#000" stop-opacity="0"/>
      <stop offset="100%" stop-color="#6B4A22" stop-opacity=".22"/>
    </radialGradient>
    <pattern id="schraffur" width="7" height="7" patternTransform="rotate(45)"
             patternUnits="userSpaceOnUse">
      <path d="M0,0 V7" stroke="#6B4A22" stroke-width=".8" opacity=".5"/>
    </pattern>
  </defs>

  <rect width="900" height="747" fill="#EFE2C2"/>
  <rect width="900" height="747" fill="#CDB88A" filter="url(#flecken)" opacity=".55"/>

  {wellen()}
  {windlinien(rx, ry)}

  <!-- Gradnetz -->
  <g stroke="#6B4A22" stroke-width=".6" opacity=".22" stroke-dasharray="5 4" pointer-events="none">
    <path d="M222.5 0V747M391 0V747M559.5 0V747M728 0V747"/>
    <path d="M0 107H900M0 320H900M0 533H900"/>
  </g>

  <!-- Land: Schraffur landeinwaerts, dann Fuellung, dann Federstrich -->
  <g class="karte__land" pointer-events="none">
    <path d="{haupt}" fill="url(#schraffur)" fill-rule="evenodd" transform="translate(3,3)" opacity=".55"/>
    <path d="{inseln}" fill="url(#schraffur)" fill-rule="evenodd" transform="translate(2,2)" opacity=".5"/>
    <path d="{haupt}" fill="#C4A874" fill-rule="evenodd"/>
    <path d="{inseln}" fill="#C4A874" fill-rule="evenodd"/>
    <g fill="none" stroke="#4A3517" stroke-linejoin="round">
      <path d="{haupt}" stroke-width="1.9"/>
      <path d="{inseln}" stroke-width="1.3"/>
    </g>
    <g fill="none" stroke="#4A3517" opacity=".45" stroke-linejoin="round">
      <path d="{haupt}" stroke-width=".7" transform="translate(0,4)"/>
    </g>
  </g>

  {kompassrose(rx, ry, 46)}
  {kartusche(96, 610)}
  {massstab(548, 682)}

  <g class="karte__orte">{''.join(orte)}</g>

  <rect width="900" height="747" fill="url(#alterung)" pointer-events="none"/>
  <rect width="900" height="747" fill="#C9B183" filter="url(#pergament)" opacity=".26" pointer-events="none"/>
  <rect x="8" y="8" width="884" height="731" fill="none" stroke="#5B4423" stroke-width="2.4" pointer-events="none"/>
  <rect x="15" y="15" width="870" height="717" fill="none" stroke="#5B4423" stroke-width=".8" pointer-events="none"/>
</svg>'''

# ---------------------------------------------------------------- Einsetzen
def main():
    ziele = [('erzeuger.html', None, True)]
    for e in ERZEUGER:
        ziele.append((f'erzeuger-{slug(e["name"])}.html', e['id'], False))

    for datei, aktiv, verlinkt in ziele:
        p = WURZEL / datei
        if not p.exists():
            print('fehlt:', datei); continue
        t = p.read_text(encoding='utf-8')
        i = t.find('<svg viewBox="0 0 900 747"')
        if i < 0:
            print('keine Karte in', datei); continue
        j = t.index('</svg>', i) + 6
        p.write_text(t[:i] + karte(aktiv, verlinkt) + t[j:], encoding='utf-8')
        print('neu gezeichnet:', datei)

if __name__ == '__main__':
    main()

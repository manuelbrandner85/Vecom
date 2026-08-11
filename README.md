# VECOM Onlineshop

Sizilianische Spezialitäten. Statisch ausgeliefert, ohne Build-Schritt, ohne Framework,
ohne externe Anfragen. Ordner hochladen, fertig — läuft auf jedem Webspace, auch auf Strato.

---

## Struktur

```
index.html                       Startseite mit Sortiment
produkt-<name>.html              15 Produktseiten, je eigene Adresse
erzeuger.html                    Übersicht der zwölf Betriebe
erzeuger-<name>.html             12 Porträtseiten
rezepte.html                     Übersicht der acht Rezepte
rezept-<name>.html               8 Rezeptseiten
kategorie-<name>.html            5 Warengruppenseiten
404.html                         Seite nicht gefunden
robots.txt · sitemap.xml         43 Adressen
assets/
├── css/vecom.css                Design-Token, Layout, Bewegung
├── js/vecom.js                  Katalog, Warenkorb, Kasse, Dialoge
├── fonts/
│   ├── playfair.woff2           Variable Schrift 400–900, auf 143 Zeichen reduziert
│   ├── playfair-italic.woff2
│   └── OFL-Playfair-Display.txt Lizenz — muss mit ausgeliefert werden
├── img/
│   ├── logo-720.webp            Markenzeichen, Vorderseite der Scheibe
│   ├── logo-176.webp            Kopfzeile und Fußzeile
│   ├── trinacria-680.webp       Rückseite, wird erst bei Berührung geladen
│   ├── kalkputz-1024.webp       Nahtlose Wandtextur
│   └── produkte/<id>-680.webp   je Erzeugnis zwei Auflösungen
│       produkte/<id>-1024.webp
└── modelle/pistacchio.glb       Drehbares Erzeugnis, 736 KB
```

## Wie geladen wird

| Stufe | Was passiert |
|---|---|
| 1 | `index.html` und `vecom.css` — die Seite steht, 104 KB |
| 2 | Schriften und Markenzeichen sind vorgeladen (`rel="preload"`) |
| 3 | Produktfotos erscheinen über einer 20-px-Unschärfe, sobald sie da sind |
| 4 | Die Trinacria auf der Rückseite kommt erst beim ersten Anfassen der Scheibe |

Produktfotos liegen in zwei Auflösungen vor, der Browser wählt über `srcset`/`sizes`
selbst: auf dem Telefon 680 px, auf großen Bildschirmen im Dialog 1024 px.

## Produktseiten

Jedes Erzeugnis hat eine eigene, sprechende Adresse mit eigenem Titel, eigener
Beschreibung, Canonical, Open-Graph-Bild sowie `Product`- und `BreadcrumbList`-Daten.
Ein Klick im Raster öffnet weiterhin den Dialog; Mittelklick, „In neuem Tab öffnen"
und Suchmaschinen bekommen die echte Seite. Die Zurück-Taste schließt den Dialog.

Der Warenkorb überdauert Seitenwechsel und geschlossene Fenster. Beim Laden wird
er gegen den Katalog geprüft: Was es nicht mehr gibt, fliegt raus, Preise kommen
immer aus dem Katalog, nie aus dem Speicher.

## Der Auftakt

Bildschirmfüllende Aufnahme der Oliventerrasse zum Meer, darüber eine langsame
Kamerafahrt als Film. Die Kopfzeile liegt transparent darüber und wird erst beim
Scrollen fest; ein eigener Verlauf hinter ihr hält die Navigation auch über der hellsten
Bildstelle lesbar.

Der Film ist ein **Palindrom** — vorwärts plus rückwärts aneinandergesetzt. Dadurch
springt die Schleife nicht, was bei einer durchgehenden Kamerafahrt sonst sofort
auffiele. Er liegt in zwei Formaten vor (MP4/H.264 und WebM/VP9, je rund 580 bzw.
650 KB) und wird **nur geladen, wenn es sich lohnt**: nicht bei Bewegungsreduktion,
nicht bei aktiviertem Datensparmodus, nicht bei 2G/3G, nicht unter 760 px Breite.
Gestartet wird erst nach dem `load`-Ereignis über `requestIdleCallback` — gemessen bei
443 ms, also nach dem Standbild. Außerhalb des Sichtfelds pausiert er.

## Ein Jahr in Sizilien

Sechs Kapitel zwischen Sortiment und Herkunft, an den Bildlauf gekoppelt: Juni auf
Pantelleria, Juli in den Salinen, September am Ätna, Oktober im Hain und in der Mühle,
Dezember im Lager. Die Bühne bleibt stehen, die Bilder blenden über und fahren langsam
heran, die Kapitel wechseln, rechts läuft eine Monatsleiste mit.

Technisch: kein Fremdcode, nur `requestAnimationFrame`, ein Scroll-Ereignis und
Transformationen.

**Tiefenrelief.** Die Kapitel liegen nicht mehr flach. Zu jedem Bild gehoert eine
Tiefenkarte (512 × 288, rund 3 KB); sie verschiebt ein Gitter aus 34 848 Dreiecken
entlang der Blickstrahlen, und eine echte Kamera faehrt hinein. Die Kaper im
Vordergrund wandert schneller aus dem Bild als der Hang dahinter.

Jeder Gitterpunkt sitzt auf dem Blickstrahl durch seinen eigenen Bildpunkt.
Steht die Kamera im Ausgangspunkt, deckt sich die Projektion darum wieder exakt
mit dem Originalbild — unabhaengig von der Tiefe. Erst die Bewegung erzeugt die
Verschiebung.

Nachgemessen in einem Ring gleichen Abstands zur Bildmitte, damit der Radius die
Ursache nicht sein kann: nahe Bildbereiche aendern sich um 187,3, ferne um 71,8 —
Verhaeltnis 2,61. Bei einem Zoom waeren beide gleich.

Wo die Tiefe springt, wird das Gitter gedehnt; hinter der Kaper liegt keine
Bildinformation. Statt Loecher zu stopfen, dunkelt der Shader diese Flanken ab —
eine gedehnte Kante liest sich so als Eigenschatten statt als Fehler.

Fehlt die Tiefenkarte, bleibt das Kapitel flach und alles andere laeuft weiter.
Reicht die Bildrate nicht, faellt gestaffelt: feinere Aufloesung, dann die
Nachbearbeitung, dann das Gitter auf 64 × 36, dann das Relief, dann alles.

Die Bilder werden erst 1600 px vor Erreichen des Abschnitts geholt — die
Startseite ist bis dahin um rund 470 KB leichter. Bei aktivierter
Bewegungsreduktion löst sich die Bühne auf und alle sechs Kapitel stehen
untereinander.

Die Aufnahmen sind mit Higgsfield erzeugt, in einer durchgehenden Bildsprache:
Goldstunde, anamorphotisch, flache Schärfe, Filmkorn.

## Ansichten je Erzeugnis

Drei Aufnahmen pro Ware: Produktansicht, Detail, auf dem Tisch. Der Streifen unter dem
Bild tauscht die Hauptaufnahme — auf der Produktseite wie im Dialog, über dieselbe Logik.
Die Miniaturen laden bereits die 680er Datei, die beim Umschalten dann aus dem
Zwischenspeicher kommt.

In der Einzeldatei-Fassung gibt es nur die Produktansicht; 45 eingebettete Bilder wären
dort nicht vertretbar.

## Trägheit

Der Bildlauf hat Masse. Das Rad setzt ein Ziel, das Bild zieht mit Nachlauf
hinterher — nicht Weichzeichnung, sondern Beschleunigen und Auslaufen.

Der Bildlauf des Browsers bleibt dabei der echte; es wird nur jedes Bild ein
Stück weit nachgeführt. Anker, Sprungmarken, Bildlaufleiste, Tastatur und
`scrollIntoView` funktionieren unverändert: wer sonst noch scrollt, wird
bemerkt und übernommen statt bekämpft.

Der eigentliche Gewinn ist die Geschwindigkeit, die dabei abfällt. An ihr
hängt das Objektiv des Reise-Renderers: schnelle Fahrt heißt mehr
Farbquerfehler am Rand und mehr Korn, so wie eine echte Optik unter einem
harten Schwenk leidet. Gemessen wird aus der tatsächlich zurückgelegten
Strecke, nicht aus dem eigenen Nachlauf — sonst bliebe das Objektiv genau
bei den härtesten Schwenks stumm, den Sprungmarken.

Keine Trägheit bekommen: Fingergeräte, weil der Schwung des Betriebssystems
besser ist als jeder Nachbau; Bewegungsreduktion; und ein offener Dialog,
weil der Bildlauf dann ihm gehört. Gemessen wird trotzdem überall.

Kein Lenis, kein GSAP — rund 90 Zeilen, eine Schleife, die schläft, sobald
nichts mehr zieht.

## Atmosphäre

Dreiundvierzig Adressen fühlen sich erst dann wie ein Ort an, wenn über allen
dasselbe Licht liegt: Gegenlicht, das mit dem Bildlauf wandert, eine warme
Randabdunklung, Filmkorn.

Der Ausschlag liegt darin, wo nichts davon liegt. Korn über einer hellen
Warenliste ist kein Film, sondern Schmutz — das sähe nach Fotofilter aus, nicht
nach Kamera. Die Schicht misst deshalb, wie viel des Sichtfelds gerade der
Fotografie gehört: Szenenkopf, Hero, Reise, Fries. Füllt Bild das Fenster, ist
sie da; liegt Papier darunter, ist sie fort. Gemessen 0,58 über dem Szenenkopf
gegen 0,06 über der Warenliste. Jede Seite hat einen Szenenkopf, die Kopplung
trägt also überall.

Das ist Bildregie, nicht Physik: ein echtes Objektiv vignettiert gleichmäßig.
Hier verschwindet die Abdunklung über dem Papier, weil sie dort dem Erzeugnis
schadet statt zu nutzen.

Die Kornkachel wird zur Laufzeit gezeichnet — null Bytes über die Leitung, und
zufälliges Rauschen hat keine Struktur, an der sich die Kachelfuge zeigen könnte.

**Was die Kosten diktiert hat.** Zwei Entwürfe sind an der Messung gescheitert:

| Entwurf | Median auf `index.html` |
|---|---|
| Verlauf je Bild verschoben | Bildlauf brach auf 5 Zwischenstände ein |
| `mix-blend-mode:overlay` | 164 ms (ohne Schicht: 51 ms) |
| Kachel mit eigenem Alphakanal | 55 ms |

Ein wandernder Verlaufsmittelpunkt baut die ganze Fläche je Bild neu auf;
verschoben wird deshalb per `transform`. Und eine Mischbetriebsart zwingt den
Compositor, den Untergrund zurückzulesen — das Korn bringt sein Alpha jetzt
selbst mit. Übrig bleiben rund +6 ms Median unter reiner CPU-Rasterisierung.

Reicht die Bildrate dennoch nicht, fällt zuerst das Korn, dann die ganze
Schicht — dieselbe Staffelung wie beim Reise-Renderer, geprüft: `voll → ohne
Korn → entfernt`.

Keine Atmosphäre im Kontrastmodus, in der Druckfassung und über offenen
Dialogen.

## Das Erzeugnis als Körper

Die Pistaziencreme steht auf ihrer Seite als drehbare Geometrie — ein eigener
GLB-Lader, ein Materialschritt, drei Lichter. Kein Three.js: für einen Körper,
eine Kamera und ein Licht wäre ein Szenengraph mehr Gewicht als Nutzen.

Die Datei wird mit `quelle/modell.py` hergerichtet:

| Schritt | Was er tut |
|---|---|
| Normalen | flächengewichtet erzeugt, gemittelt über gleiche Positionen |
| Quantisierung | Position und Normale als int16, Texturkoordinaten als uint16 |
| Indizes | uint16 statt uint32, solange das Modell unter 65536 Ecken bleibt |

Zusammen 1008 → 736 KB, und das **mit** den zuvor fehlenden Normalen. Der
Positionsfehler der Quantisierung liegt bei 1,4 · 10⁻⁵ auf ein 1,9 Einheiten
hohes Modell — rund ein Hunderttausendstel der Bauhöhe.

Ohne Normalen rechnet der Shader `normalize(vec3(0))`: sämtliche Lichtterme
fallen auf null, und das Glas steht flach im Bild wie ein Aufkleber. Der Fehler
kracht nicht, er sieht bloß schlecht aus — deshalb erzeugt der Lader die
Normalen notfalls auch zur Laufzeit, falls einmal ein Modell ohne sie ankommt.

Die Quantisierung ist als `KHR_mesh_quantization` ausgewiesen, Maßstab und
Verschiebung stehen im Knoten. Die Datei bleibt damit normgerecht und öffnet
in jedem Betrachter in Originalgröße, nicht nur im eigenen Lader.

## Warengruppen und Suche

Fünf Warengruppen haben eigene Adressen mit `CollectionPage`-Daten — „Olivenöl kaufen"
ist eine Suchanfrage mit Kaufabsicht, dafür braucht es eine Seite. Die Navigation zeigt
seither dorthin statt auf einen Filteranker.

Die Suche greift über die ganze Seite: 40 Einträge aus Erzeugnissen, Rezepten, Erzeugern
und Warengruppen, gruppiert im Ergebnisfeld, mit Pfeiltasten bedienbar. Umlaute und
Akzente werden normalisiert, „oel" findet also „Olivenöl". Auf der Startseite filtert
sie zusätzlich weiterhin das Raster.

Für die Fehlerseite muss der Server `404.html` ausliefern:

```apache
ErrorDocument 404 /404.html
```

## Rezepte

Acht sizilianische Gerichte mit `Recipe`-Daten: Zutaten, Schritte, Zeiten, Portionen,
Küche. Google zeigt solche Seiten mit Bild, Dauer und Bewertungssternen im Treffer —
das ist der stärkste organische Hebel, den ein Lebensmittelshop hat.

Jede Zutat aus dem Sortiment ist im Rezept direkt verlinkt, jede Produktseite zeigt
umgekehrt „Damit kochen". Bebildert sind die Rezepte aus dem vorhandenen Bestand:
die Tischaufnahmen zeigen ohnehin genau diese Gerichte — kein einziges neues Bild nötig.

Gepflegt in `quelle/rezepte.py`.

## Erzeuger

Zwölf Betriebe, je eine Porträtseite mit Ort, Gründungsjahr, Leitung, Umfang und
den Erzeugnissen, die von dort kommen. Die Karte zeichnet die Standorte auf dieselbe
Küstenlinie, die auch im Herkunftsabschnitt läuft — echte Koordinaten, keine Dekoration.
Auf der Übersicht sind die Punkte anklickbar. `Organization`- und `BreadcrumbList`-Daten
liegen auf jeder Porträtseite; die Angabe „Erzeuger" auf den Produktseiten verlinkt dorthin.

Gepflegt wird das in `shop/erzeuger.py` — eine Quelle für Übersicht, Porträts und
Produktangaben.

## Zustand

Fertig: Katalog mit fünfzehn Erzeugnissen, Filter, Suche, Produktdialog mit Blättern,
Warenkorb, vierstufige Kasse mit Feldprüfung, Rechtstexte, strukturierte Produktdaten,
Tastaturbedienung mit Fokusfalle, Bewegungsreduktion, kein Kontrastverstoß,
kein horizontaler Überlauf von 320 bis 1920 px.

## Vor dem Livegang

1. **Rechtstexte** — die gelb markierten Platzhalter in Impressum, AGB, Widerruf und
   Datenschutz durch echte Unternehmensdaten ersetzen und anwaltlich prüfen lassen.
   Ein unvollständiges Impressum ist abmahnfähig.
2. **Backend und Zahlung** — die Kasse ist Oberfläche. `placeOrder()` in `vecom.js`
   ist die Stelle, an der die Bestellung an den Server geht. Ohne Zahlungsanbieter
   und Bestandsführung ist kein Verkauf möglich.
3. **`og:image`** — zeigt auf `https://www.vecom-onlineshop.de/og-vecom.jpg`.
   Diese Datei anlegen, 1200 × 630 px.
4. **Produktdaten** — Preise, Erntejahre und Erzeugernamen sind plausibel erfunden.
5. **Bildrechte** — die Produktfotos sind KI-erzeugt, die Trinacria stammt aus einer
   fremden Vorlage. Rechte klären.
6. **Auslieferung** — Kompression (Brotli oder gzip) und lange Cache-Zeiten für
   `assets/` einschalten. Beispiel für Apache:

```apache
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css application/javascript image/svg+xml
</IfModule>
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType font/woff2 "access plus 1 year"
  ExpiresByType text/css   "access plus 1 week"
</IfModule>
```

## Nächste Ausbaustufen

- Bewegtbild im Auftaktkapitel (Higgsfield Bild-zu-Video), mit Standbild als Rückfallebene
- Bewertungen mit `AggregateRating` — erst, wenn es echte Bewertungen gibt. Erfundene
  Bewertungen sind Wettbewerbsverstoß und werden von Google als Spam gewertet.

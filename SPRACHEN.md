# Sprachumschaltung Italienisch

Der Shop lässt sich auf Italienisch umstellen — über den Wähler in der Kopfzeile,
auf schmalen Displays über die große Navigation. Die Wahl wird gemerkt und gilt für
alle Folgeseiten. Wer den Browser auf Italienisch gestellt hat, bekommt sie beim
ersten Besuch automatisch.

## Aufbau

| Datei | Inhalt |
|---|---|
| `assets/js/sprache.js` | Mechanik: Wähler, Textersetzung, Speicherung |
| `assets/js/sprache-it.js` | Oberfläche, Navigation, Warenkorb, Kasse |
| `assets/js/sprache-it-2.js` | Produkttexte und Reisekapitel |
| `assets/js/sprache-it-3.js` | Erzeugerporträts |
| `assets/js/sprache-it-4.js` | Rezepte |

Zusammen 72 KB, geladen nur beim Umschalten.

Umgesetzt als **Textersetzung im Browser**, nicht als zweiter Seitenbaum. Beim
Umschalten werden alle Textknoten und die Beschriftungen (`aria-label`,
`placeholder`, `title`, `alt`) getauscht. Der deutsche Urtext bleibt im Speicher,
das Zurückschalten ist dadurch verlustfrei.

**Was im Wörterbuch fehlt, bleibt deutsch stehen.** Der Shop ist dadurch nie
kaputt, nur teilweise übersetzt.

## Zwei Feinheiten

Nachgeladene Inhalte — Warenkorb, Kasse, Dialoge — werden über einen
`MutationObserver` mitübersetzt. Er ist entprellt und schaltet sich während des
Übersetzens selbst ab: sonst lösen die eigenen Änderungen ihn erneut aus und die
Seite hängt.

Im deutschen Text sind italienische Fachbegriffe mit `lang="it"` ausgezeichnet
(damit Vorleseprogramme „Nocellara del Belice" richtig betonen). In der
italienischen Fassung wäre das doppelt gemoppelt — die Auszeichnung wird dort
entfernt und beim Zurückschalten wiederhergestellt.

## Zwei Grenzen

**Google indexiert weiterhin nur Deutsch.** Für echten Verkauf nach Italien
bräuchte es eigene Adressen je Sprache mit `hreflang`-Verweisen — dann aber auch
Versandzonen für Italien, die es derzeit nicht gibt: geliefert wird nach
Deutschland, Österreich und in die Schweiz.

**Die Rechtstexte bleiben deutsch, mit Absicht.** Sobald Impressum, AGB und
Widerrufsbelehrung auf Italienisch stehen, richtet sich das Angebot an
italienische Verbraucher, und dann gilt italienisches Verbraucherrecht mit eigenen
Fristen und Pflichtangaben. Eine übersetzte deutsche AGB wäre dort im Zweifel
unwirksam. In der italienischen Fassung steht dazu ein Hinweis in der Fußzeile.

## Erweitern

Neue Einträge in `sprache-it.js` ergänzen — Schlüssel ist der deutsche Text, exakt
wie er auf der Seite steht. Danach:

```bash
python3 -m http.server 8099 &
node quelle/zugang.mjs        # prüft auch, ob der Wähler die Kopfzeile sprengt
node quelle/budget.mjs
```

Gemessener Übersetzungsgrad (Anteil italienischer Funktionswörter am sichtbaren
Text): Startseite 89 %, Rezeptübersicht 94 %, Rezeptseite 91 %, Erzeugerübersicht
100 %, Erzeugerporträt 96 %, Produktseite 100 %. Der Rest sind Rechtstexte und
einzelne Fachangaben.

## Eine Falle beim Ersetzen

Absätze, in denen ein italienischer Fachbegriff als `<span lang="it">` ausgezeichnet
ist, zerfallen in mehrere Textknoten — der Satz steht nie am Stück im Wörterbuch.
Deshalb werden zusätzlich **ganze Elemente** geprüft.

Dabei darf nur ersetzt werden, wenn die einzigen Element-Kinder `<span>` sind. Ein
`<li>`, das ein `<p>` enthält, würde durch `textContent` sein inneres `<p>` verlieren —
die Rezeptliste verkürzte sich dabei um einen Schritt, und alle folgenden rutschten
eine Position nach oben.

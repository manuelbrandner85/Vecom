# Sprachumschaltung Italienisch

Der Shop lässt sich auf Italienisch umstellen — über den Wähler in der Kopfzeile,
auf schmalen Displays über die große Navigation. Die Wahl wird gemerkt und gilt für
alle Folgeseiten. Wer den Browser auf Italienisch gestellt hat, bekommt sie beim
ersten Besuch automatisch.

## Aufbau

| Datei | Inhalt |
|---|---|
| `assets/js/sprache-it.js` | Wörterbuch: deutscher Text → italienischer Text |
| `assets/js/sprache.js` | Mechanik: Wähler, Textersetzung, Speicherung |

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

Noch nicht übersetzt sind die langen Fließtexte der Erzeugerporträts, der
Rezeptschritte und der Reisekapitel. Titel, Teaser und alle Bedienelemente sind es.

# Versandkosten

**14,95 € je Paket bis 10 kg.** Ab 199 € Warenwert entfällt der Versand — aber nur
bis 10 kg Gesamtgewicht. Darüber wird je angefangenes weiteres Paket erneut
berechnet, und die Befreiung greift nicht.

| Fall | Versand |
|---|---|
| unter 199 €, bis 10 kg | 14,95 € |
| ab 199 €, bis 10 kg | kostenfrei |
| über 10 kg | 14,95 € je angefangene 10 kg, keine Befreiung |
| Schweiz | 14,95 € je Paket, zzgl. Einfuhrabgaben |

Express kostet 6,00 € je Paket zusätzlich.

## Versandgewichte

Jedes Erzeugnis trägt dafür ein Versandgewicht — das Feld `kg:` in der Produktliste
in `assets/js/vecom.js`. Geschätzt aus Inhalt plus Behälter:

| | |
|---|---|
| 500-ml-Ölflasche | 0,95 kg |
| 250-ml-Flasche | 0,55 kg |
| 340-g-Glas | 0,62 kg |
| 200-g-Glas | 0,42 kg |
| Beutel Oregano 30 g | 0,05 kg |
| Geschenkkiste | 2,60 kg |

**Diese Werte sind Schätzungen.** Vor dem Livegang gegen echte Wiegewerte tauschen —
sonst weicht die Paketstaffelung von der Wirklichkeit ab.

## Anzeige

Der Warenkorb zeigt ab 10 kg das Gewicht und die Zahl der Pakete an, bevor jemand
im letzten Schritt überrascht wird:

> **10,4 kg** — über 10 kg, daher 2 × 14,95 € Versand.

Unterhalb der Grenze läuft weiterhin der Fortschrittsbalken bis 199 €.

## Ein harter Sprung

Die Vorgabe erzeugt eine unangenehme Kante: 198 € mit 9 kg kosten 14,95 € Versand,
210 € mit 9 kg nichts — aber 210 € mit 10,5 kg wieder 29,90 €. Wer knapp über 199 €
bestellt und dabei die Gewichtsgrenze reißt, zahlt mehr als jemand mit kleinerer
Bestellung.

Eine mildere Regel wäre: Ab 199 € ist das **erste** Paket frei, weitere werden
berechnet. Das ist im Skript eine Zeile — `shipFrei()` gibt dann die Zahl der freien
Pakete zurück statt eines Ja/Nein. Umgesetzt ist bewusst die wörtliche Vorgabe.

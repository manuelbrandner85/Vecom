# -*- coding: utf-8 -*-
"""Acht sizilianische Rezepte. Jedes nutzt Erzeugnisse aus dem Sortiment
und eine bereits vorhandene Aufnahme — keine neuen Bilder nötig."""

REZEPTE = [
 dict(id="caponata", titel="Caponata", bild="aceto-b",
      teaser="Das süßsaure Auberginengemüse, an dem sich jede sizilianische Küche messen lässt.",
      zeit=50, aktiv=25, portionen=4, schwierigkeit="einfach", gang="Vorspeise",
      waren=["aceto", "capperi", "olio-noc", "olive-verdi"],
      zutaten=[("2", "Auberginen (ca. 700 g)", None),
               ("3", "Stangen Staudensellerie", None),
               ("1", "große Zwiebel", None),
               ("400 g", "reife Tomaten", None),
               ("60 ml", "natives Olivenöl extra", "olio-noc"),
               ("2 EL", "Kapern in Meersalz, gewässert", "capperi"),
               ("80 g", "grüne Oliven, entsteint", "olive-verdi"),
               ("3 EL", "Weinessig aus Nero d’Avola", "aceto"),
               ("1 EL", "Rohrzucker", None),
               ("", "Salz, Basilikum", None)],
      schritte=["Auberginen in 2 cm große Würfel schneiden, salzen und 20 Minuten in einem Sieb "
                "abtropfen lassen. Danach trocken tupfen — das ist der Unterschied zwischen "
                "Caponata und Ölschwamm.",
                "Auberginen in reichlich Olivenöl portionsweise goldbraun braten, herausnehmen "
                "und auf Küchenpapier abtropfen lassen.",
                "Sellerie und Zwiebel im selben Topf glasig dünsten. Tomaten grob würfeln, "
                "zugeben und 10 Minuten einkochen lassen.",
                "Kapern, Oliven und Auberginen unterheben. Essig und Zucker verrühren, angießen "
                "und offen 5 Minuten einkochen, bis die Säure rund schmeckt.",
                "Vom Herd nehmen, abschmecken, mindestens zwei Stunden ziehen lassen. "
                "Lauwarm oder kalt servieren, mit Basilikum."],
      tipp="Caponata schmeckt am zweiten Tag besser als am ersten. Größer ansetzen lohnt sich."),

 dict(id="bruschetta-pomodori", titel="Bruschetta mit getrockneten Tomaten", bild="pomodori-c",
      teaser="Fünf Minuten Arbeit, und trotzdem der Teller, nach dem alle greifen.",
      zeit=12, aktiv=12, portionen=4, schwierigkeit="sehr einfach", gang="Vorspeise",
      waren=["pomodori", "olio-noc", "origano"],
      zutaten=[("8", "Scheiben Sauerteigbrot", None),
               ("1", "Knoblauchzehe", None),
               ("120 g", "getrocknete Tomaten in Olivenöl, abgetropft", "pomodori"),
               ("200 g", "Ricotta", None),
               ("2 EL", "natives Olivenöl extra", "olio-noc"),
               ("1 TL", "Oregano vom Ätna-Hang", "origano"),
               ("", "Meersalz", None)],
      schritte=["Brotscheiben auf dem Grill oder in der Pfanne ohne Fett rösten, bis sie an den "
                "Kanten dunkel werden.",
                "Die noch heißen Scheiben mit der aufgeschnittenen Knoblauchzehe abreiben — nur "
                "einmal pro Scheibe, sonst dominiert der Knoblauch alles.",
                "Ricotta mit etwas Salz glattrühren und auf das Brot streichen.",
                "Getrocknete Tomaten darauf verteilen, mit Olivenöl beträufeln und den Oregano "
                "zwischen den Fingern darüber zerreiben."],
      tipp="Das Öl aus dem Tomatenglas nicht wegschütten — es ist gewürzt und trägt den Geschmack."),

 dict(id="pasta-pistazienpesto", titel="Pasta mit Pistazienpesto", bild="pesto-b",
      teaser="Bronte auf dem Teller. Zehn Minuten, solange die Nudeln kochen.",
      zeit=15, aktiv=10, portionen=2, schwierigkeit="sehr einfach", gang="Hauptgericht",
      waren=["pesto", "olio-noc"],
      zutaten=[("250 g", "kurze Pasta, etwa Casarecce", None),
               ("4 EL", "Pesto Siciliano mit Pistazie", "pesto"),
               ("1 EL", "natives Olivenöl extra", "olio-noc"),
               ("40 g", "Pecorino, frisch gerieben", None),
               ("", "Basilikum, Meersalz", None)],
      schritte=["Pasta in gut gesalzenem Wasser al dente kochen. Vor dem Abgießen eine Tasse "
                "Kochwasser beiseitestellen.",
                "Pesto in eine vorgewärmte Schüssel geben und mit drei Esslöffeln heißem "
                "Kochwasser glattrühren. Pesto niemals erhitzen — es wird bitter.",
                "Pasta abgießen, sofort unterheben, weiteres Kochwasser zugeben, bis die Sauce "
                "die Nudeln umhüllt statt am Boden zu stehen.",
                "Mit Olivenöl, Pecorino und Basilikum servieren."],
      tipp="Das Kochwasser ist die Sauce. Ohne Stärke bleibt das Pesto ein Klumpen."),

 dict(id="spaghetti-kapern", titel="Spaghetti mit Kapern und Tomaten", bild="capperi-c",
      teaser="Vorratsküche im besten Sinn: alles kommt aus dem Schrank, nichts schmeckt danach.",
      zeit=20, aktiv=15, portionen=2, schwierigkeit="einfach", gang="Hauptgericht",
      waren=["capperi", "olio-noc", "olive-verdi"],
      zutaten=[("250 g", "Spaghetti", None),
               ("2 EL", "Kapern in Meersalz", "capperi"),
               ("250 g", "Kirschtomaten", None),
               ("60 g", "grüne Oliven, entsteint", "olive-verdi"),
               ("3 EL", "natives Olivenöl extra", "olio-noc"),
               ("1", "Knoblauchzehe", None),
               ("", "Petersilie, Chili, Meersalz", None)],
      schritte=["Kapern zehn Minuten in kaltem Wasser wässern, dann abtropfen lassen. Nicht "
                "auslassen — sonst ist das Gericht ungenießbar salzig.",
                "Spaghetti aufsetzen. Währenddessen Knoblauch in Olivenöl bei mittlerer Hitze "
                "duften lassen, ohne ihn zu bräunen.",
                "Halbierte Tomaten, Oliven und Kapern zugeben und 6 bis 8 Minuten schmoren, bis "
                "die Tomaten aufplatzen.",
                "Spaghetti al dente abgießen, mit etwas Kochwasser in die Pfanne geben und eine "
                "Minute schwenken. Mit Petersilie und Chili abschmecken."],
      tipp="Kein zusätzliches Salz ins Gericht — die Kapern bringen genug mit."),

 dict(id="tomatensalat-oregano", titel="Tomatensalat mit Oregano", bild="origano-c",
      teaser="Vier Zutaten. Deshalb entscheidet jede einzelne.",
      zeit=10, aktiv=10, portionen=4, schwierigkeit="sehr einfach", gang="Beilage",
      waren=["origano", "sale", "olio-noc"],
      zutaten=[("600 g", "reife Tomaten, verschiedene Sorten", None),
               ("1 TL", "Oregano vom Ätna-Hang", "origano"),
               ("", "Meersalz aus Trapani", "sale"),
               ("4 EL", "natives Olivenöl extra", "olio-noc"),
               ("1", "kleine rote Zwiebel", None)],
      schritte=["Tomaten in dicke Scheiben oder Spalten schneiden, auf einer flachen Platte "
                "auslegen und großzügig mit grobem Meersalz bestreuen.",
                "Fünf Minuten stehen lassen. Das Salz zieht Saft, der später die Sauce bildet.",
                "Zwiebel in hauchdünne Ringe schneiden und darauf verteilen.",
                "Oregano zwischen den Handflächen zerreiben, darüberstreuen, Olivenöl darüber "
                "geben. Nicht mischen — nur einmal vorsichtig schwenken."],
      tipp="Tomaten nie kalt servieren. Der Kühlschrank kostet mehr Aroma als jede falsche Zutat."),

 dict(id="zwiebeln-agrodolce", titel="Süßsaure Zwiebeln", bild="aceto-c",
      teaser="Die Beilage, die kaltes Fleisch, Käse und geröstetes Brot rettet.",
      zeit=45, aktiv=10, portionen=4, schwierigkeit="einfach", gang="Beilage",
      waren=["aceto", "olio-noc"],
      zutaten=[("600 g", "kleine Zwiebeln oder Schalotten", None),
               ("4 EL", "Weinessig aus Nero d’Avola", "aceto"),
               ("2 EL", "Rohrzucker", None),
               ("3 EL", "natives Olivenöl extra", "olio-noc"),
               ("1", "Lorbeerblatt", None),
               ("", "Meersalz", None)],
      schritte=["Zwiebeln schälen und ganz lassen. In Olivenöl bei mittlerer Hitze rundum "
                "anbräunen, das dauert gut zehn Minuten.",
                "Zucker darüberstreuen und karamellisieren lassen, bis er goldbraun ist.",
                "Mit Essig ablöschen, Lorbeer und eine Prise Salz zugeben, 100 ml Wasser "
                "angießen.",
                "Zugedeckt 25 Minuten schmoren, dann offen einkochen, bis die Flüssigkeit "
                "sirupartig ist. Lauwarm oder kalt servieren."],
      tipp="Hält sich im Glas zwei Wochen im Kühlschrank und wird dabei besser."),

 dict(id="brioche-pistaziencreme", titel="Brioche mit Pistaziencreme", bild="pistacchio-b",
      teaser="Das sizilianische Frühstück. Mehr Anleitung braucht es kaum.",
      zeit=8, aktiv=8, portionen=2, schwierigkeit="sehr einfach", gang="Frühstück",
      waren=["pistacchio"],
      zutaten=[("2", "Brioche-Brötchen", None),
               ("4 EL", "Pistaziencreme aus Bronte", "pistacchio"),
               ("1 EL", "Pistazien, grob gehackt", None)],
      schritte=["Brioche halbieren und kurz in der Pfanne oder im Ofen anwärmen, bis sie außen "
                "knusprig und innen weich ist.",
                "Pistaziencreme dick aufstreichen, solange die Brioche warm ist — sie zerläuft "
                "dann leicht in die Krume.",
                "Mit gehackten Pistazien bestreuen und sofort essen."],
      tipp="In Sizilien kommt dazu eine Granita. Zum Frühstück, ohne Diskussion."),

 dict(id="pecorino-honig", titel="Pecorino mit Zagara-Honig", bild="miele-b",
      teaser="Der einfachste Nachtisch der Insel — und der, an den man sich erinnert.",
      zeit=5, aktiv=5, portionen=4, schwierigkeit="sehr einfach", gang="Nachtisch",
      waren=["miele", "mandorle"],
      zutaten=[("250 g", "Pecorino, mittelalt", None),
               ("3 EL", "Zagara-Honig, Orangenblüte", "miele"),
               ("40 g", "Mandeln aus Avola, geröstet", "mandorle"),
               ("", "grober Pfeffer", None)],
      schritte=["Pecorino in dicke Späne oder Würfel brechen, nicht schneiden — die Bruchkante "
                "nimmt den Honig besser auf.",
                "Mandeln in einer trockenen Pfanne rösten, bis sie duften, und grob hacken.",
                "Käse auf einem Brett anrichten, Honig darüberlaufen lassen, Mandeln und "
                "frisch gemahlenen Pfeffer darüber."],
      tipp="Ein junger Pecorino wird zu süß. Nehmen Sie einen, der schon Salz und Kante hat."),
]

NACH_ID = {r["id"]: r for r in REZEPTE}

# Zuordnung Ware -> Rezepte, für den Verweis auf den Produktseiten
WARE_ZU_REZEPT = {}
for r in REZEPTE:
    for w in r["waren"]:
        WARE_ZU_REZEPT.setdefault(w, []).append(r["id"])

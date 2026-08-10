# -*- coding: utf-8 -*-
"""Die zwölf Betriebe hinter dem Sortiment.
Eine Quelle für Übersichtsseite, Porträtseiten und die Angaben auf den Produktseiten."""

ERZEUGER = [
 dict(id="lo-bue", name="Az. Agr. Lo Bue", ort="Castelvetrano", lon=12.79, lat=37.68,
      seit=1961, leitung="Familie Lo Bue, dritte Generation", flaeche="18 ha Olivenhain",
      waren=["olio-noc", "olive-verdi"],
      kurz="Nocellara del Belice, gepflückt und gepresst am selben Tag.",
      text=["Der Hain liegt im Belice-Tal, achtzehn Hektar auf lehmigem Kalkboden, wenige Kilometer "
            "vom Meer entfernt. Die Nocellara del Belice ist hier keine Sortenwahl, sondern das, was "
            "seit Generationen wächst — sie liefert Öl und Tafeloliven zugleich.",
            "Geerntet wird Mitte Oktober bei beginnender Reife, von Hand und mit Kämmen, nie mit "
            "Schüttelmaschinen. Zwischen Baum und Mühle liegen selten mehr als vier Stunden. Das ist "
            "der Grund für den grasigen Ton und die Schärfe im Abgang: Polyphenole zerfallen schnell, "
            "wer sie im Öl haben will, muss sich beeilen.",
            "Die Tafeloliven kommen in schwache Salzlake und vergären milchsauer. Keine Lauge, kein "
            "Essig, keine Farbe — deshalb sind sie mattgrün statt leuchtend und schmecken buttrig."]),

 dict(id="frantoio-sciacca", name="Frantoio Sciacca", ort="Sciacca, Provinz Agrigento", lon=13.08, lat=37.51,
      seit=1978, leitung="Giuseppe und Marco Vella", flaeche="Lohnmühle für 40 Kleinbetriebe",
      waren=["olio-bia"],
      kurz="Eine Mühle, die für die Kleinen presst, die keine eigene haben.",
      text=["Die Mühle über der Südküste presst nicht nur die eigene Ernte, sondern für rund vierzig "
            "Betriebe der Umgebung, die zu klein für eine eigene Anlage sind. Jede Partie läuft "
            "getrennt durch — sonst wüsste niemand mehr, wessen Öl im Tank steht.",
            "Die Biancolilla ist die alte Hausolive Westsiziliens: spät geerntet, sanft gepresst, "
            "niedrige Bitterkeit, Mandel und reife Tomate im Geschmack. Ein Öl für Menschen, denen "
            "die Nocellara zu ruppig ist.",
            "Gelagert wird in Edelstahl unter Stickstoff, abgefüllt wird auf Abruf. Öl altert im "
            "Sauerstoff, nicht im Fass."]),

 dict(id="cantina-buccheri", name="Cantina Buccheri", ort="Buccheri bei Noto", lon=14.85, lat=37.13,
      seit=1994, leitung="Rosa Buccheri", flaeche="6 ha Nero d’Avola",
      waren=["aceto"],
      kurz="Essig aus dem Überschuss der Weinernte, zwei Jahre im Kastanienfass.",
      text=["Rosa Buccheri baut auf sechs Hektar Nero d’Avola an, in 700 Metern Höhe hinter Noto. "
            "Was nicht in den Wein geht, wird Essig — offen vergoren, ohne Starterkulturen, mit der "
            "Essigmutter, die seit den Neunzigern im Haus lebt.",
            "Zwei Jahre im Kastanienfass nehmen dem Essig die scharfe Spitze. Die Süße der Traube "
            "bleibt spürbar, deshalb passt er zu allem Süßsauren: Caponata, gebratene Zwiebeln, "
            "Sardinen mit Rosinen und Pinienkernen."]),

 dict(id="conserve-aretusa", name="Conserve Aretusa", ort="Syrakus", lon=15.28, lat=37.07,
      seit=1986, leitung="Familie Failla", flaeche="Manufaktur, 4 Personen",
      waren=["marm-lim"],
      kurz="Zitronen mit Schale, offen im Kupferkessel eingekocht.",
      text=["Vier Menschen, ein Raum, zwei Kupferkessel. Verarbeitet wird die Femminello aus den "
            "Hainen um Syrakus, ungewachst — anders geht es nicht, wenn die Schale mit hineinsoll.",
            "55 Gramm Frucht auf 100 Gramm Marmelade, kein Pektinzusatz. Die Konsistenz kommt aus "
            "dem Pektin der Schale selbst, dafür muss länger und offener gekocht werden. Das kostet "
            "Ausbeute und bringt Geschmack.",
            "Deutlich weniger süß als üblich, mit einer Bitterkeit im Nachgang, die zu Pecorino "
            "genauso passt wie zu gebuttertem Brot."]),

 dict(id="grasso", name="Az. Agr. Grasso", ort="Paternò", lon=14.90, lat=37.57,
      seit=1952, leitung="Familie Grasso, vierte Generation", flaeche="24 ha Blutorangen",
      waren=["marm-ora"],
      kurz="Tarocco von der Lavaebene südlich des Ätna.",
      text=["Die Ebene um Paternò liegt auf vulkanischem Boden im Schatten des Ätna. Genau hier "
            "entsteht der rote Farbstoff der Tarocco: Er bildet sich nur, wenn die Nächte kalt genug "
            "werden und die Tage warm bleiben. Ein paar Kilometer weiter ans Meer, und die Orange "
            "bleibt orange.",
            "Geerntet wird von Dezember bis März. Die Konfitüre kocht offen im Kupferkessel, deshalb "
            "bleibt die Frucht stückig statt zu Mus zu zerfallen."]),

 dict(id="coop-etnea", name="Coop. Etnea", ort="Bronte", lon=14.83, lat=37.79, seit=1974,
      leitung="Genossenschaft, 31 Mitglieder", flaeche="Steilhänge am Ätna-Westhang",
      waren=["pistacchio", "pesto"],
      kurz="Pistazien vom Lavahang, geerntet nur alle zwei Jahre.",
      text=["Die Pistazie von Bronte wächst auf erstarrter Lava am Westhang des Ätna, an Hängen, die "
            "keine Maschine befahren kann. Geerntet wird von Hand, und nur in ungeraden Jahren: Im "
            "Jahr dazwischen werden die Blüten entfernt, damit der Baum Kraft sammelt.",
            "Das halbiert den Ertrag und erklärt den Preis. Die Frucht ist dafür länger, grüner und "
            "aromatischer als alles, was auf ebenem Boden wächst.",
            "Einunddreißig Familien haben sich 1974 zusammengeschlossen, weil einzeln niemand die "
            "Schälanlage bezahlen konnte. Die Genossenschaft schält, mahlt und füllt bis heute selbst ab."]),

 dict(id="riberella", name="Apicoltura Riberella", ort="Ribera", lon=13.27, lat=37.50,
      seit=2003, leitung="Antonio Riberella", flaeche="180 Völker",
      waren=["miele"],
      kurz="Orangenblütenhonig, kalt geschleudert und ungefiltert.",
      text=["Ab April stehen 180 Völker in den Orangenhainen um Ribera. Zagara heißt die Orangenblüte "
            "auf Sizilianisch, und der Honig riecht auch so: hell, blumig, mit deutlichem Zitrusduft.",
            "Kalt geschleudert, ungefiltert, nie über 40 Grad erwärmt. Deshalb bleiben Pollen und "
            "Aroma erhalten, und deshalb kristallisiert er nach einigen Monaten fein aus. Das ist "
            "kein Fehler, sondern der Beweis, dass er nicht erhitzt wurde."]),

 dict(id="consorzio-avola", name="Consorzio Avola", ort="Avola", lon=15.14, lat=36.91,
      seit=1969, leitung="Zusammenschluss von 22 Höfen", flaeche="Terrassen über der Küste",
      waren=["mandorle"],
      kurz="Pizzuta d’Avola — die Mandel, aus der Marzipan gemacht wurde.",
      text=["Die Pizzuta d’Avola gilt als beste Mandel Italiens: flach, schmal, dünnschalig, mit "
            "hohem Ölgehalt. Sie wächst auf Terrassen über der Küste, wo sonst wenig gedeiht.",
            "Wir kaufen sie ungeröstet und ungesalzen. Wer Granita, Mandelmilch oder Pesto daraus "
            "macht, will selbst über Röstung und Salz entscheiden.",
            "Zweiundzwanzig Höfe bringen ihre Ernte zusammen zur Knackanlage. Ohne diesen Zusammen"
            "schluss wären die meisten von ihnen längst aufgegeben."]),

 dict(id="coop-pantesca", name="Coop. Pantesca", ort="Pantelleria", lon=11.99, lat=36.79,
      seit=1971, leitung="Genossenschaft, 60 Familien", flaeche="Trockenmauer-Terrassen",
      waren=["capperi"],
      kurz="Kapern in Meersalz gereift, nicht in Essig ertränkt.",
      text=["Pantelleria liegt näher an Tunesien als am sizilianischen Festland. Auf der Vulkaninsel "
            "wächst kaum etwas ohne Schutz — die Kapernsträucher stehen im Windschatten niedriger "
            "Trockenmauern, die die Insel wie ein Netz überziehen.",
            "Gepflückt wird von Hand, im Morgengrauen, bevor die Knospe aufgeht. Danach reift sie "
            "schichtweise in Meersalz, wochenlang, mit mehrfachem Umschichten. Erst dabei entsteht "
            "das fast blumige Aroma.",
            "Kapern in Essig sind schneller und billiger herzustellen. Man schmeckt dann allerdings "
            "vor allem Essig. Vor Gebrauch zehn Minuten wässern, mehr braucht es nicht."]),

 dict(id="conserve-pachino", name="Conserve Pachino", ort="Pachino", lon=15.09, lat=36.72,
      seit=1988, leitung="Familie Calabrese", flaeche="Trockengestelle an der Südspitze",
      waren=["pomodori"],
      kurz="Vier Tage Sonne auf Holzgestellen, dann Olivenöl.",
      text=["An der Südspitze Siziliens weht fast immer Wind, und die Sonne steht hoch. Die Tomaten "
            "trocknen vier Tage auf Holzgestellen im Freien, bis nur noch Frucht und Süße übrig sind. "
            "Ein Trockenschrank wäre schneller und schmeckt flacher.",
            "Danach kommen sie in natives Olivenöl mit Oregano und einer Knoblauchzehe. Das Öl im "
            "Glas ist nach ein paar Wochen die halbe Miete — nicht wegwerfen."]),

 dict(id="saline-ettore", name="Saline Ettore", ort="Trapani", lon=12.51, lat=38.02,
      seit=1830, leitung="Familie Ettore, sechste Generation", flaeche="Salinen bei Nubia",
      waren=["sale"],
      kurz="Meerwasser, Wind und Sonne. Sonst nichts.",
      text=["Zwischen Trapani und Marsala liegen flache Becken, in denen seit der Antike Meerwasser "
            "verdunstet. Die Windmühlen, die das Wasser von Becken zu Becken heben, stehen dort noch "
            "immer und arbeiten noch immer.",
            "Das Salz wird von Hand geschöpft, ungewaschen und ohne Rieselhilfen abgefüllt. Deshalb "
            "klumpt es leicht und schmeckt mineralisch statt bloß salzig. Wer streufähiges Salz will, "
            "kauft besser im Supermarkt.",
            "Die Salinen sind heute Naturschutzgebiet. Flamingos rasten hier auf dem Weg nach Afrika."]),

 dict(id="zafferana", name="Sammlung Zafferana Etnea", ort="Zafferana Etnea", lon=15.10, lat=37.69,
      seit=1999, leitung="Vier Sammlerinnen", flaeche="Wildbestände am Osthang",
      waren=["origano"],
      kurz="Wilder Oregano, im Juli bei voller Blüte geschnitten.",
      text=["Kein Anbau, sondern Sammlung: Vier Frauen schneiden im Juli wilden Oregano an den "
            "Osthängen des Ätna, bei voller Blüte, wenn der Ölgehalt am höchsten ist.",
            "Getrocknet wird im Schatten, nicht in der Sonne — Licht zerstört die ätherischen Öle. "
            "Die Rispen bleiben ganz, weil gemahlener Oregano sein Aroma binnen weniger Wochen "
            "verliert. Zwischen den Fingern zerrieben ergibt das eine ganz andere Wolke als Streugewürz."]),
]

NACH_ID = {e["id"]: e for e in ERZEUGER}

# Zuordnung Ware -> Betrieb, damit die Produktseiten verlinken können
WARE_ZU_ERZEUGER = {}
for e in ERZEUGER:
    for w in e["waren"]:
        WARE_ZU_ERZEUGER[w] = e["id"]

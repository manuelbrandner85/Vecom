(() => {
"use strict";

/* ============================================================
   1 — Katalog
   ============================================================ */
const CATS = [
  {id:"alle",      label:"Alles"},
  {id:"oel",       label:"Olivenöl & Essig"},
  {id:"suesses",   label:"Süßes"},
  {id:"antipasti", label:"Antipasti"},
  {id:"gewuerze",  label:"Gewürze & Salz"},
  {id:"geschenke", label:"Geschenke"}
];

const P = [
  {id:"olio-noc", cat:"oel", shape:"bottle", name:"Natives Olivenöl Extra – Nocellara", origin:"Valle del Belice", price:24.90, amount:500, unit:"ml",
   badge:"Ernte 2025", badgeGold:true, fill:"#C9B33A", accent:"#46551F",
   desc:"Grasig, mit Artischocke und einer klaren Schärfe im Abgang. Das Alltagsöl für alles, was roh serviert wird.",
   long:"Die Nocellara del Belice wird Mitte Oktober bei beginnender Reife gepflückt und innerhalb von vier Stunden kalt gepresst. Das ergibt ein Öl mit viel Polyphenolen: es kratzt im Hals, und genau das gehört dazu. Zu Tomaten, Bohnen, gegrilltem Fisch und zum Schluss über die Suppe.",
   specs:{"Zutaten":"100 % Olivenöl der Sorte Nocellara del Belice","Erzeuger":"Az. Agr. Lo Bue, Castelvetrano","Säuregehalt":"0,21 %","Haltbarkeit":"18 Monate ab Abfüllung"}},

  {id:"olio-bia", cat:"oel", shape:"bottle", name:"Natives Olivenöl Extra – Biancolilla", origin:"Agrigento", price:14.90, amount:250, unit:"ml",
   fill:"#D7C455", accent:"#7A8B4A",
   desc:"Milder als die Nocellara, mit Mandel und reifer Tomate. Für Menschen, denen scharfes Öl zu viel ist.",
   long:"Biancolilla ist die alte Hausolive Westsiziliens. Spät geerntet, sanft gepresst, sehr niedrige Bitterkeit. Passt zu Blattsalaten, Ricotta, Zitrusfrüchten und zum Backen.",
   specs:{"Zutaten":"100 % Olivenöl der Sorte Biancolilla","Erzeuger":"Frantoio Sciacca, Agrigento","Säuregehalt":"0,28 %","Haltbarkeit":"18 Monate ab Abfüllung"}},

  {id:"aceto", cat:"oel", shape:"bottle", name:"Weinessig aus Nero d’Avola", origin:"Val di Noto", price:11.20, amount:500, unit:"ml",
   fill:"#7A2E28", accent:"#4A2C17",
   desc:"Zwei Jahre im Kastanienfass. Dunkel, weich, ohne die scharfe Spitze industrieller Essige.",
   long:"Aus überschüssigem Nero-d’Avola-Wein der Ernte, langsam im offenen Fass vergoren. Die Süße der Traube bleibt spürbar. Für Caponata, gebratene Zwiebeln und alles Süßsaure.",
   specs:{"Zutaten":"Weinessig aus Nero d’Avola, enthält Sulfite","Erzeuger":"Cantina Buccheri, Noto","Säure":"6 %","Haltbarkeit":"36 Monate"}},

  {id:"marm-lim", cat:"suesses", shape:"jar", name:"Zitronenmarmelade Femminello", origin:"Syrakus", price:8.90, amount:340, unit:"g",
   fill:"#EDC53C", accent:"#7A8B4A",
   desc:"Mit Schale eingekocht, deutlich weniger süß als üblich. Herb im Nachgang.",
   long:"Femminello-Zitronen aus Syrakus, ungewachst, mit Schale verarbeitet. 55 g Frucht auf 100 g Marmelade, kein Pektinzusatz — die Konsistenz kommt aus der Schale. Auf gebuttertem Brot, zu Pecorino und in Mürbeteig.",
   specs:{"Zutaten":"Zitronen 55 %, Rohrzucker, Zitronensaft","Erzeuger":"Conserve Aretusa, Syrakus","Fruchtanteil":"55 g je 100 g","Haltbarkeit":"24 Monate, geöffnet kühl 4 Wochen"}},

  {id:"marm-ora", cat:"suesses", shape:"jar", name:"Blutorangen-Konfitüre Tarocco", origin:"Ebene von Catania", price:8.90, amount:340, unit:"g",
   fill:"#C8511E", accent:"#46551F",
   desc:"Tiefrot, mit feiner Bitterkeit aus der Schale. Schmeckt nach Winter am Ätna.",
   long:"Die Tarocco reift von Dezember bis März auf der vulkanischen Ebene südlich des Ätna. Der rote Farbstoff entsteht nur, wenn die Nächte kalt genug sind. Wir kochen offen im Kupferkessel, dadurch bleibt die Frucht stückig.",
   specs:{"Zutaten":"Blutorangen 58 %, Rohrzucker, Zitronensaft","Erzeuger":"Az. Agr. Grasso, Paternò","Fruchtanteil":"58 g je 100 g","Haltbarkeit":"24 Monate"}},

  {id:"pistacchio", cat:"suesses", shape:"jar", name:"Pistaziencreme aus Bronte", origin:"Bronte, Ätna-Westhang", price:16.90, amount:200, unit:"g",
   badge:"Nur 2-jährige Ernte", fill:"#8FA24A", accent:"#4A2C17",
   desc:"45 % Pistazie, keine Palmfette. Grün, weil die Pistazie grün ist — nicht wegen Farbstoff.",
   long:"Die Pistazie von Bronte wächst auf Lava und wird nur alle zwei Jahre geerntet, in Handarbeit an steilen Hängen. Entsprechend selten und teuer ist sie. Unsere Creme enthält 45 % davon, gemahlen mit Zucker, Milchpulver und Sonnenblumenöl. Auf Brioche, in Eis, oder direkt vom Löffel.",
   specs:{"Zutaten":"Pistazien 45 %, Zucker, Magermilchpulver, Sonnenblumenöl","Allergene":"Schalenfrüchte, Milch","Erzeuger":"Coop. Etnea, Bronte","Haltbarkeit":"12 Monate"}},

  {id:"miele", cat:"suesses", shape:"jar", name:"Zagara-Honig, Orangenblüte", origin:"Ribera", price:10.90, amount:250, unit:"g",
   fill:"#E9B833", accent:"#C9B33A",
   desc:"Hell, blumig, mit deutlichem Zitrusduft. Kristallisiert langsam und fein.",
   long:"Zagara ist der sizilianische Name für die Orangenblüte. Die Völker stehen von April an in den Hainen von Ribera. Kalt geschleudert, ungefiltert, nicht erhitzt — deshalb bleiben Pollen und Aroma erhalten.",
   specs:{"Zutaten":"Orangenblütenhonig, ungefiltert","Erzeuger":"Apicoltura Riberella, Ribera","Hinweis":"Nicht für Kinder unter 12 Monaten","Haltbarkeit":"24 Monate"}},

  {id:"mandorle", cat:"suesses", shape:"sack", name:"Mandeln aus Avola, naturbelassen", origin:"Avola", price:12.40, amount:250, unit:"g",
   fill:"#D9B98A", accent:"#7A5236",
   desc:"Flach, schmal, sehr aromatisch. Die Mandel, aus der Marzipan gemacht wurde, bevor es Industrie gab.",
   long:"Die Pizzuta d’Avola gilt als beste Mandel Italiens: dünne Schale, hoher Ölgehalt, intensiver Duft. Ungeröstet und ungesalzen, damit Sie selbst entscheiden. Für Granita, Mandelmilch, Pesto und Gebäck.",
   specs:{"Zutaten":"100 % Mandeln, Sorte Pizzuta","Allergene":"Schalenfrüchte","Erzeuger":"Consorzio Avola","Haltbarkeit":"12 Monate, kühl und dunkel"}},

  {id:"olive-verdi", cat:"antipasti", shape:"glass", name:"Grüne Oliven Nocellara del Belice", origin:"Castelvetrano", price:7.40, amount:314, unit:"ml",
   fill:"#8CA13F", accent:"#46551F",
   desc:"Groß, fleischig, mild. In Salzlake statt in Essig, deshalb schmeckt man die Olive.",
   long:"Die Castelvetrano-Olive wird grün geerntet und in schwacher Salzlake milchsauer vergoren. Kein Essig, keine Lauge, keine Farbe. Buttrig im Biss, ideal als Aperitivo und in der Caponata.",
   specs:{"Zutaten":"Oliven 60 %, Wasser, Meersalz","Abtropfgewicht":"180 g","Erzeuger":"Az. Agr. Lo Bue, Castelvetrano","Haltbarkeit":"24 Monate"}},

  {id:"capperi", cat:"antipasti", shape:"glass", name:"Kapern aus Pantelleria in Meersalz", origin:"Pantelleria", price:9.80, amount:100, unit:"g",
   badge:"g.g.A.", fill:"#6E7F3C", accent:"#7A5236",
   desc:"In Salz gereift, nicht in Essig eingelegt. Vor Gebrauch kurz wässern.",
   long:"Auf Pantelleria wachsen die Kapernsträucher im Windschatten niedriger Steinmauern. Die Knospen werden von Hand gepflückt und schichtweise in Meersalz gereift — so entsteht das typische, fast blumige Aroma. Für Pasta, Fisch, Caponata und Salsa verde.",
   specs:{"Zutaten":"Kapernknospen, Meersalz","Zubereitung":"10 Minuten in kaltem Wasser wässern","Erzeuger":"Coop. Pantesca","Haltbarkeit":"36 Monate"}},

  {id:"pomodori", cat:"antipasti", shape:"glass", name:"Getrocknete Tomaten in Olivenöl", origin:"Pachino", price:9.60, amount:280, unit:"g",
   fill:"#A83A21", accent:"#46551F",
   desc:"An der Sonne getrocknet, mit Oregano und Knoblauch in Olivenöl eingelegt.",
   long:"Pachino-Tomaten trocknen vier Tage auf Holzgestellen an der Südküste, bis nur noch Frucht und Süße übrig sind. Danach in nativem Olivenöl mit Oregano und einer Knoblauchzehe. Das Öl im Glas nicht wegwerfen — es ist die halbe Miete.",
   specs:{"Zutaten":"Tomaten 55 %, Olivenöl, Oregano, Knoblauch, Meersalz","Abtropfgewicht":"160 g","Erzeuger":"Conserve Pachino","Haltbarkeit":"24 Monate"}},

  {id:"pesto", cat:"antipasti", shape:"jar", name:"Pesto Siciliano mit Pistazie", origin:"Bronte / Catania", price:11.50, amount:190, unit:"g",
   fill:"#93A557", accent:"#4A2C17",
   desc:"Pistazie, Basilikum, Pecorino. Ohne Sahne, ohne Stärke, ohne Palmöl.",
   long:"Ein Löffel auf heiße Pasta, ein Löffel Kochwasser dazu, fertig. Auch gut auf gegrilltem Brot mit Ricotta. Nach dem Öffnen mit Öl bedecken und im Kühlschrank innerhalb von fünf Tagen aufbrauchen.",
   specs:{"Zutaten":"Pistazien 30 %, Sonnenblumenöl, Olivenöl, Basilikum, Pecorino, Meersalz","Allergene":"Schalenfrüchte, Milch","Erzeuger":"Coop. Etnea, Bronte","Haltbarkeit":"18 Monate"}},

  {id:"sale", cat:"gewuerze", shape:"sack", name:"Meersalz aus den Salinen von Trapani", origin:"Trapani", price:5.90, amount:500, unit:"g",
   fill:"#E4E0D2", accent:"#1E4A4E",
   desc:"Von Wind und Sonne getrocknet, grob vermahlen. Mineralisch, nicht bloß salzig.",
   long:"In den Salinen zwischen Trapani und Marsala wird seit der Antike Meerwasser in flachen Becken verdunstet. Das Salz wird von Hand geschöpft, ungewaschen und ohne Rieselhilfen abgefüllt. Es klumpt deshalb leicht — ein gutes Zeichen.",
   specs:{"Zutaten":"100 % Meersalz, unraffiniert","Körnung":"grob, mittel gemahlen","Erzeuger":"Saline Ettore, Trapani","Haltbarkeit":"unbegrenzt bei trockener Lagerung"}},

  {id:"origano", cat:"gewuerze", shape:"sack", name:"Oregano vom Ätna-Hang", origin:"Zafferana Etnea", price:6.50, amount:30, unit:"g",
   fill:"#6E7F3C", accent:"#7A5236",
   desc:"Ganze Rispen, luftgetrocknet. Zwischen den Fingern zerrieben ergibt das eine ganz andere Wolke als Streugewürz.",
   long:"Wilder Oregano wird im Juli bei voller Blüte geschnitten und im Schatten getrocknet. Wir lassen die Rispen ganz, weil gemahlener Oregano sein Öl innerhalb weniger Wochen verliert. Für Tomatensalat, Pizza, gegrilltes Gemüse.",
   specs:{"Zutaten":"100 % wilder Oregano, ganze Rispen","Erzeuger":"Sammlung Zafferana Etnea","Ernte":"Juli 2025","Haltbarkeit":"24 Monate"}},

  {id:"box", cat:"geschenke", shape:"crate", name:"Geschenkkiste „Piccola Sicilia“", origin:"Fünf Erzeugnisse", price:59.00, amount:1, unit:"St",
   badge:"Versandkostenfrei", badgeGold:true, fill:"#B98B52", accent:"#46551F",
   desc:"Olivenöl 250 ml, Zitronenmarmelade, Pistaziencreme, Kapern und Oregano in der Holzkiste.",
   long:"Unsere Auswahl für alle, die Sizilien noch nicht im Schrank haben. In einer Holzkiste mit Holzwolle, dazu eine Karte mit Herkunft und Erzeuger jedes Glases. Auf Wunsch legen wir eine handgeschriebene Grußkarte bei — schreiben Sie den Text einfach ins Bemerkungsfeld der Bestellung.",
   specs:{"Inhalt":"Olivenöl Biancolilla 250 ml, Zitronenmarmelade 340 g, Pistaziencreme 190 g, Kapern 100 g, Oregano 30 g","Verpackung":"Holzkiste 30 × 20 × 12 cm","Gewicht":"ca. 2,1 kg","Hinweis":"Versandkostenfrei innerhalb Deutschlands"}}
];

/* ============================================================
   2 — Warenbilder: Studioaufnahmen, eine Session, ein Licht
   ============================================================ */
const SEITEN = {"olio-noc": "produkt-natives-olivenoel-extra-nocellara.html", "olio-bia": "produkt-natives-olivenoel-extra-biancolilla.html", "aceto": "produkt-weinessig-aus-nero-davola.html", "marm-lim": "produkt-zitronenmarmelade-femminello.html", "marm-ora": "produkt-blutorangen-konfituere-tarocco.html", "pistacchio": "produkt-pistaziencreme-aus-bronte.html", "miele": "produkt-zagara-honig-orangenbluete.html", "mandorle": "produkt-mandeln-aus-avola-naturbelassen.html", "olive-verdi": "produkt-gruene-oliven-nocellara-del-belice.html", "capperi": "produkt-kapern-aus-pantelleria-in-meersalz.html", "pomodori": "produkt-getrocknete-tomaten-in-olivenoel.html", "pesto": "produkt-pesto-siciliano-mit-pistazie.html", "sale": "produkt-meersalz-aus-den-salinen-von-trapani.html", "origano": "produkt-oregano-vom-aetna-hang.html", "box": "produkt-geschenkkiste-piccola-sicilia.html"};  /* eigene Seite je Erzeugnis, sofern vorhanden */
const IMG  = {"olio-noc": "assets/img/produkte/olio-noc", "olio-bia": "assets/img/produkte/olio-bia", "aceto": "assets/img/produkte/aceto", "marm-lim": "assets/img/produkte/marm-lim", "marm-ora": "assets/img/produkte/marm-ora", "pistacchio": "assets/img/produkte/pistacchio", "miele": "assets/img/produkte/miele", "mandorle": "assets/img/produkte/mandorle", "olive-verdi": "assets/img/produkte/olive-verdi", "capperi": "assets/img/produkte/capperi", "pomodori": "assets/img/produkte/pomodori", "pesto": "assets/img/produkte/pesto", "sale": "assets/img/produkte/sale", "origano": "assets/img/produkte/origano", "box": "assets/img/produkte/box"};
const REISE = {"agrigento": {"pfad": "assets/img/reise/agrigento", "lqip": "data:image/webp;base64,UklGRr4CAABXRUJQVlA4WAoAAAAgAAAAFwAADAAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDgg0AAAAHAEAJ0BKhgADQA+tUieSackIqEwCADgFolAE6ZQBLNc7ML/xLuKk93eMiRAAP5qo6UKyueajPXG7ZQpBhznCa1es1030tC/01B+PKUwZdNS8zkKXN3c0/uey4eIbIcriiZ4IoOkVUZnNpDKbpuU1+R/hj5Rn84xBIqvbH/0DxS7X71cZQJdNqTd+U+AlP5UR1iupKeAj4nXqoA+2J9+Myavr7lo1LffvIBp7OsujDUa6BYjYh/9lAnAyHKrSKfn9BpL2vkQole9ui1bliBoAAA=", "tiefe": "assets/img/tiefe/agrigento.webp"}, "pantelleria": {"pfad": "assets/img/reise/pantelleria", "lqip": "data:image/webp;base64,UklGRn4AAABXRUJQVlA4IHIAAAAQBACdASoYAA4APwFqrU8rJaQiMAgBYCAJYwDFEUB1f4DaBATDERYvOAD+tf43CrA16apKw5vrEg+I8FPe+4TSQhcJQFfAjCdxX/Jr6+SA7zTQ9/GLfPrSVmCXYg1D5KKI0BtGDjk45W10mTWcU8cAAAA=", "tiefe": "assets/img/tiefe/pantelleria.webp"}, "salinen": {"pfad": "assets/img/reise/salinen", "lqip": "data:image/webp;base64,UklGRpQAAABXRUJQVlA4IIgAAADwAwCdASoYAA4APwFsrk+rJiQiMAgBYCAJbACdMoACKo/Y1gDxBMvAAP6DLVoleko8ZEczIevvdgBXsv+0uoAtvyc2tLh5Fm/iub1Bk1DEBfqf6PeFdIWNO3JFYH6dpNEKgGHMO8JsNkNR3NLSJ81wh6XdVnxn0BOwyQCt7iWkdkomijQSBgAA", "tiefe": "assets/img/tiefe/salinen.webp"}, "aetna": {"pfad": "assets/img/reise/aetna", "lqip": "data:image/webp;base64,UklGRmwAAABXRUJQVlA4IGAAAADwAwCdASoYAA4APwFsrk8rJaQiMAgBYCAJQBOgA8NhYUaMvjHL13ZgAP6DxMG7/WQMpE+ytCEIOEsa+RObDyHGVSoeds5DpWSOPpeb9brwGSD4RbtUcoLjX7CvSja+oAA=", "tiefe": "assets/img/tiefe/aetna.webp"}, "hain": {"pfad": "assets/img/reise/hain", "lqip": "data:image/webp;base64,UklGRpgAAABXRUJQVlA4IIwAAAAQBACdASoYAA4APwFqrU8rJiQiMAgBYCAJZACdMoABnYYwN9PFX+FggAD+0avCLzzzZYv5Si7yeEOtkSKvpz0BO4VYTUQdG+X8/+bcPHLGTz/7IIpGFvj+nuZ9K3K6NUX8fV3KORNycF1mFkgRVLI7yGA985YR0ecvX0fXdJaXZUEHEyvj7kFI/qAAAA==", "tiefe": "assets/img/tiefe/hain.webp"}, "muehle": {"pfad": "assets/img/reise/muehle", "lqip": "data:image/webp;base64,UklGRpQAAABXRUJQVlA4IIgAAAAwBACdASoYAA4APwFsrU8rJiQiMAgBYCAJYgCdABb4imf584UKjoVH2AAA/ulGRdjO2/ctQ7bNFxO7pR6aknG4Kc/LM395giwj99DXfpG54Yn4nS6Rvb82osrt+PRCRl2illmyBS9OfG6NWuLr+GQraQTtLKMIqynb8cCnSxFTEjL4ZgqlNjQA", "tiefe": "assets/img/tiefe/muehle.webp"}, "versand": {"pfad": "assets/img/reise/versand", "lqip": "data:image/webp;base64,UklGRo4AAABXRUJQVlA4IIIAAAAQBACdASoYAA4APwFsrU8rJiQiMAgBYCAJZgCdACH6r6D2tXi/jLXoAAD+415lS8/F5uE1UlG8sRPq6MeVjm1TOnhUjhoiKXRQcCaIGh0Mk5Lxfg4Y8cP/QMxjmSYMobHM/dnmJsjiSPska6VC6qYMIwC00g9c3Pg6LbvRMs24AAAA", "tiefe": "assets/img/tiefe/versand.webp"}};   /* Kapitelbilder, auch von der großen Navigation genutzt */
const SUCHE = [{"t": "Natives Olivenöl Extra – Nocellara", "s": "Valle del Belice", "a": "ware", "id": "olio-noc", "u": "produkt-natives-olivenoel-extra-nocellara.html", "b": "assets/img/produkte/olio-noc-680.webp"}, {"t": "Natives Olivenöl Extra – Biancolilla", "s": "Agrigento", "a": "ware", "id": "olio-bia", "u": "produkt-natives-olivenoel-extra-biancolilla.html", "b": "assets/img/produkte/olio-bia-680.webp"}, {"t": "Weinessig aus Nero d’Avola", "s": "Val di Noto", "a": "ware", "id": "aceto", "u": "produkt-weinessig-aus-nero-davola.html", "b": "assets/img/produkte/aceto-680.webp"}, {"t": "Zitronenmarmelade Femminello", "s": "Syrakus", "a": "ware", "id": "marm-lim", "u": "produkt-zitronenmarmelade-femminello.html", "b": "assets/img/produkte/marm-lim-680.webp"}, {"t": "Blutorangen-Konfitüre Tarocco", "s": "Ebene von Catania", "a": "ware", "id": "marm-ora", "u": "produkt-blutorangen-konfituere-tarocco.html", "b": "assets/img/produkte/marm-ora-680.webp"}, {"t": "Pistaziencreme aus Bronte", "s": "Bronte, Ätna-Westhang", "a": "ware", "id": "pistacchio", "u": "produkt-pistaziencreme-aus-bronte.html", "b": "assets/img/produkte/pistacchio-680.webp"}, {"t": "Zagara-Honig, Orangenblüte", "s": "Ribera", "a": "ware", "id": "miele", "u": "produkt-zagara-honig-orangenbluete.html", "b": "assets/img/produkte/miele-680.webp"}, {"t": "Mandeln aus Avola, naturbelassen", "s": "Avola", "a": "ware", "id": "mandorle", "u": "produkt-mandeln-aus-avola-naturbelassen.html", "b": "assets/img/produkte/mandorle-680.webp"}, {"t": "Grüne Oliven Nocellara del Belice", "s": "Castelvetrano", "a": "ware", "id": "olive-verdi", "u": "produkt-gruene-oliven-nocellara-del-belice.html", "b": "assets/img/produkte/olive-verdi-680.webp"}, {"t": "Kapern aus Pantelleria in Meersalz", "s": "Pantelleria", "a": "ware", "id": "capperi", "u": "produkt-kapern-aus-pantelleria-in-meersalz.html", "b": "assets/img/produkte/capperi-680.webp"}, {"t": "Getrocknete Tomaten in Olivenöl", "s": "Pachino", "a": "ware", "id": "pomodori", "u": "produkt-getrocknete-tomaten-in-olivenoel.html", "b": "assets/img/produkte/pomodori-680.webp"}, {"t": "Pesto Siciliano mit Pistazie", "s": "Bronte / Catania", "a": "ware", "id": "pesto", "u": "produkt-pesto-siciliano-mit-pistazie.html", "b": "assets/img/produkte/pesto-680.webp"}, {"t": "Meersalz aus den Salinen von Trapani", "s": "Trapani", "a": "ware", "id": "sale", "u": "produkt-meersalz-aus-den-salinen-von-trapani.html", "b": "assets/img/produkte/sale-680.webp"}, {"t": "Oregano vom Ätna-Hang", "s": "Zafferana Etnea", "a": "ware", "id": "origano", "u": "produkt-oregano-vom-aetna-hang.html", "b": "assets/img/produkte/origano-680.webp"}, {"t": "Geschenkkiste „Piccola Sicilia“", "s": "Fünf Erzeugnisse", "a": "ware", "id": "box", "u": "produkt-geschenkkiste-piccola-sicilia.html", "b": "assets/img/produkte/box-680.webp"}, {"t": "Caponata", "s": "Das süßsaure Auberginengemüse, an dem sich jede sizilianische Küche messen lässt.", "a": "rezept", "u": "rezept-caponata.html", "b": "assets/img/produkte/aceto-b-680.webp"}, {"t": "Bruschetta mit getrockneten Tomaten", "s": "Fünf Minuten Arbeit, und trotzdem der Teller, nach dem alle greifen.", "a": "rezept", "u": "rezept-bruschetta-mit-getrockneten-tomaten.html", "b": "assets/img/produkte/pomodori-c-680.webp"}, {"t": "Pasta mit Pistazienpesto", "s": "Bronte auf dem Teller. Zehn Minuten, solange die Nudeln kochen.", "a": "rezept", "u": "rezept-pasta-mit-pistazienpesto.html", "b": "assets/img/produkte/pesto-b-680.webp"}, {"t": "Spaghetti mit Kapern und Tomaten", "s": "Vorratsküche im besten Sinn: alles kommt aus dem Schrank, nichts schmeckt danach.", "a": "rezept", "u": "rezept-spaghetti-mit-kapern-und-tomaten.html", "b": "assets/img/produkte/capperi-c-680.webp"}, {"t": "Tomatensalat mit Oregano", "s": "Vier Zutaten. Deshalb entscheidet jede einzelne.", "a": "rezept", "u": "rezept-tomatensalat-mit-oregano.html", "b": "assets/img/produkte/origano-c-680.webp"}, {"t": "Süßsaure Zwiebeln", "s": "Die Beilage, die kaltes Fleisch, Käse und geröstetes Brot rettet.", "a": "rezept", "u": "rezept-suesssaure-zwiebeln.html", "b": "assets/img/produkte/aceto-c-680.webp"}, {"t": "Brioche mit Pistaziencreme", "s": "Das sizilianische Frühstück. Mehr Anleitung braucht es kaum.", "a": "rezept", "u": "rezept-brioche-mit-pistaziencreme.html", "b": "assets/img/produkte/pistacchio-b-680.webp"}, {"t": "Pecorino mit Zagara-Honig", "s": "Der einfachste Nachtisch der Insel — und der, an den man sich erinnert.", "a": "rezept", "u": "rezept-pecorino-mit-zagara-honig.html", "b": "assets/img/produkte/miele-b-680.webp"}, {"t": "Az. Agr. Lo Bue", "s": "Castelvetrano · seit 1961", "a": "erzeuger", "u": "erzeuger-az-agr-lo-bue.html", "b": "assets/img/produkte/olio-noc-680.webp"}, {"t": "Frantoio Sciacca", "s": "Sciacca, Provinz Agrigento · seit 1978", "a": "erzeuger", "u": "erzeuger-frantoio-sciacca.html", "b": "assets/img/produkte/olio-bia-680.webp"}, {"t": "Cantina Buccheri", "s": "Buccheri bei Noto · seit 1994", "a": "erzeuger", "u": "erzeuger-cantina-buccheri.html", "b": "assets/img/produkte/aceto-680.webp"}, {"t": "Conserve Aretusa", "s": "Syrakus · seit 1986", "a": "erzeuger", "u": "erzeuger-conserve-aretusa.html", "b": "assets/img/produkte/marm-lim-680.webp"}, {"t": "Az. Agr. Grasso", "s": "Paternò · seit 1952", "a": "erzeuger", "u": "erzeuger-az-agr-grasso.html", "b": "assets/img/produkte/marm-ora-680.webp"}, {"t": "Coop. Etnea", "s": "Bronte · seit 1974", "a": "erzeuger", "u": "erzeuger-coop-etnea.html", "b": "assets/img/produkte/pistacchio-680.webp"}, {"t": "Apicoltura Riberella", "s": "Ribera · seit 2003", "a": "erzeuger", "u": "erzeuger-apicoltura-riberella.html", "b": "assets/img/produkte/miele-680.webp"}, {"t": "Consorzio Avola", "s": "Avola · seit 1969", "a": "erzeuger", "u": "erzeuger-consorzio-avola.html", "b": "assets/img/produkte/mandorle-680.webp"}, {"t": "Coop. Pantesca", "s": "Pantelleria · seit 1971", "a": "erzeuger", "u": "erzeuger-coop-pantesca.html", "b": "assets/img/produkte/capperi-680.webp"}, {"t": "Conserve Pachino", "s": "Pachino · seit 1988", "a": "erzeuger", "u": "erzeuger-conserve-pachino.html", "b": "assets/img/produkte/pomodori-680.webp"}, {"t": "Saline Ettore", "s": "Trapani · seit 1830", "a": "erzeuger", "u": "erzeuger-saline-ettore.html", "b": "assets/img/produkte/sale-680.webp"}, {"t": "Sammlung Zafferana Etnea", "s": "Zafferana Etnea · seit 1999", "a": "erzeuger", "u": "erzeuger-sammlung-zafferana-etnea.html", "b": "assets/img/produkte/origano-680.webp"}, {"t": "Olivenöl & Essig", "s": "Sizilianisches Olivenöl und Weinessig, sortenrein und kalt gepresst", "a": "gruppe", "u": "kategorie-olivenoel-essig.html"}, {"t": "Süßes & Konfitüren", "s": "Sizilianische Konfitüren, Pistaziencreme, Honig und Mandeln", "a": "gruppe", "u": "kategorie-suesses-konfitueren.html"}, {"t": "Antipasti", "s": "Oliven, Kapern, getrocknete Tomaten und Pesto aus Sizilien", "a": "gruppe", "u": "kategorie-antipasti.html"}, {"t": "Gewürze & Salz", "s": "Meersalz aus Trapani und wilder Oregano vom Ätna", "a": "gruppe", "u": "kategorie-gewuerze-salz.html"}, {"t": "Geschenkkisten", "s": "Sizilianische Geschenkkiste mit fünf Erzeugnissen", "a": "gruppe", "u": "kategorie-geschenkkisten.html"}];   /* Erzeugnisse, Rezepte, Erzeuger, Warengruppen */
const ANSICHTEN = {"olio-noc": ["", "b", "c"], "olio-bia": ["", "b", "c"], "aceto": ["", "b", "c"], "marm-lim": ["", "b", "c"], "marm-ora": ["", "b", "c"], "pistacchio": ["", "b", "c"], "miele": ["", "b", "c"], "mandorle": ["", "b", "c"], "olive-verdi": ["", "b", "c"], "capperi": ["", "b", "c"], "pomodori": ["", "b", "c"], "pesto": ["", "b", "c"], "sale": ["", "b", "c"], "origano": ["", "b", "c"], "box": ["", "b", "c"]};   /* weitere Ansichten je Erzeugnis, leer in der Einzeldatei */
const ANSICHT_NAME = {"":"Produktansicht", b:"Detailaufnahme", c:"Auf dem Tisch"};   /* Pfad oder Daten-URI je Erzeugnis */
const LQIP = {"olio-noc": "data:image/webp;base64,UklGRnQAAABXRUJQVlA4IGgAAACQBACdASoUABQAPwlws1GrpiSisBgIAXAhCWMArhwPSFNf5bYcQmZJ/Bx/DKAA/uG4GAXUo5JRnI75zxdGI692o5arxn7AWfUDuFcpYzZAmUl1xKpfmIqQNxSyBvhr7bgdSQzgADwAAA==", "olio-bia": "data:image/webp;base64,UklGRnoAAABXRUJQVlA4IG4AAABwBACdASoUABQAPwlysVGrpqSisBgIAXAhCUAYUAHpAzbVVZpEgaLCj57CAAD+4bgYBnXvp0qX00delzOqcUzXvMEQbbRY29+u/Z0l/crY79SUOSYmuCFcKZV7qhJ0kRdRasGUjDQgi7nU4AAAAA==", "aceto": "data:image/webp;base64,UklGRoAAAABXRUJQVlA4IHQAAAAQBQCdASoUABQAPwl6sFQrp6QjKAqpcCEJYwCo9BEc4Mwz1baVs2N3ERD4BW4S8UyoAP5rbiQENcPe/RHBGrkXawX9fEIPzt7fpbr2aYMhDF8uB1DWCuXZemV902UCwAp8cwUQ/TYaQAXZDuPlBd2QcQAAAA==", "marm-lim": "data:image/webp;base64,UklGRn4AAABXRUJQVlA4IHIAAABwBACdASoUABQAPwl4s1MrpySiqAqpcCEJQBYj5fgreZD9ezsGqGh2nUfJAAD+4bf8RNtT1Zwd4d/8jYzeLWw3S5+t/Jogo4EQIykuSzTmqrdSumnyq7vXmAP5r+KuVZKR7gxB+PLhWb+lzfAXeTvAAAA=", "marm-ora": "data:image/webp;base64,UklGRoQAAABXRUJQVlA4IHgAAADQBACdASoUABQAPwl4sVQrpyQjKAqpcCEJQBdmZfgwAf8yLQgu7UtL5c3+YUllcAD+t4G5fO4bXpCRpe+ApclEy8mYIwQf7uiYiWikffi2UGk2llpd2fDpJTlk/uylKJ0siiLqVqIKxXoBtRUy20yq9e4QNF72AAA=", "pistacchio": "data:image/webp;base64,UklGRn4AAABXRUJQVlA4IHIAAADQBACdASoUABQAPwl8tVSrp6SjKAgBcCEJYwCsM1XBf8JvsTLQOu+8AWrmPuAZgAD96olWiw0vQtS8Yw6QbCYDZIp09gTOxRjyoE+w6PaPXqN23a1UAYlTtWW/HvZ+8YRmqakaZPsqJyEXgfu0ACuoAAA=", "miele": "data:image/webp;base64,UklGRnoAAABXRUJQVlA4IG4AAABQBACdASoUABQAPwlwslArpiSiqA1RcCEJQBadAiOWHE1UpAEMt2Ze0dYAAP621BzxU+rLKVRGe/TeD/0mGQDqLCOyDrj7NgDJyNftpNnaCME5Phu1Zpm61s2xRCoD5/KWJFMS7F4HFzt1sAAAAA==", "mandorle": "data:image/webp;base64,UklGRnIAAABXRUJQVlA4IGYAAAAQBQCdASoUABQAPwl2tVKrpyUiqAqpcCEJZQCw7BEc4TTUOX8F0RLzlFQXCCNRoR8AAP6209vJHJhyKDVEp7gjw1qjxOlJKz+Ts6TOecOCjkPFatQhVEz4espt+Ve4U/XBx5IgAAA=", "olive-verdi": "data:image/webp;base64,UklGRnQAAABXRUJQVlA4IGgAAADwBACdASoUABQAPwl+tlUrqCSjKAgBcCEJYwC+SA9my3ddsfGFJx97wtjncRSwPgAA/rY4nWZUfX7PjFQpwi75LREl+S5HL0zO5CxvMUo9ilm0ITvITqVU5uy1GtDUdtRGeIbFsDAAAA==", "capperi": "data:image/webp;base64,UklGRmgAAABXRUJQVlA4IFwAAACwBACdASoUABQAPwl0sFGrpqSiqA1RcCEJZQDGfBEz1J9QKeWB+3WVMvqO4iPAAP7ekMLjUvaqYanknU6iXttNvTuPUoUSbTt1o2Uha5FkrqPlfVPWu0H1uNQAAA==", "pomodori": "data:image/webp;base64,UklGRnAAAABXRUJQVlA4IGQAAACwBACdASoUABQAPwl4sVOrpyQiqAqpcCEJZQC9WBEc3S1vNRKio8dleY3TwLmAAP7TDmcafjOyylGvgl31xVbJb36MzRuT9JxQEIaCMESv+JmDRuiLVWCTBv8h1/DX7wR82AAA", "pesto": "data:image/webp;base64,UklGRnoAAABXRUJQVlA4IG4AAADQBACdASoUABQAPwl4sFOrpyQiqAqpcCEJYwC/OA9pkZEZ2QDn1EJNErDBSoQpEAD+t/d8C7nk27oNy/sAacOSWPmToH5aD4ydXwAtLxeWqEuCoTVP/8fdJBGwRA/MLRy+INApEKH0qYlr4lzAAA==", "sale": "data:image/webp;base64,UklGRnAAAABXRUJQVlA4IGQAAACwBACdASoUABQAPwVork+rpaQiN/VYAXAgiWUAtOgPSNQ053aJTc8sQAe85SOAAP5kDbF1bDQZ9twGt5vWJSJqCrdc4SpzUmH3RREY0XU6wikM1wQ7Lh3tKxac5X9xoFDVgAAA", "origano": "data:image/webp;base64,UklGRnAAAABXRUJQVlA4IGQAAAAwBQCdASoUABQAPwlosE+rpaSiMBgMAXAhCWUAuwAQ7/eamKDS85ry+8c1Ls76i6OyAAD+3n1HJ6v92B3907Df2bFAZfWpCF+/aFPbQh5/Q+1FcxsxPEns0cXcNfGYoHxgZIAA", "box": "data:image/webp;base64,UklGRnwAAABXRUJQVlA4IHAAAADQBACdASoUABQAPwl2r1KrpyQiqA1RcCEJYx8AHiAEd4BwtmYtNUqmXxbd58mjAAD+5xdLF8dSbCQj3Q6KAk2dVXsf+8pmhVwNlJ+nLsMKeuHs401NIEXtWMVoHJ3HyujbvvCcm9DjnceCwLZQAAAA"};  /* 20 px unscharfe Vorschau, füllt die Fläche bis das Foto da ist */

/* Ein Bild, ausgeliefert in der Auflösung, die der Platz wirklich braucht. */
function quelle(p, v, sizes){
  const q = IMG[p.id];
  if(q.startsWith("data:")) return `src="${q}"`;
  const b = q + (v ? "-" + v : "");
  return `src="${b}-680.webp" srcset="${b}-680.webp 680w, ${b}-1024.webp 1024w" sizes="${sizes}"`;
}

function img(p, sizes){
  return `<img class="bild" ${quelle(p, "", sizes)} alt="${p.name} – ${p.origin}" `
       + `width="680" height="680" loading="lazy" decoding="async">`;
}

/* Weitere Ansichten: Streifen unter dem Bild, tauscht die Hauptaufnahme */
function galerie(p, sizes){
  const vs = ANSICHTEN[p.id];
  if(!vs || vs.length < 2) return "";
  const q = IMG[p.id];
  return `<div class="galerie" role="group" aria-label="Weitere Ansichten von ${p.name}">`
    + vs.map((v,i) => {
        const b = q + (v ? "-" + v : "");
        return `<button type="button" data-ansicht="${b}" data-sizes="${sizes}"`
             + ` aria-pressed="${i===0}" aria-label="${ANSICHT_NAME[v] || "Ansicht " + (i+1)}">`
             + `<img src="${b}-680.webp" alt="" width="680" height="680" loading="lazy" decoding="async"></button>`;
      }).join("")
    + `</div>`;
}
const lqip = p => LQIP[p.id] ? ` style="background-image:url(${LQIP[p.id]})"` : "";

/* ============================================================
   3 — Formate & Hilfen
   ============================================================ */
const eur = n => n.toLocaleString("de-DE",{style:"currency",currency:"EUR"});
const $  = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));

function basePrice(p){
  if(p.unit === "St") return "";
  const per = p.unit === "g" ? 1000 : 1000;
  const u   = p.unit === "g" ? "kg" : "l";
  return `${eur(p.price / p.amount * per)} / ${u}`;
}
const amountLabel = p => p.unit === "St" ? "1 Kiste" : `${p.amount} ${p.unit}`;

/* ============================================================
   4 — Zustand
   ============================================================ */
const state = { cat:"alle", q:"", cart:[], step:1, order:{
  land:"DE", versand:"standard", zahlung:"rechnung", daten:{}
}};

const SPEICHER = "vecom.warenkorb.v1";
function warenkorbSichern(){
  try{ localStorage.setItem(SPEICHER, JSON.stringify(state.cart)); }catch(e){ /* Speicher gesperrt: dann eben nur für diese Sitzung */ }
}
function warenkorbLaden(){
  try{
    const roh = JSON.parse(localStorage.getItem(SPEICHER) || "[]");
    if(!Array.isArray(roh)) return;
    /* Nur übernehmen, was es heute noch gibt, und zum aktuellen Preis */
    state.cart = roh
      .filter(l => l && P.some(p => p.id === l.id))
      .map(l => { const p = P.find(x => x.id === l.id);
        return { id:p.id, qty:Math.min(Math.max(parseInt(l.qty,10)||1,1),20), price:p.price, name:p.name }; });
  }catch(e){ /* nichts gespeichert oder unlesbar */ }
}

const cartCount = () => state.cart.reduce((n,l)=>n+l.qty,0);
const subtotal  = () => state.cart.reduce((n,l)=>n+l.qty*l.price,0);

function shipCost(){
  const sub = subtotal();
  if(!sub) return 0;
  const free = {DE:59, AT:89, CH:Infinity}[state.order.land];
  const base = {DE:4.90, AT:8.90, CH:14.90}[state.order.land];
  let c = sub >= free ? 0 : base;
  if(state.order.versand === "express") c += 6.00;
  return c;
}
const total = () => subtotal() + shipCost();

/* ============================================================
   5 — Toast
   ============================================================ */
let toastT;
function toast(msg){
  const t = $("#toast");
  t.textContent = msg;
  t.classList.add("on");
  clearTimeout(toastT);
  toastT = setTimeout(()=>t.classList.remove("on"), 2600);
}

/* ============================================================
   6 — Raster & Filter
   ============================================================ */
function visible(){
  const q = state.q.trim().toLowerCase();
  return P.filter(p=>{
    const okCat = state.cat === "alle" || p.cat === state.cat;
    const okQ = !q || (p.name+" "+p.origin+" "+p.desc+" "+p.long).toLowerCase().includes(q);
    return okCat && okQ;
  });
}

function renderFilters(){
  $("#filters").innerHTML = CATS.map(c=>
    `<button class="chip" type="button" data-cat="${c.id}" aria-pressed="${state.cat===c.id}">${c.label}</button>`
  ).join("");
}

function renderGrid(){
  const list = visible();
  /* Nur im ungefilterten Sortiment führt ein Erzeugnis die Reihe an */
  const fuehrt = state.cat === "alle" && !state.q.trim();
  $("#grid").innerHTML = list.map((p, i) => `
    <article class="card${fuehrt && i === 0 ? ' card--gross' : ''}">
      <div class="card__media"${lqip(p)}>
        ${p.badge ? `<span class="card__flag${p.badgeGold?" card__flag--gold":""}">${p.badge}</span>` : ""}
        ${img(p, "(max-width:679px) 46vw, (max-width:1023px) 30vw, 290px")}
      </div>
      <div class="card__body">
        <p class="card__origin">${p.origin}</p>
        <h3 class="card__name"><a href="${SEITEN[p.id] || "#"}" data-open="${p.id}">${p.name}</a></h3>
        <p class="card__desc">${p.desc}</p>
        <div class="card__foot">
          <div>
            <div class="card__price">${eur(p.price)}</div>
            <div class="card__base">${amountLabel(p)}</div>
            ${basePrice(p) ? `<div class="card__base">${basePrice(p)}</div>` : ""}
          </div>
          <button class="card__add" type="button" data-add="${p.id}" aria-label="${p.name} in den Warenkorb legen">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>
          </button>
        </div>
      </div>
    </article>`).join("");

  $("#empty").hidden = list.length > 0;
  $("#empty").setAttribute("aria-hidden", String(list.length > 0));
  $("#resultCount").textContent = list.length === 1 ? "1 Produkt" : `${list.length} Produkte`;
}

/* ============================================================
   7 — Warenkorb
   ============================================================ */
function addToCart(id, qty=1){
  const p = P.find(x=>x.id===id);
  const line = state.cart.find(l=>l.id===id);
  if(line) line.qty += qty; else state.cart.push({id, qty, price:p.price, name:p.name});
  renderCart();
  const n = $("#cartCount");
  n.classList.remove("bump"); void n.offsetWidth; n.classList.add("bump");
  toast(`${p.name} liegt im Warenkorb.`);
}

function setQty(id, qty){
  const line = state.cart.find(l=>l.id===id);
  if(!line) return;
  line.qty = qty;
  if(line.qty < 1) state.cart = state.cart.filter(l=>l.id!==id);
  renderCart();
}

function renderCart(){
  warenkorbSichern();
  const n = cartCount();
  const badge = $("#cartCount");
  badge.textContent = n;
  badge.classList.toggle("on", n>0);
  $("#cartToggle").setAttribute("aria-label", n ? `Warenkorb öffnen, ${n} Artikel` : "Warenkorb öffnen");

  const body = $("#cartBody");
  if(!n){
    body.innerHTML = `<div class="empty" style="margin-top:2rem">Noch nichts drin.<br><br>
      <button class="btn btn--ghost" type="button" data-close>Sortiment ansehen</button></div>`;
    $("#cartFoot").hidden = true;
    return;
  }
  $("#cartFoot").hidden = false;

  body.innerHTML = state.cart.map(l=>{
    const p = P.find(x=>x.id===l.id);
    return `<div class="line">
      <div class="line__media"${lqip(p)}>${img(p, "74px")}</div>
      <div>
        <p class="line__name">${p.name}</p>
        <p class="line__meta">${amountLabel(p)} · ${eur(p.price)}</p>
        <div class="line__row">
          <div class="qty">
            <button type="button" data-qty="${l.id}" data-d="-1" aria-label="Menge verringern">−</button>
            <span aria-live="polite">${l.qty}</span>
            <button type="button" data-qty="${l.id}" data-d="1" aria-label="Menge erhöhen">+</button>
          </div>
          <span class="line__price">${eur(l.qty*l.price)}</span>
        </div>
        <button class="line__del" type="button" data-del="${l.id}">Entfernen</button>
      </div>
    </div>`;
  }).join("");

  const sub = subtotal(), free = {DE:59, AT:89, CH:Infinity}[state.order.land];
  const rest = free - sub;
  $("#shipbar").innerHTML = (state.order.land === "CH")
    ? `Schweiz: Versand 14,90 € zzgl. Einfuhrabgaben.`
    : (rest > 0
      ? `Noch <b>${eur(rest)}</b> bis zum kostenfreien Versand.
         <div class="shipbar__track"><div class="shipbar__fill" style="width:${Math.min(100, sub/free*100)}%"></div></div>`
      : `Versandkostenfrei — erreicht.
         <div class="shipbar__track"><div class="shipbar__fill" style="width:100%"></div></div>`);

  $("#cartSum").innerHTML = `
    <div><span>Zwischensumme</span><span>${eur(sub)}</span></div>
    <div><span>Versand (${state.order.land})</span><span>${shipCost() === 0 ? "kostenfrei" : eur(shipCost())}</span></div>
    <div class="tot"><span>Summe</span><span>${eur(total())}</span></div>
    <small>inkl. 7 % MwSt. (Lebensmittel) · Lieferzeit 1–2 Werktage</small>`;
}

/* ============================================================
   8 — Overlay-Verwaltung mit Fokusführung
   ============================================================ */
let lastFocus = null;
const BACKGROUND = ["header.head", "main", "footer.foot"];
function setBackgroundInert(on){
  BACKGROUND.forEach(sel=>{
    const el = document.querySelector(sel);
    if(!el) return;
    if(on) el.setAttribute("inert",""); else el.removeAttribute("inert");
  });
}
const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),select,textarea,[tabindex]:not([tabindex="-1"])';

function anyOverlayOpen(){
  return $("#cart").classList.contains("on") || $("#modal").classList.contains("on")
      || ($("#welt") && $("#welt").classList.contains("on"));
}

function openOverlay(el){
  if(!anyOverlayOpen()) lastFocus = document.activeElement;
  $("#scrim").classList.add("on");
  el.classList.add("on");
  el.setAttribute("aria-hidden","false");
  document.body.classList.add("is-locked");
  setBackgroundInert(true);
  const first = el.querySelector(FOCUSABLE);
  setTimeout(()=>first && first.focus(), 60);
}

function closeOverlays(){
  $("#scrim").classList.remove("on");
  ["#cart","#modal","#welt"].forEach(s=>{
    const el = $(s);
    el.classList.remove("on");
    el.setAttribute("aria-hidden","true");
  });
  document.body.classList.remove("is-locked");
  const w = $("#welt"); if(w) w.setAttribute("aria-hidden","true");
  const nt = $("#navToggle");
  if(nt){ nt.setAttribute("aria-expanded","false"); nt.setAttribute("aria-label","Menü öffnen"); }
  setBackgroundInert(false);
  if(lastFocus) { lastFocus.focus(); lastFocus = null; }
}

function trap(e){
  const open = $("#cart").classList.contains("on") ? $("#cart")
             : $("#modal").classList.contains("on") ? $("#modal")
             : ($("#welt") && $("#welt").classList.contains("on")) ? $("#welt") : null;
  if(!open || e.key !== "Tab") return;
  const f = Array.from(open.querySelectorAll(FOCUSABLE)).filter(el=>el.offsetParent !== null);
  if(!f.length) return;
  const first = f[0], last = f[f.length-1];
  if(e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
  else if(!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
}

function openModal(html, name){
  $("#modal").setAttribute("aria-label", name || "Dialog");
  $("#modalContent").innerHTML = html;
  $("#modalPanel").scrollTop = 0;
  openOverlay($("#modal"));
}

/* ============================================================
   9 — Produktdetail
   ============================================================ */
function openProduct(id){
  const p = P.find(x=>x.id===id);
  const liste = visible();
  const i = liste.findIndex(x=>x.id===id);
  const vor = i > 0 ? liste[i-1] : null;
  const nach = i >= 0 && i < liste.length-1 ? liste[i+1] : null;

  openModal(`
    <div class="pd">
      <div class="pd__ansicht">
        <div class="pd__media"${lqip(p)}>${img(p, "(max-width:759px) 100vw, 440px")}</div>
        ${galerie(p, "(max-width:759px) 100vw, 440px")}
      </div>
      <div class="pd__info">
        ${i >= 0 ? `<nav class="pd__nav" aria-label="Im Sortiment blättern">
          <button type="button" data-nav="${vor?vor.id:''}" ${vor?"":"disabled"} aria-label="${vor?vor.name:'Kein vorheriges Erzeugnis'}">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg></button>
          <span>${i+1} von ${liste.length}</span>
          <button type="button" data-nav="${nach?nach.id:''}" ${nach?"":"disabled"} aria-label="${nach?nach.name:'Kein nächstes Erzeugnis'}">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg></button>
        </nav>` : ""}
        <p class="stamp" style="color:var(--bark-soft)">${p.origin}</p>
        <h2 class="raised">${p.name}</h2>
        <p style="color:var(--ink-soft)">${p.long}</p>
        <div class="pd__price">
          <b>${eur(p.price)}</b>
          <span class="card__base">${amountLabel(p)}${basePrice(p) ? " · "+basePrice(p) : ""}</span>
        </div>
        <div class="pd__buy">
          <div class="qty">
            <button type="button" id="pdMinus" aria-label="Menge verringern">−</button>
            <span id="pdQty">1</span>
            <button type="button" id="pdPlus" aria-label="Menge erhöhen">+</button>
          </div>
          <button class="btn btn--primary" type="button" id="pdAdd" style="flex:1">In den Warenkorb</button>
        </div>
        <p class="card__base">Lieferzeit 1–2 Werktage · Versandkostenfrei ab 59 €</p>
        <dl class="spec">
          ${Object.entries(p.specs).map(([k,v])=>`<div><dt>${k}</dt><dd>${v}</dd></div>`).join("")}
        </dl>
      </div>
    </div>`, p.name);

  let q = 1;
  const out = $("#pdQty");
  $("#pdMinus").onclick = ()=>{ q = Math.max(1,q-1); out.textContent = q; };
  $("#pdPlus").onclick  = ()=>{ q = Math.min(20,q+1); out.textContent = q; };
  $("#pdAdd").onclick   = ()=>{ addToCart(id,q); closeOverlays(); openCart(); };
}

function openCart(){ renderCart(); openOverlay($("#cart")); }

/* ============================================================
   10 — Kasse
   ============================================================ */
const SHIP_OPTS = () => {
  const l = state.order.land, sub = subtotal();
  const free = {DE:59, AT:89, CH:Infinity}[l];
  const base = {DE:4.90, AT:8.90, CH:14.90}[l];
  const std  = sub >= free ? 0 : base;
  return [
    {id:"standard", t:"Standardversand DHL GoGreen", s:"Zustellung in 1–2 Werktagen", p:std},
    {id:"express",  t:"Expressversand",              s:"Zustellung am nächsten Werktag bei Bestellung bis 12 Uhr", p:std+6}
  ];
};

const PAY_OPTS = [
  {id:"rechnung", t:"Kauf auf Rechnung", s:"Zahlbar 14 Tage nach Erhalt der Ware"},
  {id:"sepa",     t:"SEPA-Lastschrift",  s:"Abbuchung nach Versand"},
  {id:"karte",    t:"Kreditkarte",       s:"Visa, Mastercard, American Express"},
  {id:"paypal",   t:"PayPal",            s:"Weiterleitung nach Bestellabschluss"}
];

function stepsBar(active){
  const names = ["Adresse","Versand","Zahlung","Prüfen"];
  return `<ol class="co__steps">` + names.map((n,i)=>{
    const nr = i+1;
    const zustand = nr < active ? "done" : nr === active ? "now" : "todo";
    const marke = zustand === "done" ? "✓" : nr + ".";
    return `<li class="co__step co__step--${zustand}"${zustand==="now"?' aria-current="step"':''}>
      <span class="co__step__nr">${marke}</span>${n}</li>`;
  }).join("") + `</ol>`;
}

function checkoutHTML(){
  const d = state.order.daten;
  const val = k => d[k] ? String(d[k]).replace(/"/g,"&quot;") : "";

  if(state.step === 1) return `<div class="co">${stepsBar(1)}
    <h2>Wohin dürfen wir liefern?</h2>
    <form id="coForm" novalidate>
      <div class="fields">
        <div class="f"><label for="vn">Vorname</label><input id="vn" name="vn" autocomplete="given-name" value="${val("vn")}"><span class="err">Bitte Vornamen angeben.</span></div>
        <div class="f"><label for="nn">Nachname</label><input id="nn" name="nn" autocomplete="family-name" value="${val("nn")}"><span class="err">Bitte Nachnamen angeben.</span></div>
        <div class="f f--full"><label for="mail">E-Mail für die Bestellbestätigung</label><input id="mail" name="mail" type="email" autocomplete="email" value="${val("mail")}"><span class="err">Bitte eine gültige E-Mail-Adresse angeben.</span></div>
        <div class="f f--full"><label for="str">Straße und Hausnummer</label><input id="str" name="str" autocomplete="street-address" value="${val("str")}"><span class="err">Bitte Straße und Hausnummer angeben.</span></div>
        <div class="f"><label for="plz">Postleitzahl</label><input id="plz" name="plz" inputmode="numeric" autocomplete="postal-code" value="${val("plz")}"><span class="err">Bitte gültige PLZ angeben.</span></div>
        <div class="f"><label for="ort">Ort</label><input id="ort" name="ort" autocomplete="address-level2" value="${val("ort")}"><span class="err">Bitte Ort angeben.</span></div>
        <div class="f f--full"><label for="land">Land</label>
          <select id="land" name="land">
            <option value="DE"${state.order.land==="DE"?" selected":""}>Deutschland</option>
            <option value="AT"${state.order.land==="AT"?" selected":""}>Österreich</option>
            <option value="CH"${state.order.land==="CH"?" selected":""}>Schweiz</option>
          </select></div>
        <div class="f f--full"><label for="notiz">Bemerkung (optional)</label><input id="notiz" name="notiz" placeholder="z. B. Text für die Grußkarte" value="${val("notiz")}"></div>
      </div>
      <div class="co__bar"><div class="co__nav">
        <button class="btn btn--ghost" type="button" data-co="cancel">Zurück zum Warenkorb</button>
        <button class="btn btn--primary" type="button" data-co="next">Weiter zum Versand</button>
      </div></div>
    </form></div>`;

  if(state.step === 2) return `<div class="co">${stepsBar(2)}
    <h2>Wie soll es reisen?</h2>
    <div class="opts">
      ${SHIP_OPTS().map(o=>`<label class="opt">
        <input type="radio" name="ship" value="${o.id}"${state.order.versand===o.id?" checked":""}>
        <span><b>${o.t}</b><small>${o.s}</small></span>
        <span class="p">${o.p===0?"kostenfrei":eur(o.p)}</span>
      </label>`).join("")}
    </div>
    <p class="card__base" style="margin-top:1rem">Alle Sendungen sind versichert und werden klimaneutral zugestellt. Glas verpacken wir in Wellpappe mit Zwischenlagen.</p>
    <div class="co__bar"><div class="co__nav">
      <button class="btn btn--ghost" type="button" data-co="back">Zurück</button>
      <button class="btn btn--primary" type="button" data-co="next">Weiter zur Zahlung</button>
    </div></div></div>`;

  if(state.step === 3) return `<div class="co">${stepsBar(3)}
    <h2>Wie möchten Sie zahlen?</h2>
    <div class="opts">
      ${PAY_OPTS.map(o=>`<label class="opt">
        <input type="radio" name="pay" value="${o.id}"${state.order.zahlung===o.id?" checked":""}>
        <span><b>${o.t}</b><small>${o.s}</small></span>
      </label>`).join("")}
    </div>
    <div class="co__bar"><div class="co__nav">
      <button class="btn btn--ghost" type="button" data-co="back">Zurück</button>
      <button class="btn btn--primary" type="button" data-co="next">Bestellung prüfen</button>
    </div></div></div>`;

  const pay = PAY_OPTS.find(o=>o.id===state.order.zahlung);
  const ship = SHIP_OPTS().find(o=>o.id===state.order.versand);
  const land = {DE:"Deutschland",AT:"Österreich",CH:"Schweiz"}[state.order.land];
  const sum = subtotal() + ship.p;
  return `<div class="co">${stepsBar(4)}
    <h2>Alles richtig?</h2>
    <div class="review"><h3>Lieferadresse</h3>
      ${d.vn} ${d.nn}<br>${d.str}<br>${d.plz} ${d.ort}<br>${land}<br>${d.mail}
      ${d.notiz ? `<br><span style="color:var(--ink-soft)">Bemerkung: ${d.notiz}</span>` : ""}</div>
    <div class="review"><h3>Versand</h3>${ship.t} — ${ship.p===0?"kostenfrei":eur(ship.p)}</div>
    <div class="review"><h3>Zahlung</h3>${pay.t}</div>
    <div class="review"><h3>Ihre Artikel</h3>
      ${state.cart.map(l=>{const p=P.find(x=>x.id===l.id);
        return `<div style="display:flex;justify-content:space-between;gap:1rem;padding:.25rem 0">
          <span>${l.qty} × ${p.name}</span><span>${eur(l.qty*l.price)}</span></div>`}).join("")}
      <div style="display:flex;justify-content:space-between;border-top:1px solid var(--line);margin-top:.6rem;padding-top:.6rem;font-family:var(--display);font-size:1.25rem">
        <span>Gesamt</span><span>${eur(sum)}</span></div>
      <small style="color:#8A7F69;font-family:var(--ui);font-size:.7rem">inkl. 7 % MwSt. = ${eur(sum - sum/1.07)}</small>
    </div>
    <p class="card__base" style="margin-top:1rem">Mit dem Klick geben Sie eine verbindliche Bestellung ab. Dies ist eine Demonstration — es wird keine Zahlung ausgelöst.</p>
    <div class="co__bar">
      <label class="check"><input type="checkbox" id="agbOk">
        <span>Ich habe die <a href="#" data-legal="agb">AGB</a> und die <a href="#" data-legal="widerruf">Widerrufsbelehrung</a> gelesen und stimme zu. Die <a href="#" data-legal="datenschutz">Datenschutzhinweise</a> habe ich zur Kenntnis genommen.</span></label>
      <p class="err" id="agbErr" style="display:none;font-family:var(--ui);font-size:.72rem;color:#8A2E12;margin:-.35rem 0 .7rem">Bitte bestätigen Sie AGB und Widerrufsbelehrung.</p>
      <div class="co__nav">
        <button class="btn btn--ghost" type="button" data-co="back">Zurück</button>
        <button class="btn btn--primary" type="button" data-co="pay">Zahlungspflichtig bestellen</button>
      </div>
    </div>
  </div>`;
}

function renderCheckout(){ openModal(checkoutHTML(), "Kasse, Schritt " + state.step + " von 4"); }

function validateStep1(){
  const f = $("#coForm");
  if(!f) return false;
  const g = id => f.querySelector("#"+id);
  const rules = {
    vn:  v => v.trim().length >= 2,
    nn:  v => v.trim().length >= 2,
    mail:v => /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(v.trim()),
    str: v => v.trim().length >= 5,
    plz: v => ({DE:/^\d{5}$/, AT:/^\d{4}$/, CH:/^\d{4}$/}[g("land").value]).test(v.trim()),
    ort: v => v.trim().length >= 2
  };
  let ok = true, firstBad = null;
  Object.entries(rules).forEach(([id,test])=>{
    const el = g(id), good = test(el.value);
    el.closest(".f").classList.toggle("invalid", !good);
    el.setAttribute("aria-invalid", String(!good));
    if(!good && !firstBad) firstBad = el;
    ok = ok && good;
  });
  if(!ok){ firstBad.focus(); return false; }
  state.order.land = g("land").value;
  ["vn","nn","mail","str","plz","ort","notiz"].forEach(k => state.order.daten[k] = g(k).value.trim());
  return true;
}

function placeOrder(){
  const nr = "VC-" + new Date().getFullYear() + "-" + String(Math.floor(Math.random()*90000)+10000);
  const sum = total();
  const mail = state.order.daten.mail;
  state.cart = [];
  renderCart();
  state.step = 1;
  openModal(`<div class="done">
    <div class="done__mark"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 13 5 5L20 7"/></svg></div>
    <h2 class="raised">Grazie. Die Bestellung ist da.</h2>
    <p>Wir packen von Hand und melden uns per E-Mail an <b>${mail}</b>, sobald die Sendung unterwegs ist — in der Regel innerhalb eines Werktags.</p>
    <p class="ordernr">Bestellnummer ${nr} · ${eur(sum)}</p>
    <div class="co__nav" style="justify-content:center;max-width:420px;margin:1.8rem auto 0">
      <button class="btn btn--primary" type="button" data-close>Weiter stöbern</button>
    </div>
  </div>`, "Bestellung aufgenommen");
  toast("Bestellung aufgenommen.");
}

/* ============================================================
   11 — Rechtstexte
   ============================================================ */
const PH = t => `<span class="ph">${t}</span>`;
const LEGAL = {
  impressum: `<div class="legal"><h2>Impressum</h2>
    <h3>Angaben gemäß § 5 DDG</h3>
    <p>${PH("VECOM Handels GmbH")}<br>${PH("Musterstraße 1")}<br>${PH("00000 Musterstadt")}<br>${PH("Deutschland")}</p>
    <h3>Vertreten durch</h3><p>${PH("Vor- und Nachname der Geschäftsführung")}</p>
    <h3>Kontakt</h3><p>Telefon: ${PH("+49 000 0000000")}<br>E-Mail: ${PH("kontakt@vecom-onlineshop.de")}</p>
    <h3>Registereintrag</h3><p>Amtsgericht ${PH("Musterstadt")}, HRB ${PH("000000")}</p>
    <h3>Umsatzsteuer-Identifikationsnummer</h3><p>${PH("DE000000000")}</p>
    <h3>Lebensmittelrechtliche Angaben</h3><p>Verantwortlicher Lebensmittelunternehmer im Sinne der LMIV: ${PH("VECOM Handels GmbH, Anschrift wie oben")}</p>
    <h3>Online-Streitbeilegung</h3>
    <p>Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung bereit. Wir sind weder verpflichtet noch bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
    <p style="margin-top:1.4rem;color:var(--bark)"><b>Hinweis:</b> Die gelb markierten Felder müssen vor dem Livegang durch die echten Unternehmensdaten ersetzt werden. Ein unvollständiges Impressum ist abmahnfähig.</p></div>`,

  datenschutz: `<div class="legal"><h2>Datenschutz</h2>
    <h3>Verantwortlich</h3><p>${PH("VECOM Handels GmbH, Musterstraße 1, 00000 Musterstadt")}<br>Datenschutzanfragen: ${PH("datenschutz@vecom-onlineshop.de")}</p>
    <h3>Welche Daten wir verarbeiten</h3>
    <ul>
      <li><b>Bestelldaten</b> (Name, Anschrift, E-Mail, Zahlungsart) zur Vertragserfüllung, Art. 6 Abs. 1 lit. b DSGVO.</li>
      <li><b>Rechnungsdaten</b> zur Erfüllung steuerlicher Aufbewahrungspflichten, Art. 6 Abs. 1 lit. c DSGVO, zehn Jahre.</li>
      <li><b>Newsletter-Anmeldung</b> auf Grundlage Ihrer Einwilligung, Art. 6 Abs. 1 lit. a DSGVO, jederzeit widerrufbar.</li>
    </ul>
    <h3>Empfänger</h3><p>Versanddienstleister ${PH("DHL")}, Zahlungsdienstleister ${PH("Anbieter eintragen")}, Hosting ${PH("Anbieter eintragen")}. Mit allen Dienstleistern bestehen Auftragsverarbeitungsverträge.</p>
    <h3>Cookies und Reichweitenmessung</h3>
    <p>Dieser Shop setzt in der vorliegenden Fassung ausschließlich technisch notwendige Speicherung ein. Vor dem Einsatz von Analyse- oder Marketing-Diensten ist eine Einwilligungslösung nach § 25 TDDDG erforderlich.</p>
    <h3>Ihre Rechte</h3>
    <p>Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit und Widerspruch. Beschwerderecht bei der zuständigen Aufsichtsbehörde.</p></div>`,

  agb: `<div class="legal"><h2>Allgemeine Geschäftsbedingungen</h2>
    <h3>§ 1 Geltungsbereich</h3><p>Für alle Bestellungen über diesen Onlineshop gelten die nachfolgenden Bedingungen. Vertragspartner ist ${PH("VECOM Handels GmbH")}.</p>
    <h3>§ 2 Vertragsschluss</h3><p>Die Darstellung der Produkte stellt kein bindendes Angebot dar. Mit dem Klick auf „Zahlungspflichtig bestellen“ geben Sie ein verbindliches Angebot ab. Der Vertrag kommt mit unserer Auftragsbestätigung oder mit dem Versand der Ware zustande.</p>
    <h3>§ 3 Preise und Versand</h3><p>Alle Preise verstehen sich inklusive der gesetzlichen Mehrwertsteuer. Lebensmittel unterliegen dem ermäßigten Steuersatz von 7 %. Versandkosten: Deutschland 4,90 € (ab 59 € Warenwert kostenfrei), Österreich 8,90 € (ab 89 € kostenfrei), Schweiz 14,90 € zzgl. Einfuhrabgaben.</p>
    <h3>§ 4 Lieferung</h3><p>Die Lieferung erfolgt innerhalb von 1–2 Werktagen nach Zahlungseingang bzw. bei Rechnungskauf nach Bestelleingang.</p>
    <h3>§ 5 Zahlung</h3><p>Es stehen Rechnung, SEPA-Lastschrift, Kreditkarte und PayPal zur Verfügung. Bei Kauf auf Rechnung ist der Betrag innerhalb von 14 Tagen nach Erhalt der Ware fällig.</p>
    <h3>§ 6 Eigentumsvorbehalt</h3><p>Die Ware bleibt bis zur vollständigen Bezahlung unser Eigentum.</p>
    <h3>§ 7 Gewährleistung</h3><p>Es gilt das gesetzliche Mängelhaftungsrecht.</p>
    <p style="margin-top:1.4rem;color:var(--bark)"><b>Hinweis:</b> Dieser Text ist ein Gerüst und ersetzt keine Rechtsberatung. Vor dem Livegang anwaltlich prüfen lassen.</p></div>`,

  widerruf: `<div class="legal"><h2>Widerrufsbelehrung</h2>
    <h3>Widerrufsrecht</h3>
    <p>Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen. Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag, an dem Sie oder ein von Ihnen benannter Dritter, der nicht der Beförderer ist, die Waren in Besitz genommen haben.</p>
    <p>Um Ihr Widerrufsrecht auszuüben, müssen Sie uns (${PH("VECOM Handels GmbH, Musterstraße 1, 00000 Musterstadt, widerruf@vecom-onlineshop.de")}) mittels einer eindeutigen Erklärung über Ihren Entschluss informieren. Zur Wahrung der Frist genügt die rechtzeitige Absendung.</p>
    <h3>Folgen des Widerrufs</h3>
    <p>Wir erstatten alle erhaltenen Zahlungen einschließlich der Standard-Lieferkosten unverzüglich, spätestens binnen vierzehn Tagen ab Eingang Ihrer Widerrufserklärung. Wir können die Rückzahlung verweigern, bis wir die Waren zurückerhalten haben.</p>
    <h3>Ausschluss</h3>
    <p>Das Widerrufsrecht besteht nicht bei versiegelten Lebensmitteln, deren Versiegelung nach der Lieferung entfernt wurde, sowie bei Waren, die schnell verderben können.</p>
    <h3>Rücksendung</h3>
    <p>Jeder Sendung liegt ein Rücksendeetikett bei. Die unmittelbaren Kosten der Rücksendung tragen ${PH("wir / Sie — bitte festlegen")}.</p></div>`,

  versand: `<div class="legal"><h2>Versand &amp; Lieferung</h2>
    <h3>Kosten</h3>
    <ul>
      <li>Deutschland: 4,90 € — ab 59 € Warenwert kostenfrei</li>
      <li>Österreich: 8,90 € — ab 89 € Warenwert kostenfrei</li>
      <li>Schweiz: 14,90 € zzgl. Zoll und Einfuhrumsatzsteuer</li>
      <li>Expresszuschlag: 6,00 €</li>
    </ul>
    <h3>Dauer</h3><p>Wir versenden werktags bis 14 Uhr. Zustellung innerhalb Deutschlands in der Regel in 1–2 Werktagen, Österreich 2–3, Schweiz 3–5 Werktage.</p>
    <h3>Verpackung</h3><p>Glas wird in Wellpappe mit Zwischenlagen und Papierpolster verpackt. Wir verwenden kein Plastikfüllmaterial. Die Kartonagen sind FSC-zertifiziert und vollständig recycelbar.</p>
    <h3>Bruch</h3><p>Sollte trotzdem etwas zu Bruch gehen: fotografieren, an ${PH("service@vecom-onlineshop.de")} senden, wir liefern kostenfrei nach.</p></div>`,

  zahlung: `<div class="legal"><h2>Zahlungsarten</h2>
    <ul>
      <li><b>Kauf auf Rechnung</b> — zahlbar 14 Tage nach Erhalt, ohne Aufschlag.</li>
      <li><b>SEPA-Lastschrift</b> — Abbuchung nach Versand, Mandat im Bestellprozess.</li>
      <li><b>Kreditkarte</b> — Visa, Mastercard, American Express.</li>
      <li><b>PayPal, Apple Pay, Google Pay</b> — Weiterleitung nach Bestellabschluss.</li>
    </ul>
    <h3>Sicherheit</h3><p>Die Zahlungsabwicklung erfolgt über ${PH("Zahlungsdienstleister eintragen")}. Kartendaten werden zu keinem Zeitpunkt auf unseren Systemen gespeichert.</p></div>`,

  kontakt: `<div class="legal"><h2>Kontakt</h2>
    <p>Fragen zur Bestellung, zu Erzeugern oder zur Zubereitung beantworten wir gern.</p>
    <h3>E-Mail</h3><p>${PH("service@vecom-onlineshop.de")} — Antwort in der Regel innerhalb eines Werktags.</p>
    <h3>Telefon</h3><p>${PH("+49 000 0000000")}, Montag bis Freitag 9–16 Uhr.</p>
    <h3>Anschrift</h3><p>${PH("VECOM Handels GmbH, Musterstraße 1, 00000 Musterstadt")}</p></div>`
};

/* ============================================================
   12 — Ereignisse
   ============================================================ */
document.addEventListener("click", e => {
  const t = e.target;

  const legal = t.closest("[data-legal]");
  if(legal){
    e.preventDefault();
    const ausKasse = !!$("#modalContent .co");
    const titel = {impressum:"Impressum",datenschutz:"Datenschutz",agb:"Allgemeine Geschäftsbedingungen",
      widerruf:"Widerrufsbelehrung",versand:"Versand und Lieferung",zahlung:"Zahlungsarten",kontakt:"Kontakt"};
    openModal(LEGAL[legal.dataset.legal] + (ausKasse
      ? `<div class="co" style="padding-top:0"><button class="btn btn--primary" type="button" data-co="resume">Zurück zur Bestellung</button></div>`
      : ""), titel[legal.dataset.legal]);
    return;
  }

  const chip = t.closest("[data-cat]");
  if(chip){ state.cat = chip.dataset.cat; renderFilters(); renderGrid(); kartenAuftritt(); return; }

  const ans = t.closest("[data-ansicht]");
  if(ans){
    const halter = ans.closest(".pd__ansicht, .ansicht");
    const gross  = halter && halter.querySelector(".pd__media img, .ware__bild img");
    if(gross){
      const b = ans.dataset.ansicht;
      gross.srcset = `${b}-680.webp 680w, ${b}-1024.webp 1024w`;
      gross.sizes  = ans.dataset.sizes || "100vw";
      gross.src    = b + "-680.webp";
      halter.querySelectorAll("[data-ansicht]").forEach(k =>
        k.setAttribute("aria-pressed", String(k === ans)));
    }
    return;
  }

  const nav = t.closest("[data-nav]");
  if(nav && nav.dataset.nav){ openProduct(nav.dataset.nav); return; }

  const open = t.closest("[data-open]");
  if(open){
    /* Mit Zusatztaste oder mittlerer Maustaste soll der Browser die Seite öffnen dürfen */
    if(e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
    e.preventDefault();
    verlaufMerken(SEITEN[open.dataset.open]);
    openProduct(open.dataset.open);
    return;
  }

  const add = t.closest("[data-add]");
  if(add){ addToCart(add.dataset.add); return; }

  const qty = t.closest("[data-qty]");
  if(qty){
    const line = state.cart.find(l=>l.id===qty.dataset.qty);
    setQty(qty.dataset.qty, line.qty + Number(qty.dataset.d));
    return;
  }

  const del = t.closest("[data-del]");
  if(del){ setQty(del.dataset.del, 0); toast("Artikel entfernt."); return; }

  if(t.closest("[data-close]")){ closeOverlays(); return; }
  if(t.id === "scrim"){ closeOverlays(); return; }

  const co = t.closest("[data-co]");
  if(co){
    const a = co.dataset.co;
    if(a === "cancel"){ closeOverlays(); openCart(); return; }
    if(a === "resume"){ renderCheckout(); return; }
    if(a === "back"){ state.step = Math.max(1, state.step-1); renderCheckout(); return; }
    if(a === "next"){
      if(state.step === 1 && !validateStep1()) return;
      if(state.step === 2) state.order.versand = ($("input[name=ship]:checked")||{}).value || "standard";
      if(state.step === 3) state.order.zahlung = ($("input[name=pay]:checked")||{}).value || "rechnung";
      state.step++; renderCheckout(); return;
    }
    if(a === "pay"){
      if(!$("#agbOk").checked){ $("#agbErr").style.display = "block"; $("#agbOk").focus(); return; }
      placeOrder(); return;
    }
  }

  // Kategorie-Sprungmarken in Navigation und Fußzeile
  if(t.closest("#welt a")) setTimeout(closeOverlays, 0);

  const anchor = t.closest('a[href^="#"]');
  if(anchor){
    const id = anchor.getAttribute("href").slice(1);
    if(CATS.some(c=>c.id===id)){
      e.preventDefault();
      state.cat = id; state.q = ""; $("#searchInput").value = "";
      renderFilters(); renderGrid();
      $("#sortiment").scrollIntoView({behavior:"smooth", block:"start"});
      $("#mnav").classList.remove("on");
      $("#navToggle").setAttribute("aria-expanded","false");
    } else if(document.getElementById(id)){
      $("#mnav").classList.remove("on");
      $("#navToggle").setAttribute("aria-expanded","false");
    }
  }
});

const an = (sel, ev, fn, opt) => { const el = $(sel); if(el) el.addEventListener(ev, fn, opt); };

an("#cartToggle", "click", openCart);

/* Antippen wendet die Scheibe — auf Zeigergeräten übernimmt das der Hover */
const flip = document.querySelector(".niche__flip");
if(flip){
  /* Die Rückseite wiegt gut 100 KB. Sie wird erst geholt, wenn jemand die Scheibe anfasst. */
  const rueckseite = flip.querySelector(".niche__trinacria");
  const holen = () => {
    if(rueckseite && rueckseite.dataset.src){
      rueckseite.src = rueckseite.dataset.src;
      delete rueckseite.dataset.src;
    }
  };
  ["pointerenter","focus","touchstart"].forEach(ev => flip.addEventListener(ev, holen, {once:true, passive:true}));
  flip.addEventListener("click", () => {
    holen();
    flip.setAttribute("aria-pressed", flip.getAttribute("aria-pressed") === "true" ? "false" : "true");
  });
}

an("#toCheckout", "click", ()=>{
  if(!state.cart.length) return;
  /* Wer die Kasse zwischendurch schließt, landet nicht wieder bei Null */
  if(!state.order.daten.mail) state.step = 1;
  closeOverlays();
  setTimeout(renderCheckout, 120);
});

function sucheSchliessen(fokus){
  const bar = $("#searchBar"); if(!bar) return;
  bar.classList.remove("on");
  const feld = $("#searchInput");
  if(feld) feld.value = "";
  state.q = "";
  if($("#grid")){ renderGrid(); kartenAuftritt(); }
  trefferZeigen("");
  const knopf = $("#searchToggle");
  if(knopf){
    knopf.setAttribute("aria-expanded","false");
    knopf.setAttribute("aria-label","Suche öffnen");
    if(fokus) knopf.focus();
  }
}

an("#searchToggle", "click", function(){
  const bar = $("#searchBar");
  if(bar.classList.contains("on")){ sucheSchliessen(false); return; }
  bar.classList.add("on");
  this.setAttribute("aria-expanded","true");
  this.setAttribute("aria-label","Suche schließen");
  $("#searchInput").focus();
});

/* --- Große Navigation --- */
(function welt(){
  const w = $("#welt"), knopf = $("#navToggle");
  if(!w || !knopf) return;
  const bild = w.querySelector("[data-welt-bild]");
  const ziele = $$("#welt [data-bild]");

  function zeigen(name){
    if(!bild || typeof REISE === "undefined") return;
    const q = REISE[name]; if(!q) return;
    const neu = q.pfad ? q.pfad + "-1000.webp" : q.bild;
    if(bild.dataset.jetzt === name) return;
    bild.dataset.jetzt = name;
    bild.classList.remove("da");
    const vor = new Image();
    vor.onload = () => { bild.src = neu; requestAnimationFrame(() => bild.classList.add("da")); };
    vor.src = neu;
  }
  ziele.forEach(z => {
    ["pointerenter","focus"].forEach(e => z.addEventListener(e, () => zeigen(z.dataset.bild), {passive:true}));
  });

  knopf.addEventListener("click", () => {
    if(w.classList.contains("on")){ closeOverlays(); return; }
    knopf.setAttribute("aria-expanded","true");
    knopf.setAttribute("aria-label","Menü schließen");
    w.setAttribute("aria-hidden","false");
    zeigen(ziele[0] ? ziele[0].dataset.bild : "hain");
    openOverlay(w);
  });
})();

let searchT;
an("#searchInput", "input", e => {
  clearTimeout(searchT);
  searchT = setTimeout(()=>{
    state.q = e.target.value;
    if($("#grid")){ renderGrid(); kartenAuftritt(); }
    trefferZeigen(e.target.value);
  }, 140);
});
an("#searchClear", "click", ()=>{
  $("#searchInput").value = ""; state.q = "";
  if($("#grid")){ renderGrid(); kartenAuftritt(); }
  trefferZeigen("");
  $("#searchInput").focus();
});

/* Ein Treffer beendet die Suche — sonst bleibt das Raster im Hintergrund gefiltert */
document.addEventListener("click", e => {
  if(e.target.closest(".treffer__zeile")) setTimeout(() => sucheSchliessen(false), 0);
});

an("#newsBtn", "click", ()=>{
  const v = $("#newsMail").value.trim();
  if(!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(v)){ toast("Bitte eine gültige E-Mail-Adresse eingeben."); $("#newsMail").focus(); return; }
  $("#newsMail").value = "";
  toast("Fast geschafft — bitte bestätigen Sie die E-Mail in Ihrem Postfach.");
});

let verlaufTiefe = 0;
function verlaufMerken(adresse){
  try{
    history.pushState({vecom:"dialog"}, "", adresse || location.href);
    verlaufTiefe++;
  }catch(e){ /* Verlauf gesperrt: dann eben ohne */ }
}
addEventListener("popstate", () => {
  verlaufTiefe = 0;
  if($("#modal").classList.contains("on") || $("#cart").classList.contains("on")) closeOverlays();
});

document.addEventListener("keydown", e => {
  if(e.key === "Escape"){
    const bar = $("#searchBar");
    if(bar.classList.contains("on") && !$("#cart").classList.contains("on") && !$("#modal").classList.contains("on")){
      sucheSchliessen(true);
      return;
    }
    closeOverlays();
  }
  trap(e);
});

/* Klebender Kopf */
const head = $("#head");
let ticking = false;
addEventListener("scroll", ()=>{
  if(ticking) return;
  ticking = true;
  requestAnimationFrame(()=>{ head.classList.toggle("is-stuck", scrollY > 24); ticking = false; });
}, {passive:true});

/* Fotos blenden über der unscharfen Vorschau auf, sobald sie da sind */
document.addEventListener("load", e => {
  if(e.target.classList && e.target.classList.contains("bild")) e.target.classList.add("ist-da");
}, true);

/* Sanftes Einblenden beim Scrollen */
const io = new IntersectionObserver(es=>{
  es.forEach(en=>{ if(en.isIntersecting){ en.target.classList.add("in"); io.unobserve(en.target); } });
}, {rootMargin:"0px 0px -12% 0px", threshold:.08});
$$(".rv").forEach(el=>io.observe(el));


/* ============================================================
   14 — Reise: ein Kapitelwechsel, an den Bildlauf gekoppelt
   Kein Fremdcode, nur requestAnimationFrame und Transformationen.
   ============================================================ */
(function reise(){
  const spur = document.querySelector(".reise__spur");
  if(!spur) return;

  const bilder   = $$(".reise__bild");
  const kapitel  = $$(".reise__kapitel");
  const marken   = $$(".reise__leiste li");
  const balken   = $(".reise__fortschritt");
  const n = kapitel.length;
  const ruhig = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Bilder erst holen, wenn die Reise in Sichtweite kommt */
  let geladen = false;
  function bilderLaden(){
    if(geladen) return;
    geladen = true;
    bilder.forEach(f => {
      const im = f.querySelector("img");
      const q  = REISE[im.dataset.reise];
      if(!q) return;
      if(q.pfad){
        im.src = q.pfad + "-1000.webp";
        im.srcset = q.pfad + "-1000.webp 1000w, " + q.pfad + "-1376.webp 1376w";
        im.sizes = "100vw";
      } else {
        im.src = q.bild;
      }
      if(q.lqip) f.style.backgroundImage = "url(" + q.lqip + ")";
    });
  }

  /* Der Reiseabschnitt beginnt knapp unterhalb des Faltrands und gilt damit
     schon bei Bildlauf null als sichtbar — der Vorlaufrand aendert daran
     nichts. Gemessen kamen dadurch zwei Kapitelbilder (217 KB) vor dem
     load-Ereignis herein und verzoegerten die groesste Inhaltsdarstellung.

     Der Beobachter entscheidet weiterhin OB geladen wird; WANN, entscheidet
     jetzt das load-Ereignis. Wer nie so weit scrollt, laedt weiterhin nichts. */
  let angefordert = false;
  function jetztOderNachLoad(){
    if(angefordert) return;
    angefordert = true;
    const spaeter = () => (window.requestIdleCallback || (f => setTimeout(f, 300)))(
                            bilderLaden, {timeout: 1500});
    if(document.readyState === "complete") spaeter();
    else addEventListener("load", spaeter, {once:true});
  }
  const sicht = new IntersectionObserver(es => {
    es.forEach(e => { if(e.isIntersecting){ jetztOderNachLoad(); sicht.disconnect(); } });
  }, {rootMargin: "1600px 0px"});
  sicht.observe(spur);

  /* Das Zwischenbild teilt sich die Quelle mit dem Auftaktkapitel */
  const zw = document.querySelector("[data-zwischen]");
  if(zw){
    const q = REISE["hain"];
    if(q && q.pfad){
      zw.src = q.pfad + "-1000.webp";
      zw.srcset = q.pfad + "-1000.webp 1000w, " + q.pfad + "-1376.webp 1376w";
      zw.sizes = "100vw";
    } else if(q) zw.src = q.bild;
  }

  if(ruhig){
    bilderLaden();
    bilder.forEach(f => f.setAttribute("data-aktiv",""));
    kapitel.forEach(a => a.setAttribute("data-aktiv",""));
    return;
  }

  let aktiv = -1, laeuft = false;

  function zeichnen(){
    laeuft = false;
    const r = spur.getBoundingClientRect();
    const weg = r.height - innerHeight;
    if(weg <= 0) return;
    /* p läuft von 0 bis 1 über die gesamte Spur */
    const p = Math.min(Math.max(-r.top / weg, 0), 1);
    balken.style.height = balken.style.width = (p * 100).toFixed(2) + "%";

    const roh = p * n;                       /* 0 … n */
    const i   = Math.min(Math.floor(roh), n - 1);
    const t   = Math.min(Math.max(roh - i, 0), 1);   /* Anteil im Kapitel */

    /* Bildebene: läuft der Renderer, sind diese Ebenen unsichtbar und
       dienen nur noch als Bildquelle. Sonst übernehmen sie selbst. */
    bilder.forEach((f, k) => {
      const d = k - roh + 0.5;
      const sicht = Math.min(Math.max(1 - Math.abs(d) * 1.9, 0), 1);
      const eigen = Math.min(Math.max(roh - k, 0), 1);
      const rein  = Math.min(Math.max((roh - k) * 3.2, 0), 1);   /* Einlaufblende */
      const raus  = Math.min(Math.max((roh - k - 1) * 3.2, 0), 1);
      f.style.opacity = sicht.toFixed(3);
      f.style.clipPath = "inset(" + (raus * 100).toFixed(1) + "% 0 " + ((1 - rein) * 100).toFixed(1) + "% 0)";
      f.style.transform =
        "scale(" + (1.14 - eigen * 0.14).toFixed(4) + ")" +
        " translate3d(" + ((eigen - .5) * -1.8).toFixed(2) + "%," + ((eigen - .5) * -3.2).toFixed(2) + "%,0)" +
        " rotateY(" + ((eigen - .5) * 2.4).toFixed(2) + "deg)" +
        " rotateX(" + ((.5 - eigen) * 1.2).toFixed(2) + "deg)";
      f.style.visibility = sicht > 0.004 ? "visible" : "hidden";
    });

    if(i !== aktiv){
      aktiv = i;
      kapitel.forEach((a, k) => a.toggleAttribute("data-aktiv", k === i));
      marken.forEach((m, k) => m.toggleAttribute("data-aktiv", k === i));
    }
  }

  addEventListener("scroll", () => {
    if(!laeuft){ laeuft = true; requestAnimationFrame(zeichnen); }
  }, {passive:true});
  addEventListener("resize", () => { if(!laeuft){ laeuft = true; requestAnimationFrame(zeichnen); } });
  zeichnen();
})();

const ART_NAME = {ware:"Erzeugnisse", rezept:"Rezepte", erzeuger:"Erzeuger", gruppe:"Warengruppen"};
const glatt = s => s.toLowerCase()
  .replace(/ä/g,"a").replace(/ö/g,"o").replace(/ü/g,"u").replace(/ß/g,"ss")
  .replace(/[àáâ]/g,"a").replace(/[èé]/g,"e").replace(/[ìí]/g,"i").replace(/[òó]/g,"o").replace(/[ùú]/g,"u")
  .replace(/[^a-z0-9 ]/g," ").replace(/\s+/g," ").trim();

const REGISTER = SUCHE.map(e => Object.assign({}, e, {norm: glatt(e.t + " " + (e.s || "") + " " + (e.k || ""))}));

function trefferBild(e){
  if(e.id && IMG[e.id]) return IMG[e.id].startsWith("data:") ? IMG[e.id] : IMG[e.id] + "-680.webp";
  return e.b || "";
}

function suchen(q){
  const worte = glatt(q).split(" ").filter(Boolean);
  if(!worte.length) return [];
  return REGISTER
    .map(e => {
      let punkte = 0;
      for(const w of worte){
        if(!e.norm.includes(w)) return null;
        punkte += glatt(e.t).startsWith(w) ? 3 : glatt(e.t).includes(w) ? 2 : 1;
      }
      return {e, punkte};
    })
    .filter(Boolean)
    .sort((a,b) => b.punkte - a.punkte)
    .slice(0, 8)
    .map(x => x.e);
}

function trefferZeigen(q){
  const feld = $("#treffer");
  if(!feld) return;
  const liste = suchen(q);
  if(!liste.length){
    feld.hidden = true; feld.innerHTML = "";
    return;
  }
  const gruppen = {};
  liste.forEach(e => (gruppen[e.a] = gruppen[e.a] || []).push(e));
  feld.innerHTML = Object.keys(gruppen).map(a =>
    `<p class="treffer__art">${ART_NAME[a] || a}</p>` +
    gruppen[a].map(e => {
      const bild = trefferBild(e);
      const ziel = e.u ? `href="${e.u}"` : `href="#" data-open="${e.id}"`;
      return `<a class="treffer__zeile" ${ziel} role="option">
        ${bild ? `<img src="${bild}" alt="" width="64" height="64" loading="lazy" decoding="async">` : `<span class="treffer__leer" aria-hidden="true"></span>`}
        <span><b>${e.t}</b><small>${e.s || ""}</small></span>
      </a>`;
    }).join("")
  ).join("");
  feld.hidden = false;
}

/* Pfeiltasten durch die Treffer */
document.addEventListener("keydown", e => {
  const feld = $("#treffer");
  if(!feld || feld.hidden) return;
  if(e.key !== "ArrowDown" && e.key !== "ArrowUp" && e.key !== "Enter") return;
  const zeilen = Array.from(feld.querySelectorAll(".treffer__zeile"));
  if(!zeilen.length) return;
  const jetzt = zeilen.indexOf(document.activeElement);
  if(e.key === "Enter" && jetzt < 0) return;
  if(e.key === "Enter") return;
  e.preventDefault();
  const naechste = e.key === "ArrowDown"
    ? (jetzt < 0 ? 0 : Math.min(jetzt + 1, zeilen.length - 1))
    : (jetzt <= 0 ? -1 : jetzt - 1);
  if(naechste < 0) $("#searchInput").focus(); else zeilen[naechste].focus();
});


/* ============================================================
   15 — Trägheit: der Bildlauf bekommt Masse

   Ein nativer Bildlauf folgt dem Finger. Eine Kamera folgt ihm
   nicht — sie wird beschleunigt, sie läuft nach, sie kommt zur
   Ruhe. Genau das fehlt einer Seite, die sich wie ein Film
   anfühlen soll: nicht Weichzeichnung, sondern Masse.

   Der Bildlauf des Browsers bleibt der echte. Das Rad setzt nur
   noch ein Ziel, und jedes Bild wird ein Stück weit nachgeführt.
   Dadurch funktionieren Anker, Sprungmarken, Bildlaufleiste,
   Tastatur und scrollIntoView unverändert weiter — wer sonst noch
   scrollt, wird bemerkt und übernommen, statt bekämpft.

   Aus derselben Schleife fällt die Geschwindigkeit ab, und die ist
   der eigentliche Gewinn: daran hängen das Objektiv und das
   Gegenlicht. Schnelle Fahrt heißt mehr Farbquerfehler am Rand,
   so wie eine echte Optik unter einem harten Schwenk leidet.
   Bewegung, die etwas bedeutet, statt Bewegung als Zierrat.

   Drei Fälle bekommen keine Trägheit: Fingergeräte, weil der
   Schwung des Betriebssystems besser ist als jeder Nachbau;
   Bewegungsreduktion, weil Trägheit dort nichts zu suchen hat;
   und ein offener Dialog, weil der Bildlauf dann ihm gehört.
   Gemessen wird die Geschwindigkeit trotzdem überall.
   ============================================================ */
const VECOM = window.VECOM = window.VECOM || {};

/* ------------------------------------------------------------
   Gerät: einmal erkennen, dann nur noch nachschlagen

   Dieselbe Erkennung stand vorher dreimal wortgleich im Code —
   einmal je Renderer. Das ist nicht nur doppelt, es driftet
   auseinander: Wer eine Grenze verschiebt, verschiebt sie an
   einer Stelle und vergisst die anderen.

   Herauskommt eine Stufe, keine Sammlung von Einzelflags:

     aus     kein WebGL2, Software-Rasterizer oder
             Bewegungsreduktion — es läuft nichts
     mittel  Fingergerät oder schmale Anzeige: die Inszenierung
             läuft, aber gröber gerechnet und ohne das schwere
             Einzelobjekt
     hoch    alles

   „mittel" ist der eigentliche Punkt. Vorher war unter 900 px
   hart abgeschaltet — Telefone bekamen gar keine Inszenierung.
   Das ist die kleinere Fassung, nicht die keine.
   ------------------------------------------------------------ */
(function geraet(){
  const erzwingen = /[?&]renderer=erzwingen/.test(location.search);
  let karte = "", webgl2 = false;
  try{
    const gl = document.createElement("canvas").getContext("webgl2");
    if(gl){
      webgl2 = true;
      const i = gl.getExtension("WEBGL_debug_renderer_info");
      karte = (i ? gl.getParameter(i.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER)) || "";
      /* Den Prüfkontext gleich wieder hergeben — Browser erlauben nur
         eine begrenzte Zahl davon, und wir brauchen ihn nur für den Namen. */
      const w = gl.getExtension("WEBGL_lose_context"); if(w) w.loseContext();
    }
  }catch(e){}

  const weich  = /swiftshader|llvmpipe|software|basic render|microsoft basic/i.test(karte);
  const ruhig  = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finger = matchMedia("(hover: none), (pointer: coarse)").matches;
  const schmal = innerWidth < 900;

  /* ?renderer=erzwingen hebt die HARDWARE-Sperre auf, damit sich die
     Inszenierung auch auf einem Software-Rasterizer pruefen laesst. Die
     Geraeteklasse hebt es ausdruecklich nicht auf — sonst waere die
     mittlere Stufe die einzige, die niemand testen kann. */
  const stufe = (ruhig || (!erzwingen && (!webgl2 || weich))) ? "aus"
              : (schmal || finger) ? "mittel"
              : "hoch";

  /* Auf kleinen Anzeigen ist die Pixeldichte oft 3 — das dritte Mal
     kostet mehr, als es zeigt. */
  const dpr = Math.min(devicePixelRatio || 1, stufe === "mittel" ? 1.5 : 2);

  VECOM.geraet = () => ({stufe, dpr, webgl2, weich, ruhig, finger, schmal, karte});
})();

(function traegheit(){
  const ruhig  = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finger = matchMedia("(hover: none), (pointer: coarse)").matches;
  const traege = !ruhig && !finger;

  let ort = scrollY, ziel = scrollY, tempo = 0, erwartet = -1, laeuft = false, letzte = 0;
  let voriger = scrollY;

  /* Was die Seite von hier nimmt: wo sie steht und wie schnell sie zieht.
     tempo ist in Pixeln je Bild bei 60 Hz — bildratenunabhängig. */
  VECOM.bildlauf = () => ({ort, ziel, tempo});

  /* Ein Takt für alle, die am Bildlauf hängen. Diese Schleife läuft
     ohnehin, solange etwas zieht — eine zweite danebenzustellen wäre
     Verschwendung. Der letzte Aufruf vor dem Einschlafen meldet
     tempo = 0, damit niemand mit stehender Geschwindigkeit zurückbleibt. */
  const mitfahrer = new Set();
  VECOM.takt = fn => { mitfahrer.add(fn); wecken(); return () => mitfahrer.delete(fn); };

  const grenze  = () => Math.max(0, document.documentElement.scrollHeight - innerHeight);
  const klemmen = v => Math.max(0, Math.min(grenze(), v));

  function wecken(){
    if(laeuft) return;
    laeuft = true; letzte = performance.now();
    requestAnimationFrame(schritt);
  }

  function schritt(jetzt){
    const dt = Math.min(jetzt - letzte || 16.667, 50);
    letzte = jetzt;

    if(traege){
      const rest = ziel - ort;
      if(Math.abs(rest) < 0.08){
        ort = ziel;
      } else {
        /* Nachlauf unabhängig von der Bildrate: bei 60 wie bei 144 Bildern
           dieselbe Trägheit, nicht dieselbe Schrittweite. */
        ort += rest * (1 - Math.pow(1 - 0.115, dt / 16.667));
        erwartet = Math.round(ort);
        /* Ausdrücklich hart: die Stilvorgabe scroll-behavior:smooth
           würde sonst jedes Teilstück noch einmal weich anfahren. */
        scrollTo({top: ort, behavior: "instant"});
      }
    } else {
      /* Ohne Trägheit wird nur gemessen, nicht eingegriffen */
      ort = ziel = scrollY;
    }

    /* Die Geschwindigkeit kommt aus der tatsächlich zurückgelegten Strecke,
       nicht aus dem eigenen Nachlauf. Sonst bliebe das Objektiv stumm, sobald
       jemand über Sprungmarke, Tastatur oder Bildlaufleiste fährt — und genau
       das sind die härtesten Schwenks. */
    const stand = scrollY;
    tempo = (stand - voriger) / dt * 16.667;
    voriger = stand;

    if(Math.abs(tempo) < 0.03 && (!traege || ort === ziel)) tempo = 0;
    for(const fn of mitfahrer){ try{ fn(ort, tempo); }catch(e){} }
    if(tempo === 0 && (!traege || ort === ziel)){ laeuft = false; return; }
    requestAnimationFrame(schritt);
  }

  /* Elemente mit eigenem Bildlauf — Dialogtafel, Ergebnisliste — behalten ihn */
  function eigenerBildlauf(el){
    for(let n = el instanceof Element ? el : null; n && n !== document.body; n = n.parentElement){
      const s = getComputedStyle(n);
      if(/(auto|scroll)/.test(s.overflowY) && n.scrollHeight > n.clientHeight + 1) return true;
    }
    return false;
  }

  addEventListener("wheel", e => {
    if(!traege || e.ctrlKey) return;                       /* Strg+Rad ist Zoom */
    if(document.body.classList.contains("is-locked")) return;
    if(eigenerBildlauf(e.target)) return;
    e.preventDefault();
    const mass = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? innerHeight : 1;
    ziel = klemmen(ziel + e.deltaY * mass);
    wecken();
  }, {passive: false});

  /* Hat jemand anders gescrollt — Anker, Tastatur, Bildlaufleiste,
     scrollIntoView — dann wird sein Stand übernommen, nicht überschrieben. */
  addEventListener("scroll", () => {
    if(traege && Math.abs(scrollY - erwartet) <= 2){ wecken(); return; }
    ort = ziel = scrollY; erwartet = -1; wecken();
  }, {passive: true});

  addEventListener("resize", () => { ziel = klemmen(ziel); }, {passive: true});
})();


/* ============================================================
   16 — Hero: Kopfzeile über dem Bild, Film erst wenn es sich lohnt
   ============================================================ */
(function hero(){
  const buehne = document.querySelector(".hero--film");
  if(!buehne) return;
  const kopf = $("#head");
  const HERO = {"bild": "assets/img/hero/hero", "film": [{"datei": "assets/video/hero.mp4", "typ": "video/mp4"}, {"datei": "assets/video/hero.webm", "typ": "video/webm"}]};
  const bild = buehne.querySelector("[data-hero=standbild]");
  const film = buehne.querySelector("[data-hero=film]");
  const ruhig = matchMedia("(prefers-reduced-motion: reduce)").matches;

  if(bild && HERO.bild){
    if(HERO.bild.startsWith("data:")) bild.src = HERO.bild;
    else {
      bild.src = HERO.bild + "-1376.webp";
      bild.srcset = HERO.bild + "-1000.webp 1000w, " + HERO.bild + "-1376.webp 1376w, " + HERO.bild + "-1920.webp 1920w";
      bild.sizes = "100vw";
    }
  }

  /* Film nur, wenn: Datei vorhanden, keine Bewegungsreduktion, kein Sparmodus,
     kein schmales Display und keine gedrosselte Verbindung. */
  const netz = navigator.connection || {};
  const lohnt = HERO.film && HERO.film.length && !ruhig && !netz.saveData
             && !/(2g|slow-2g|3g)/.test(netz.effectiveType || "")
             && matchMedia("(min-width: 760px)").matches;
  function filmStarten(){
    if(!film || film.dataset.los) return;
    film.dataset.los = "1";
    /* Zwei Formate: WebM für Chrome und Firefox, MP4 für Safari */
    (HERO.film || []).forEach(q => {
      const s = document.createElement("source");
      s.src = q.datei; s.type = q.typ;
      film.appendChild(s);
    });
    film.addEventListener("playing", () => {
      film.classList.add("laeuft");
      buehne.classList.add("film-laeuft");
      buehne.classList.remove("film-blockiert");
    }, {once:true});
    film.load();
    /* Manche Browser verweigern die Wiedergabe trotz stumm — etwa Safari im
       Energiesparmodus. Dann bekommt der Besucher einen Knopf statt gar nichts. */
    const start = () => film.play().catch(() => buehne.classList.add("film-blockiert"));
    const knopf = buehne.querySelector("[data-filmstart]");
    if(knopf) knopf.addEventListener("click", () => {
      film.play().then(() => buehne.classList.remove("film-blockiert")).catch(()=>{});
    });
    if(bild && !bild.complete) bild.addEventListener("load", start, {once:true}); else start();
    /* Außerhalb des Sichtfelds anhalten — ein Film, den niemand sieht, kostet nur Akku */
    new IntersectionObserver(es => es.forEach(e => e.isIntersecting ? film.play().catch(()=>{}) : film.pause()),
      {threshold:.01}).observe(buehne);
  }

  /* Erst laden, wenn das Standbild steht und der Browser Luft hat —
     sonst verzögert der Film die größte Inhaltsdarstellung. */
  if(lohnt){
    const spaeter = () => (window.requestIdleCallback || (f => setTimeout(f, 400)))(filmStarten, {timeout: 2000});
    if(document.readyState === "complete") spaeter();
    else addEventListener("load", spaeter, {once:true});
  }

  /* Kopfzeile transparent, solange der Hero die Fläche füllt */
  let laeuft = false;
  function hoeheSetzen(){
    document.documentElement.style.setProperty("--kopfhoehe", kopf.offsetHeight + "px");
  }
  hoeheSetzen();
  if(window.ResizeObserver) new ResizeObserver(hoeheSetzen).observe(kopf);

})();



/* ============================================================
   17 — Eintritt, Klang, Tiefe
   ============================================================ */
const ruhigeBewegung = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* --- Vorhang: einmal je Sitzung --- */
(function vorhang(){
  const v = $("#vorhang");
  if(!v) return;
  let gesehen = false;
  try{ gesehen = sessionStorage.getItem("vecom.eintritt") === "1"; }catch(e){}
  if(gesehen || ruhigeBewegung){ v.hidden = true; return; }
  try{ sessionStorage.setItem("vecom.eintritt","1"); }catch(e){}
  document.body.classList.add("is-locked");
  const heben = () => {
    v.classList.add("hebt");
    document.body.classList.remove("is-locked");
    setTimeout(() => { v.hidden = true; }, 1200);
  };
  const bild = document.querySelector(".hero__bild");
  const bereit = bild && bild.complete ? Promise.resolve()
               : new Promise(r => { if(!bild) return r();
                   bild.addEventListener("load", r, {once:true});
                   bild.addEventListener("error", r, {once:true}); });
  /* Frühestens nach 900 ms, spätestens nach 2600 ms — niemand wartet länger */
  const mindestens = new Promise(r => setTimeout(r, 900));
  Promise.race([Promise.all([bereit, mindestens]), new Promise(r => setTimeout(r, 2600))]).then(heben);
})();

/* --- Klangkulisse: aus, bis jemand sie einschaltet --- */
(function klang(){
  const knopf = $("#klangToggle");
  const KLANG = [{"datei": "assets/audio/ambiente.m4a", "typ": "audio/mp4"}, {"datei": "assets/audio/ambiente.ogg", "typ": "audio/ogg"}];
  if(!knopf || !KLANG.length) return;
  knopf.hidden = false;

  let ton = null, ziel = 0, band = null;
  function anlegen(){
    if(ton) return ton;
    ton = document.createElement("audio");
    ton.loop = true; ton.preload = "none"; ton.volume = 0;
    KLANG.forEach(q => { const s = document.createElement("source"); s.src = q.datei; s.type = q.typ; ton.appendChild(s); });
    ton.id = "klangbett";
    document.body.appendChild(ton);
    return ton;
  }
  function blende(nach){
    ziel = nach;
    clearInterval(band);
    band = setInterval(() => {
      if(!ton) return clearInterval(band);
      const d = ziel - ton.volume;
      if(Math.abs(d) < 0.012){ ton.volume = ziel; clearInterval(band); if(ziel === 0) ton.pause(); return; }
      ton.volume = Math.max(0, Math.min(1, ton.volume + Math.sign(d) * 0.012));
    }, 45);
  }
  function setzen(an){
    knopf.setAttribute("aria-pressed", String(an));
    knopf.setAttribute("aria-label", an ? "Klangkulisse ausschalten" : "Klangkulisse einschalten");
    try{ localStorage.setItem("vecom.klang", an ? "1" : "0"); }catch(e){}
    if(an){ anlegen(); ton.play().then(() => blende(0.32)).catch(() => setzen(false)); }
    else blende(0);
  }
  knopf.addEventListener("click", () => setzen(knopf.getAttribute("aria-pressed") !== "true"));
  /* Im Hintergrundtab still */
  document.addEventListener("visibilitychange", () => {
    if(!ton) return;
    if(document.hidden) ton.pause();
    else if(knopf.getAttribute("aria-pressed") === "true") ton.play().catch(()=>{});
  });
  /* Wer den Ton schon einmal wollte, bekommt ihn wieder — aber erst nach einer Geste,
     Browser lassen automatische Wiedergabe mit Ton sonst nicht zu. */
  let wollte = false;
  try{ wollte = localStorage.getItem("vecom.klang") === "1"; }catch(e){}
  if(wollte && !ruhigeBewegung){
    const wecken = () => setzen(true);
    ["pointerdown","keydown"].forEach(e => addEventListener(e, wecken, {once:true, passive:true}));
  }
})();

/* --- Tiefe: Bildebenen laufen langsamer als die Seite --- */
(function tiefe(){
  const ebenen = $$("[data-parallax]");
  if(!ebenen.length || ruhigeBewegung) return;
  let laeuft = false;
  function zeichnen(){
    laeuft = false;
    ebenen.forEach(e => {
      const r = e.parentElement.getBoundingClientRect();
      if(r.bottom < -200 || r.top > innerHeight + 200) return;
      const mitte = (r.top + r.height/2 - innerHeight/2) / innerHeight;
      e.style.transform = "translate3d(0," + (mitte * parseFloat(e.dataset.parallax) * 100).toFixed(2) + "px,0)";
    });
  }
  addEventListener("scroll", () => { if(!laeuft){ laeuft = true; requestAnimationFrame(zeichnen); } }, {passive:true});
  addEventListener("resize", zeichnen);
  zeichnen();
})();

/* --- Warenkarten treten gestaffelt auf --- */
function kartenAuftritt(){
  const karten = $$("#grid .card:not(.da), .weiter__karte:not(.da), .betrieb__link:not(.da), .rezept__karte:not(.da)");
  if(!karten.length) return;
  if(ruhigeBewegung){ karten.forEach(k => k.classList.add("da")); return; }
  const beob = new IntersectionObserver(es => {
    es.forEach(e => {
      if(!e.isIntersecting) return;
      const geschwister = Array.from(e.target.parentElement.parentElement.children);
      const reihe = Math.max(geschwister.indexOf(e.target.parentElement), geschwister.indexOf(e.target), 0);
      e.target.style.transitionDelay = (Math.min(reihe % 8, 5) * 70) + "ms";
      e.target.classList.add("da");
      beob.unobserve(e.target);
    });
  }, {rootMargin: "0px 0px -8% 0px", threshold: .05});
  karten.forEach(k => beob.observe(k));
}


/* --- Kopfzeile folgt den dunklen Abschnitten, auf jeder Seite --- */
(function kopfzeile(){
  const kopf = $("#head");
  const dunkel = $$("[data-dunkel]");
  if(!kopf) return;
  function hoeheSetzen(){
    document.documentElement.style.setProperty("--kopfhoehe", kopf.offsetHeight + "px");
  }
  hoeheSetzen();
  if(window.ResizeObserver) new ResizeObserver(hoeheSetzen).observe(kopf);
  if(!dunkel.length) return;

  let laeuft = false;
  function pruefen(){
    laeuft = false;
    const linie = kopf.offsetHeight * 0.6;
    kopf.classList.toggle("ueber-hero", dunkel.some(e => {
      const r = e.getBoundingClientRect();
      return r.top <= linie && r.bottom >= linie;
    }));
  }
  addEventListener("scroll", () => { if(!laeuft){ laeuft = true; requestAnimationFrame(pruefen); } }, {passive:true});
  addEventListener("resize", pruefen);
  pruefen();
})();


/* ============================================================
   18 — Reise-Renderer (WebGL2): Tiefenrelief

   Sechs fotografische Kapitel, teils als Bewegtbild. Bisher lag
   jedes Bild flach auf einem Vollbild-Dreieck, und die „Kamerafahrt"
   war ein Hineinskalieren — dieselbe Bewegung für Vordergrund und
   Horizont. Das ist kein Hineinfahren, das ist Zoom.

   Jetzt ist jedes Kapitel Geometrie. Zu jedem Bild liegt eine
   Tiefenkarte im Bestand (512 × 288, rund 3 KB); sie verschiebt ein
   Gitter aus rund 35 000 Dreiecken entlang der Blickstrahlen. Eine
   echte Kamera fährt hinein. Die Kaper im Vordergrund wandert dann
   schneller aus dem Bild als der Hang dahinter — Parallaxe, die aus
   der Aufnahme selbst stammt und nicht aus einer Zahl.

   Der Kniff, damit nichts verrutscht: Jeder Gitterpunkt sitzt auf
   dem Blickstrahl, der durch seinen eigenen Bildpunkt geht. Steht
   die Kamera im Ausgangspunkt, deckt sich die Projektion darum
   wieder exakt mit dem Originalbild — unabhängig von der Tiefe.
   Erst die Bewegung erzeugt die Verschiebung.

   Wo die Tiefe springt, wird das Gitter gedehnt; hinter der Kaper
   liegt keine Bildinformation. Statt Löcher zu stopfen, dunkelt der
   Shader diese Flanken ab — eine gedehnte Kante liest sich so als
   Eigenschatten statt als Fehler.

   Fällt etwas aus — kein WebGL2, Software-Rasterizer, kleine
   Anzeige, Bewegungsreduktion, zu wenig Bildrate — übernimmt
   lautlos die CSS-Fassung. Fehlt nur die Tiefenkarte, bleibt das
   Kapitel flach und alles andere läuft weiter.
   ============================================================ */
(function reiseRenderer(){
  const spur   = document.querySelector(".reise__spur");
  const buehne = document.querySelector(".reise__buehne");
  const felder = Array.from(document.querySelectorAll(".reise__bild"));
  if(!spur || !buehne || felder.length < 2) return;
  if(matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  /* ?renderer=erzwingen hebt die Hardwaresperre zum Prüfen auf */
  const erzwingen = /[?&]renderer=erzwingen/.test(location.search);

  const leinwand = document.createElement("canvas");
  leinwand.className = "reise__gl";
  leinwand.setAttribute("aria-hidden", "true");
  const gl = leinwand.getContext("webgl2", {
    alpha: false, antialias: false, depth: true, stencil: false,
    powerPreference: "high-performance"
  });
  if(!gl) return;

  /* Erkannt wird einmal zentral, hier wird nur nachgeschlagen. */
  const geraet = (window.VECOM && VECOM.geraet) ? VECOM.geraet() : {stufe:"hoch", dpr:2};
  if(geraet.stufe === "aus") return;

  /* ---------------- Shader ---------------- */
  const VERT = `#version 300 es
layout(location=0) in vec2 aNdc;          /* Gitterpunkt im Bildschirmraum, -1 … 1 */

uniform sampler2D uTiefe;
uniform vec2  uRes, uBild, uTexel;
uniform float uFahrt, uRelief, uHatTiefe, uSeitlich;

out vec2  vUV;
out float vStreck, vFerne;

/* Bildschirmpunkt auf Bildkoordinate: das Bild deckt die Bühne,
   der Überstand wird beschnitten — wie object-fit: cover. */
vec2 deckung(vec2 ndc){
  float za = uRes.x / uRes.y;
  float zb = uBild.x / uBild.y;
  vec2  s  = za > zb ? vec2(1.0, zb / za) : vec2(za / zb, 1.0);
  vec2  uv = ndc * 0.5 + 0.5;
  return (uv - 0.5) / s + 0.5;
}

float tiefeBei(vec2 uv){
  /* Hell heißt FERN — so sind die Karten dieses Bestands angelegt, ueber alle
     sieben nachgemessen: der Dunst am oberen Rand liegt bei 151…246, der nahe
     Bewuchs am unteren bei 11…109. Andersherum liefe die Parallaxe verkehrt,
     der Horizont zoege schneller als der Vordergrund.
     Ohne Karte bleibt das Kapitel eine ebene Flaeche. */
  return uHatTiefe > 0.5 ? texture(uTiefe, clamp(uv, 0.0, 1.0)).r : 0.5;
}

void main(){
  vec2 uv = deckung(aNdc);
  vUV = uv;

  float t = tiefeBei(uv);
  vFerne = t;                                /* 0 = nah, 1 = fern */

  /* Wie stark springt die Tiefe hier? Daraus wird später der
     Eigenschatten an gedehnten Flanken. */
  float dx = abs(tiefeBei(uv + vec2(uTexel.x, 0.0)) - t);
  float dy = abs(tiefeBei(uv + vec2(0.0, uTexel.y)) - t);
  vStreck = clamp((dx + dy) * 7.0, 0.0, 1.0);

  /* Blickstrahl durch genau diesen Bildpunkt. Weil der Punkt auf
     seinem eigenen Strahl sitzt, deckt sich die Projektion im
     Ausgangspunkt der Kamera wieder mit dem Originalbild. */
  float tanH = 0.4142;                       /* tan(45°/2) — 45 Grad Bildwinkel */
  float za   = uRes.x / uRes.y;
  vec3 strahl = vec3(aNdc.x * tanH * za, aNdc.y * tanH, -1.0);

  float nah = 1.0, fern = 1.0 + 1.15 * uRelief;
  vec3  welt = strahl * mix(nah, fern, t);      /* dunkel = nah, hell = fern */

  /* Die Fahrt: hinein und ein Hauch zur Seite, damit die Parallaxe nicht nur
     radial aus der Bildmitte laeuft. Die Kamera schaut nach -z, hinein heisst
     also, ihren Standort nach -z zu ruecken — und der Standort wird vom Punkt
     abgezogen, nicht addiert. Andersherum entfernt sich das Bild. */
  vec3 kamera = vec3(uSeitlich * 0.055 * uRelief, 0.0, -uFahrt * 0.42 * uRelief);
  welt -= kamera;

  float n = 0.05, f = 12.0;
  float p = 1.0 / tanH;
  gl_Position = vec4(welt.x * p / za, welt.y * p,
                     (welt.z * (f + n) + 2.0 * f * n) / (n - f),
                     -welt.z);
}`;

  const FRAG = `#version 300 es
precision highp float;
in vec2  vUV;
in float vStreck, vFerne;
out vec4 farbe;

uniform sampler2D uBildT;
uniform vec2  uRes;
uniform float uZeit, uPost, uTempo, uMisch, uIstB;

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

void main(){
  vec2 s = gl_FragCoord.xy / uRes;

  /* Das Objektiv reagiert auf die Fahrt: ein harter Schwenk treibt den
     Farbquerfehler an den Rand, so wie eine echte Optik unter Tempo leidet. */
  float ab = (0.0035 + uTempo * 0.0075) * uPost;
  float r  = length(s - 0.5);
  vec2  d  = normalize(s - 0.5 + 1e-6) * (r * r) * ab;

  vec3 c = vec3(texture(uBildT, clamp(vUV + d, 0.0, 1.0)).r,
                texture(uBildT, clamp(vUV,     0.0, 1.0)).g,
                texture(uBildT, clamp(vUV - d, 0.0, 1.0)).b);

  /* Gedehnte Flanken werden zu Eigenschatten, statt als Loch aufzufallen */
  c *= 1.0 - vStreck * 0.55;

  float hell = smoothstep(0.62, 1.0, dot(c, vec3(0.2126, 0.7152, 0.0722)));
  c += vec3(1.0, 0.86, 0.62) * hell * 0.16 * uPost;

  /* Luftperspektive: Entferntes verliert Kontrast und nimmt die Farbe des
     Lichts an. Das ist die Tiefenwirkung, die eine echte Weite hat — und sie
     traegt weiter als Korn, weil sie aus der Tiefenkarte stammt und nicht
     gleichmaessig ueber dem Bild liegt. Quadratisch, damit der Vordergrund
     unangetastet bleibt und erst der Horizont weich wird. */
  vec3 dunst = vec3(0.87, 0.81, 0.67);
  c = mix(c, dunst, vFerne * vFerne * 0.20 * uPost);

  c = pow(max(c, 0.0), vec3(0.98, 1.0, 1.045));
  c = mix(vec3(dot(c, vec3(0.2126, 0.7152, 0.0722))), c, 1.07);
  c *= vec3(1.02, 1.0, 0.965);

  float vig = smoothstep(1.02, 0.32, length((s - 0.5) * vec2(uRes.x / uRes.y, 1.0)));
  c *= mix(1.0, 0.52 + 0.48 * vig, uPost);


  /* Der Kapitelwechsel läuft als Kante durchs Bild, nicht als Blende.
     Nur der zweite Durchgang trägt sie. */
  float a = 1.0;
  if(uIstB > 0.5){
    /* Jeder Bildpunkt bekommt eine eigene Schwelle aus Hoehe und Rauschen;
       der Wechsel schiebt sie als Kante durchs Bild. Entscheidend ist, dass
       bei uMisch = 0 wirklich nichts und bei uMisch = 1 wirklich alles steht —
       sonst deckt das naechste Kapitel das laufende sofort zu. */
    float nz = fbm(s * 3.2 + vec2(0.0, uZeit * 0.02));
    float schwelle = s.y * 0.45 + nz * 0.55;
    a = smoothstep(schwelle - 0.18, schwelle + 0.18, uMisch * 1.36 - 0.18);
  }
  farbe = vec4(clamp(c, 0.0, 1.0), clamp(a, 0.0, 1.0));
}`;

  function shader(art, quelle){
    const s = gl.createShader(art);
    gl.shaderSource(s, quelle); gl.compileShader(s);
    if(!gl.getShaderParameter(s, gl.COMPILE_STATUS)){
      if(erzwingen) window.__shaderFehler = (window.__shaderFehler || []).concat(gl.getShaderInfoLog(s));
      return null;
    }
    return s;
  }
  const vs = shader(gl.VERTEX_SHADER, VERT), fs = shader(gl.FRAGMENT_SHADER, FRAG);
  if(!vs || !fs) return;
  const prog = gl.createProgram();
  gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog);
  if(!gl.getProgramParameter(prog, gl.LINK_STATUS)){
    if(erzwingen) window.__programmFehler = gl.getProgramInfoLog(prog);
    return;
  }
  gl.useProgram(prog);

  const U = {};
  ["uTiefe","uBildT","uRes","uBild","uTexel","uFahrt","uRelief","uHatTiefe",
   "uSeitlich","uZeit","uPost","uTempo","uMisch","uIstB"]
    .forEach(nm => U[nm] = gl.getUniformLocation(prog, nm));
  gl.uniform1i(U.uBildT, 0);
  gl.uniform1i(U.uTiefe, 1);

  /* ---------------- Gitter ---------------- */
  /* Nur der Bildschirmort je Punkt; Tiefe und Weltlage rechnet der
     Vertex-Shader. Ein Puffer, ein Indexpuffer, sonst nichts. */
  /* Auf dem Telefon ein groeberes Gitter: rund ein Drittel der Dreiecke.
     Die Parallaxe braucht Aufloesung dort, wo die Tiefe springt — und das
     sind Kanten, keine Flaechen. Grob genug faellt es nicht auf, fein genug
     kostet es die Bildrate. */
  const fein = geraet.stufe === "mittel" ? [96, 54] : [176, 99];
  let gitterX = fein[0], gitterY = fein[1], indexAnzahl = 0;
  const vao = gl.createVertexArray();
  const eckPuffer = gl.createBuffer(), idxPuffer = gl.createBuffer();

  function gitterBauen(nx, ny){
    const ecken = new Float32Array((nx + 1) * (ny + 1) * 2);
    let o = 0;
    for(let y = 0; y <= ny; y++)
      for(let x = 0; x <= nx; x++){
        ecken[o++] = (x / nx) * 2 - 1;
        ecken[o++] = (y / ny) * 2 - 1;
      }
    const reihe = nx + 1;
    const idx = new Uint32Array(nx * ny * 6);
    let k = 0;
    for(let y = 0; y < ny; y++)
      for(let x = 0; x < nx; x++){
        const a = y * reihe + x, b = a + 1, c = a + reihe, d = c + 1;
        idx[k++] = a; idx[k++] = c; idx[k++] = b;
        idx[k++] = b; idx[k++] = c; idx[k++] = d;
      }
    gl.bindVertexArray(vao);
    gl.bindBuffer(gl.ARRAY_BUFFER, eckPuffer);
    gl.bufferData(gl.ARRAY_BUFFER, ecken, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, idxPuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, idx, gl.STATIC_DRAW);
    gl.bindVertexArray(null);
    indexAnzahl = idx.length;
  }
  gitterBauen(gitterX, gitterY);

  /* ---------------- Texturen ---------------- */
  const n        = felder.length;
  const texturen = new Array(n).fill(null);
  const tiefen   = new Array(n).fill(null);
  const masse    = felder.map(() => [16, 9]);
  const tMasse   = felder.map(() => [512, 288]);
  const filme    = new Array(n).fill(null);
  const bewegt   = new Array(n).fill(false);

  const platzhalter = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, platzhalter);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
                new Uint8Array([28, 34, 8, 255]));
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

  function neueTextur(){
    const t = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, t);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    return t;
  }

  function bildHochladen(i){
    if(texturen[i]) return;
    const bild = felder[i].querySelector("img");
    if(!bild || !bild.complete || !bild.naturalWidth) return;
    texturen[i] = neueTextur();
    gl.bindTexture(gl.TEXTURE_2D, texturen[i]);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, bild);
    masse[i] = [bild.naturalWidth, bild.naturalHeight];
  }

  /* Die Tiefenkarte trägt denselben Schlüssel wie das Kapitelbild —
     im Markup steht er ohnehin schon. */
  function tiefeHolen(i){
    if(tiefen[i] !== null) return;
    const bild = felder[i].querySelector("img");
    const schluessel = bild && bild.dataset.reise;
    /* data-tiefe="nein" sagt: zu diesem Kapitel gibt es (noch) keine Karte.
       Ohne die Abmeldung holte der Lader eine Datei, von der wir wissen, dass
       sie fehlt — ein 404 in der Konsole und eine Anfrage fuer nichts. */
    if(!schluessel || felder[i].dataset.tiefe === "nein"){ tiefen[i] = false; return; }
    tiefen[i] = false;                                  /* bis sie wirklich da ist */
    const k = new Image();
    k.decoding = "async";
    k.onload = () => {
      const t = neueTextur();
      gl.bindTexture(gl.TEXTURE_2D, t);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, k);
      tiefen[i] = t;
      tMasse[i] = [k.naturalWidth || 512, k.naturalHeight || 288];
    };
    k.onerror = () => { tiefen[i] = false; };            /* flach ist besser als gar nicht */
    k.src = "assets/img/tiefe/" + schluessel + ".webp";
  }

  felder.forEach((f, i) => {
    const bild = f.querySelector("img");
    if(!bild) return;
    if(bild.complete && bild.naturalWidth) bildHochladen(i);
    else bild.addEventListener("load", () => bildHochladen(i), {once:true});
  });

  /* ---------------- Bewegtbild ---------------- */
  const netz = navigator.connection || {};
  const bewegtErlaubt = !netz.saveData
      && !/(2g|slow-2g|3g)/.test(netz.effectiveType || "");

  function filmHolen(i){
    if(!bewegtErlaubt || filme[i] !== null) return;
    let quellen = null;
    try { quellen = JSON.parse(felder[i].dataset.film || "null"); } catch(e){}
    if(!quellen || !quellen.length){ filme[i] = false; return; }
    const v = document.createElement("video");
    v.muted = true; v.loop = true; v.playsInline = true; v.preload = "auto";
    v.setAttribute("muted", ""); v.setAttribute("playsinline", "");
    quellen.forEach(q => {
      const s = document.createElement("source");
      s.src = q.datei; s.type = q.typ; v.appendChild(s);
    });
    v.addEventListener("playing", () => { bewegt[i] = true; }, {once:true});
    v.addEventListener("error", () => { filme[i] = false; }, {once:true});
    filme[i] = v;
    v.load();
    v.play().catch(() => {});
  }

  function filmHochladen(i){
    const v = filme[i];
    if(!v || v === false || !bewegt[i] || v.readyState < 2 || !texturen[i]) return;
    gl.bindTexture(gl.TEXTURE_2D, texturen[i]);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, v);
    if(v.videoWidth) masse[i] = [v.videoWidth, v.videoHeight];
  }

  /* ---------------- Adaptive Qualität ---------------- */
  const maxDpr = geraet.dpr;
  let dpr = maxDpr, post = 1.0, relief = 1.0, tempoGlatt = 0;
  let kamRoh = 0, kamTempo = 0;            /* Kameraort und -geschwindigkeit */
  let fenster = 0, bilder = 0, gut = 0, aus = false;

  function groesse(){
    const b = buehne.getBoundingClientRect();
    const w = Math.max(1, Math.round(b.width  * dpr));
    const h = Math.max(1, Math.round(b.height * dpr));
    if(leinwand.width !== w || leinwand.height !== h){
      leinwand.width = w; leinwand.height = h;
      gl.viewport(0, 0, w, h);
      gl.uniform2f(U.uRes, w, h);
    }
  }

  function abschalten(){
    aus = true;
    filme.forEach(v => { if(v && v !== false){ v.pause(); v.removeAttribute("src"); v.load(); } });
    leinwand.remove();
    buehne.classList.remove("gl-an");
  }

  let letzte = performance.now();

  /* Ein Kapitel zeichnen: Bild, Tiefe, Fahrt, Rolle im Wechsel */
  function kapitel(i, fahrt, seitlich, istB, misch){
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texturen[i] || platzhalter);
    gl.activeTexture(gl.TEXTURE1);
    const tf = tiefen[i];
    gl.bindTexture(gl.TEXTURE_2D, tf || platzhalter);

    gl.uniform2f(U.uBild, masse[i][0], masse[i][1]);
    gl.uniform2f(U.uTexel, 1 / tMasse[i][0], 1 / tMasse[i][1]);
    gl.uniform1f(U.uHatTiefe, tf ? 1 : 0);
    gl.uniform1f(U.uFahrt, fahrt);
    gl.uniform1f(U.uSeitlich, seitlich);
    gl.uniform1f(U.uRelief, relief);
    gl.uniform1f(U.uIstB, istB);
    gl.uniform1f(U.uMisch, misch);

    gl.bindVertexArray(vao);
    gl.drawElements(gl.TRIANGLES, indexAnzahl, gl.UNSIGNED_INT, 0);
    gl.bindVertexArray(null);
  }

  function zeichnen(jetzt){
    if(aus) return;
    requestAnimationFrame(zeichnen);

    const r = spur.getBoundingClientRect();
    if(r.bottom < -100 || r.top > innerHeight + 100){
      letzte = jetzt;
      filme.forEach(v => { if(v && v !== false && !v.paused) v.pause(); });
      return;
    }

    const dt = jetzt - letzte; letzte = jetzt;
    fenster += dt; bilder++;
    if(fenster > 800){
      const mittel = fenster / bilder;
      fenster = 0; bilder = 0;
      if(mittel > 26){
        /* Erst feiner rechnen, dann flacher, dann grober, dann fort */
        if(dpr > 1){ dpr = Math.max(1, dpr - 0.5); groesse(); }
        else if(post > 0){ post = 0; }
        else if(gitterX > 64){ gitterX = 64; gitterY = 36; gitterBauen(gitterX, gitterY); }
        else if(relief > 0){ relief = 0; }
        else { abschalten(); return; }
      } else if(mittel < 15){
        if(++gut > 6 && dpr < maxDpr){ gut = 0; dpr = maxDpr; groesse(); }
      }
    }

    groesse();

    const weg = r.height - innerHeight;
    const p   = weg > 0 ? Math.min(Math.max(-r.top / weg, 0), 1) : 0;
    const roh = p * n;
    const i   = Math.min(Math.floor(roh), n - 1);
    const j   = Math.min(i + 1, n - 1);
    const t   = Math.min(Math.max(roh - i, 0), 1);

    /* Kamera mit Masse. Bisher sass sie starr auf dem Bildlauf: Rad steht,
       Bild steht. Eine echte Kamera wird beschleunigt, laeuft nach und
       schwingt aus — Feder zum Ziel, Daempfung dagegen.

       Wichtig ist, was NICHT nachlaeuft: Kapitelwahl und Ueberblendung
       bleiben am rohen Bildlauf, sonst zeigte das Bild noch das vorige
       Kapitel, waehrend der Text schon das naechste behauptet. Nur die
       Fahrt innerhalb des Kapitels bekommt Traegheit — genau dort faellt
       sie auf und stoert nirgends.

       Der Schritt ist auf drei Bilder gedeckelt: nach einem Tabwechsel
       darf die Feder nicht mit einem halben Sekunde grossen dt losschnellen. */
    const schritt = Math.min(dt / 16.667, 3);
    kamTempo += (roh - kamRoh) * 0.075 * schritt;
    kamTempo *= Math.pow(0.85, schritt);
    kamRoh   += kamTempo * schritt;
    const fahrt = Math.min(Math.max(kamRoh - i, 0), 1);

    /* Laufendes und nächstes Kapitel bewegt halten, den Rest anhalten */
    for(let k = 0; k < n; k++){
      const v = filme[k];
      if(k === i || k === j){
        filmHolen(k); tiefeHolen(k);
        const w2 = filme[k];
        if(w2 && w2 !== false && w2.paused) w2.play().catch(() => {});
      } else if(v && v !== false && !v.paused){
        v.pause();
      }
    }
    filmHochladen(i);
    if(j !== i) filmHochladen(j);

    const rohTempo = (window.VECOM && VECOM.bildlauf)
                   ? Math.min(Math.abs(VECOM.bildlauf().tempo) / 55, 1) : 0;
    tempoGlatt += (rohTempo - tempoGlatt) * 0.12;

    gl.uniform1f(U.uZeit, jetzt * 0.001);
    gl.uniform1f(U.uPost, post);
    gl.uniform1f(U.uTempo, tempoGlatt);

    gl.enable(gl.DEPTH_TEST);
    gl.clearColor(0.11, 0.13, 0.03, 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    /* Laufendes Kapitel: die Fahrt geht über den ganzen Abschnitt hinein —
       nachlaufend, waehrend die Ueberblendung am Bildlauf haengt. */
    kapitel(i, fahrt, fahrt - 0.5, 0.0, 0.0);

    /* Das nächste Kapitel setzt am Anfang seiner eigenen Fahrt an und
       schiebt sich als Kante darüber. Eigener Tiefenpuffer, damit es
       nicht mit dem vorigen Relief ringt. */
    if(j !== i && t > 0.001){
      gl.clear(gl.DEPTH_BUFFER_BIT);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      kapitel(j, 0.0, -0.5, 1.0, t);
      gl.disable(gl.BLEND);
    }
  }

  function start(){
    if(!texturen[0]) return false;
    buehne.insertBefore(leinwand, buehne.firstChild);
    buehne.classList.add("gl-an");
    groesse();
    addEventListener("resize", groesse);
    document.addEventListener("visibilitychange", () => {
      if(document.hidden) filme.forEach(v => { if(v && v !== false) v.pause(); });
      else letzte = performance.now();
    });
    requestAnimationFrame(zeichnen);
    return true;
  }
  if(erzwingen) window.__rendererStand = () => ({
    texturen: texturen.map(x => !!x),
    tiefen: tiefen.map(x => x === null ? null : !!x),
    bilder: felder.map(f => { const i = f.querySelector("img"); return i ? i.naturalWidth : -1; }),
    aus, dpr, post, relief, gitter: gitterX + "x" + gitterY, dreiecke: indexAnzahl / 3,
    kamRoh, kamTempo
  });
  const warten = setInterval(() => { if(start()) clearInterval(warten); }, 120);
  setTimeout(() => clearInterval(warten), 20000);
})();

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

/* ============================================================
   20 — Atmosphäre: dieselbe Luft auf allen Seiten

   Dreiundvierzig Adressen fühlen sich erst dann wie ein Ort an,
   wenn über allen dasselbe Licht liegt: Gegenlicht, das mit dem
   Bildlauf wandert, und eine warme Randabdunklung.

   Der Ausschlag liegt darin, wo nichts davon liegt. Ein Schleier
   über einer hellen Warenliste sähe nach Fotofilter aus, nicht
   nach Kamera. Die Schicht misst
   deshalb je Bild, wie viel des Sichtfelds gerade der Fotografie
   gehört: Szenenkopf, Hero, Reise, Fries. Füllt Bild das Fenster,
   ist sie da; liegt Papier darunter, ist sie fort. Jede Seite hat
   einen Szenenkopf, die Kopplung trägt also überall.

   Gerechnet wird hier nur das Ziel — die Überblendung macht die
   Stilvorgabe. Dadurch bleibt der Übergang weich, auch wenn die
   Bildlaufschleife zwischendurch einschläft.

   Kein Filmkorn: es legt einen gleichmäßigen Schleier über alles
   und nimmt der Fotografie die Ruhe, die sie teuer aussehen lässt.
   Die Fahrt treibt stattdessen das Gegenlicht auf.
   ============================================================ */
(function atmosphaere(){
  /* Im Kontrastmodus hat eine Schleierschicht nichts zu suchen */
  if(matchMedia("(prefers-contrast: more)").matches) return;

  const bild = Array.from(document.querySelectorAll(".hero,.reise,.szene,.zwischen,.frieze"));
  if(!bild.length) return;


  const schicht = document.createElement("div");
  schicht.className = "atmo";
  schicht.setAttribute("aria-hidden", "true");
  schicht.innerHTML = '<div class="atmo__rand"></div><div class="atmo__licht"></div>';
  document.body.appendChild(schicht);

  /* Reicht die Bildrate nicht, fällt die Schicht — sie ist Zugabe. Gemessen
     wird nur, während wirklich gezogen wird; im Stillstand sagt eine Bildrate
     nichts aus. */
  const stand = {};
  function setzen(name, wert, schwelle){
    if(stand[name] !== undefined && Math.abs(stand[name] - wert) < schwelle) return;
    stand[name] = wert;
    schicht.style.setProperty(name, wert.toFixed(4));
  }

  let fenster = 0, bilder = 0, stufe = 2, vorige = performance.now(), abmelden = null;
  function bildrate(tempo){
    const jetzt = performance.now(), dt = jetzt - vorige;
    vorige = jetzt;
    if(Math.abs(tempo) < 1 || dt > 200) return;      /* Stillstand, Tabwechsel */
    fenster += dt; bilder++;
    if(fenster < 900) return;
    const mittel = fenster / bilder; fenster = 0; bilder = 0;
    if(mittel > 26 && stufe){ stufe = 0; schicht.remove(); if(abmelden) abmelden(); }
  }

  abmelden = VECOM.takt((ort, tempo) => {
    bildrate(tempo);
    if(!stufe) return;
    /* Erst alle Maße lesen, dann schreiben — sonst rechnet der Browser
       das Seitenlayout mitten in der Schleife neu. */
    let bedeckt = 0;
    for(const el of bild){
      const r = el.getBoundingClientRect();
      bedeckt += Math.max(0, Math.min(r.bottom, innerHeight) - Math.max(r.top, 0));
    }
    const weg = Math.max(0, document.documentElement.scrollHeight - innerHeight);

    /* Nur schreiben, wenn sich wirklich etwas geändert hat. Jedes Setzen
       rechnet den Stil neu und startet die laufende Überblendung von vorn —
       je Bild gemessen kostet das mehr als die Schicht selbst. */
    setzen("--atmo-kraft", Math.min(bedeckt / innerHeight, 1), 0.02);
    setzen("--atmo-tempo", Math.min(Math.abs(tempo) / 55, 1),  0.05);
    setzen("--atmo-lauf",  weg ? ort / weg : 0,                0.004);
  });
})();


/* ============================================================
   21 — Weltübergang: der Seitenwechsel als Kamerafahrt

   Bisher blendete die Seite. Eine Blende sagt „anderes Dokument";
   eine Kamerafahrt sagt „anderer Ort". Zwei Dinge machen den
   Unterschied:

   Erstens die Richtung. Wer in ein Erzeugnis geht, fährt hinein —
   die verlassene Seite wächst über den Rand und verliert die
   Schärfe, die neue kommt aus der Tiefe entgegen. Zurück läuft
   dieselbe Bewegung rückwärts. Gemeldet wird das als Übergangsart,
   die Bewegung selbst steht in der Stilvorgabe.

   Zweitens das Bild. Der Szenenkopf der Zielseite trug den Namen
   für den Bildwechsel schon; auf den Karten war er ausdrücklich
   abgeschaltet. Der Morph hatte also nur eine Seite und blieb eine
   Blende. Jetzt bekommt die angeklickte Karte denselben Namen —
   das Bild wandert von der Karte an seinen Platz im Kopf.

   Ein Name darf dabei nur einmal vorkommen: sind es zwei, bricht
   der Browser den ganzen Übergang ab. Auf einer Seite, die selbst
   einen Szenenkopf hat, wird dessen Name deshalb vorher freigegeben.

   Kennt der Browser das alles nicht, passiert schlicht nichts und
   die einfache Blende von vorher greift weiter.
   ============================================================ */
(function weltuebergang(){
  if(!document.startViewTransition) return;
  if(matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const NAME = "ware";
  let richtung = "tiefer";

  /* Die angeklickte Karte gibt ihr Bild an den Szenenkopf der Zielseite ab */
  document.addEventListener("click", e => {
    const verweis = e.target.closest("a[href]");
    if(!verweis || verweis.target || verweis.hasAttribute("download")) return;
    if(e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;

    let ziel;
    try { ziel = new URL(verweis.href, location.href); } catch(f){ return; }
    if(ziel.origin !== location.origin) return;
    if(ziel.pathname === location.pathname) return;          /* Anker, kein Ortswechsel */

    const karte = verweis.closest(".card, .weiter__karte, .rezept__karte, .betrieb__link")
               || verweis;
    const bild = karte.querySelector("img");
    if(!bild) return;

    /* Platz machen: derselbe Name darf nur einmal vergeben sein */
    const kopf = document.querySelector(".szene__bild img");
    if(kopf && kopf !== bild) kopf.style.viewTransitionName = "none";
    bild.style.viewTransitionName = NAME;
  }, true);

  /* Richtung bestimmen: zurück ist zurück, alles andere geht hinein */
  addEventListener("pageswap", e => {
    const art = e.activation && e.activation.navigationType;
    richtung = art === "traverse" ? "zurueck" : "tiefer";
    if(e.viewTransition) e.viewTransition.types.add(richtung);
  });

  addEventListener("pagereveal", e => {
    if(!e.viewTransition) return;
    const art = navigation && navigation.activation && navigation.activation.navigationType;
    e.viewTransition.types.add(art === "traverse" ? "zurueck" : "tiefer");
  });
})();


/* ============================================================
   13 — Start
   ============================================================ */
warenkorbLaden();
if($("#filters")) renderFilters();
if($("#grid")){ renderGrid(); }
kartenAuftritt();
renderCart();

/* Auf einer Produktseite: Menge und Warenkorbknopf verdrahten */
const seite = document.querySelector("[data-produkt]");
if(seite){
  const id = seite.dataset.produkt;
  let q = 1;
  const out = $("#pdQty");
  an("#pdMinus", "click", ()=>{ q = Math.max(1, q-1); out.textContent = q; });
  an("#pdPlus",  "click", ()=>{ q = Math.min(20, q+1); out.textContent = q; });
  an("#pdAdd",   "click", ()=>{ addToCart(id, q); openCart(); });
}
})();

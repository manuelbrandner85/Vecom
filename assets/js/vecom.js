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
const REISE = {"pantelleria": {"pfad": "assets/img/reise/pantelleria", "lqip": "data:image/webp;base64,UklGRn4AAABXRUJQVlA4IHIAAAAQBACdASoYAA4APwFqrU8rJaQiMAgBYCAJYwDFEUB1f4DaBATDERYvOAD+tf43CrA16apKw5vrEg+I8FPe+4TSQhcJQFfAjCdxX/Jr6+SA7zTQ9/GLfPrSVmCXYg1D5KKI0BtGDjk45W10mTWcU8cAAAA="}, "salinen": {"pfad": "assets/img/reise/salinen", "lqip": "data:image/webp;base64,UklGRpQAAABXRUJQVlA4IIgAAADwAwCdASoYAA4APwFsrk+rJiQiMAgBYCAJbACdMoACKo/Y1gDxBMvAAP6DLVoleko8ZEczIevvdgBXsv+0uoAtvyc2tLh5Fm/iub1Bk1DEBfqf6PeFdIWNO3JFYH6dpNEKgGHMO8JsNkNR3NLSJ81wh6XdVnxn0BOwyQCt7iWkdkomijQSBgAA"}, "aetna": {"pfad": "assets/img/reise/aetna", "lqip": "data:image/webp;base64,UklGRmwAAABXRUJQVlA4IGAAAADwAwCdASoYAA4APwFsrk8rJaQiMAgBYCAJQBOgA8NhYUaMvjHL13ZgAP6DxMG7/WQMpE+ytCEIOEsa+RObDyHGVSoeds5DpWSOPpeb9brwGSD4RbtUcoLjX7CvSja+oAA="}, "hain": {"pfad": "assets/img/reise/hain", "lqip": "data:image/webp;base64,UklGRpgAAABXRUJQVlA4IIwAAAAQBACdASoYAA4APwFqrU8rJiQiMAgBYCAJZACdMoABnYYwN9PFX+FggAD+0avCLzzzZYv5Si7yeEOtkSKvpz0BO4VYTUQdG+X8/+bcPHLGTz/7IIpGFvj+nuZ9K3K6NUX8fV3KORNycF1mFkgRVLI7yGA985YR0ecvX0fXdJaXZUEHEyvj7kFI/qAAAA=="}, "muehle": {"pfad": "assets/img/reise/muehle", "lqip": "data:image/webp;base64,UklGRpQAAABXRUJQVlA4IIgAAAAwBACdASoYAA4APwFsrU8rJiQiMAgBYCAJYgCdABb4imf584UKjoVH2AAA/ulGRdjO2/ctQ7bNFxO7pR6aknG4Kc/LM395giwj99DXfpG54Yn4nS6Rvb82osrt+PRCRl2illmyBS9OfG6NWuLr+GQraQTtLKMIqynb8cCnSxFTEjL4ZgqlNjQA"}, "versand": {"pfad": "assets/img/reise/versand", "lqip": "data:image/webp;base64,UklGRo4AAABXRUJQVlA4IIIAAAAQBACdASoYAA4APwFsrU8rJiQiMAgBYCAJZgCdACH6r6D2tXi/jLXoAAD+415lS8/F5uE1UlG8sRPq6MeVjm1TOnhUjhoiKXRQcCaIGh0Mk5Lxfg4Y8cP/QMxjmSYMobHM/dnmJsjiSPska6VC6qYMIwC00g9c3Pg6LbvRMs24AAAA"}};   /* Kapitelbilder, auch von der großen Navigation genutzt */
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
  $("#grid").innerHTML = list.map(p=>`
    <article class="card">
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

  const sicht = new IntersectionObserver(es => {
    es.forEach(e => { if(e.isIntersecting){ bilderLaden(); sicht.disconnect(); } });
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

    /* Bild: langsames Heranfahren über das ganze Kapitel, weiches Überblenden am Rand */
    bilder.forEach((f, k) => {
      const d = k - roh + 0.5;               /* Abstand zur Mitte des Kapitels */
      const sicht = Math.min(Math.max(1 - Math.abs(d) * 1.55, 0), 1);
      f.style.opacity = sicht.toFixed(3);
      const eigen = Math.min(Math.max(roh - k, 0), 1);
      f.style.transform = "scale(" + (1.085 - eigen * 0.085).toFixed(4) +
                          ") translate3d(0," + ((eigen - .5) * -2.2).toFixed(2) + "%,0)";
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


/* ============================================================
   15 — Suche über die ganze Seite
   ============================================================ */
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
    film.addEventListener("playing", () => film.classList.add("laeuft"), {once:true});
    film.load();
    const start = () => film.play().catch(() => {});
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

  function pruefen(){
    laeuft = false;
    const grenze = buehne.offsetHeight - kopf.offsetHeight - 8;
    kopf.classList.toggle("ueber-hero", scrollY < grenze);
  }
  addEventListener("scroll", () => { if(!laeuft){ laeuft = true; requestAnimationFrame(pruefen); } }, {passive:true});
  addEventListener("resize", pruefen);
  pruefen();
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
  const karten = $$("#grid .card:not(.da)");
  if(!karten.length) return;
  if(ruhigeBewegung){ karten.forEach(k => k.classList.add("da")); return; }
  const beob = new IntersectionObserver(es => {
    es.forEach(e => {
      if(!e.isIntersecting) return;
      const reihe = $$("#grid .card").indexOf(e.target);
      e.target.style.transitionDelay = (Math.min(reihe % 8, 5) * 70) + "ms";
      e.target.classList.add("da");
      beob.unobserve(e.target);
    });
  }, {rootMargin: "0px 0px -8% 0px", threshold: .05});
  karten.forEach(k => beob.observe(k));
}

/* ============================================================
   13 — Start
   ============================================================ */
warenkorbLaden();
if($("#filters")) renderFilters();
if($("#grid")){ renderGrid(); kartenAuftritt(); }
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

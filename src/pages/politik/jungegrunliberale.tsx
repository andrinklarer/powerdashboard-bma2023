import Navbar from "~/components/Navbar";
import Link from "next/link";
import PoliticsQA from "~/components/PoliticsQA";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const questionPage = {
  partyName: "Junge Grünliberale",
  partyURL: "https://jungegrunliberale.ch",
  partyImage: "/politik/jungegrunliberale-logo.webp",
  source: "https://jungegrunliberale.ch/unsere-politik#positionen",
  content: [
    {
      /* erweitere antwort hier */
      question:
        "Wie bewertet Ihre Partei die aktuelle Stromversorgungssituation in der Schweiz in Bezug auf Nachhaltigkeit, Sicherheit und erneuerbare Energien?",
      response:
        "Wir versuchen die offizielle Parteimeinung bestmöglich wiederzugeben.",
      responseList: [
        "Vorbemerkung: Strom macht nur ca. 25% des CH Gesamtenergieverbrauches aus. Auch die Versorgung mit Gas und andern nicht-erneuerbaren Energieträgern sind kritisch.",
        "Unser aktuelles Stromversorgungssystem ist mit 60% Wasserkraft und 35% Nuklear im internationalen Vergleich in Bezug auf Nachhaltigkeit und Sicherheit eher gut situiert. Der zunehmende Importbedarf im Winter ist allerdings suboptimal.",
        "Der Anteil erneuerbare (PV als Ergänzung zu Wasserkraft, sowie evtl. auch Wind) muss allerdings verstärkt zugebaut werden um die AKWs mittelfristig zu ersetzen.",
        "Sicherheit: Erneuerbare Energien reduzieren die Klumpenrisiken, welche mit Energieimport (fossil oder Nuklearbrennstäbe) verbunden sind. Trotzdem werden in Ausnahmesituationen Notfall-Reserven mit fossilen Energieträgern aus grossen Speichern zum Einsatz kommen. Wasserkraft und Flachland-PV leisten viel und sind absolut nötig, führen aufgrund der Saisonalität aber zu einer Winterstromlücke. Es braucht hierfür Speicher, Netz, und Europa. Siehe dazu die Vorschläge in der nächsten Text-Antwort.",
      ],
      source: "",
    },
    {
      /* erweitere antwort hier */
      question: "Wie stufen Sie die aktuelle Stromversorgungslage ein?",
      response: "Angespannt",
      source: "",
    },
    {
      /* erweitere antwort hier */
      question:
        "Welche entscheidenden Schritte müssen ergriffen werden, damit wir in der Schweiz eine zuverlässige und nachhaltige Stromversorgung für die Zukunft sicherstellen können?",
      response:
        "Die zunehmende Verbreitung von E-Mobilität und Wärmepumpen zur Ablösung fossiler Energieträger ist zu begrüssen. Es wird so in Summe weniger Energie verbraucht, aber mehr Strom. Deshalb braucht es strategische Investitionen ins Strom-Versorgungssystem. Einerseits ist das Netz auszubauen. Sowohl das lokale Verteilnetz wie auch das internationale Verteilnetz. Andererseits braucht es mehr PV (und Wind), insbesondere auch Anlagen die Winterstrom produzieren wie Alpine Solaranlagen oder Anlagen mit hohem Anstellwinkel.",
      responseList: [
        "Die Schweiz ist politisch besser an das EU Netz anzubinden (Stromabkommen).",
        "Tarifreform: Stromtarife sollten die Verbraucher anregen, ihre vorhandene Flexibilität dem Energiesystem zur Verfügung zu stellen. z. Bsp. die thermische Masse vom Gebäude oder die Batterie vom Auto. Das heutigen Tag-/Nacht Tarife sind überholt.",
        "Bei Wärmepumpen ist künftig der Einsatz von thermischen Speichern (via Fernwärmenetze) zu prüfen. Es braucht dafür nebst der Raumplanung auch eine Energierichtplanung.",
      ],
      conclusion:
        "Das Billigste ist aber immer Energie/Strom sparen! Die Förderung vom Langsamverkehr/ÖV und gut isolierte Häuser sind deshalb nötig. So können der Stromverbrauch allgemein gesenkt und die Kosten für den Ausbau reduziert werden.",
      source: "",
    },
  ],
};

const JungeGrunliberale = () => {
  const { resolvedTheme } = useTheme();
  const [iconPath, setIconPath] = useState("dark");

  useEffect(() => {
    // Set the icon path as soon as provided dynamically based on the resolved theme
    if (resolvedTheme) {
      setIconPath(`${resolvedTheme}`);
    }
  }, [resolvedTheme]);

  return (
    <>
      <div className="flex">
        <main className="relative flex-grow">
          <Navbar />
          <PoliticsQA
            partyImage={"/" + iconPath + questionPage.partyImage}
            partyURL={questionPage.partyURL}
            content={questionPage.content}
          />
          <div className="mb-20 flex justify-center pt-10 sm:text-sm md:text-lg">
            <Link
              href={questionPage.source}
              className="text-sm italic underline"
            >
              {questionPage.source}
            </Link>
          </div>
        </main>
      </div>
    </>
  );
};

export default JungeGrunliberale;

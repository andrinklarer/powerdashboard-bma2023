import Navbar from "~/components/Navbar";
import Link from "next/link";
import PoliticsQA from "~/components/PoliticsQA";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const questionPage = {
  partyName: "FDP Die Liberalen",
  partyURL: "https://www.fdp.ch",
  partyImage: "/politik/fdp-logo.svg",
  source:
    "https://www.fdp.ch/fileadmin/documents/fdp.ch/pdf/DE/Positionen/Umwelt__Verkehr__Energie_und_Kommunikation/Resolutionen/20220212_RES_Stromversorgungssicherheit_d.pdf",
  content: [
    {
      question:
        "Wie bewertet Ihre Partei die aktuelle Stromversorgungssituation in der Schweiz in Bezug auf Nachhaltigkeit, Sicherheit und erneuerbare Energien?",
      response:
        "Die FDP sieht den Ausbau der erneuerbaren Energien als notwendig an und fordert eine pragmatische Lösung, die sowohl die Versorgungssicherheit gewährleistet als auch die Klimaziele berücksichtigt.",
      source: "",
    },
    {
      question: "Wie stufen Sie die aktuelle Stromversorgungslage ein?",
      response:
        'Kritisch: "Bereits ab 2025 besteht aufgrund der ungewissen Ausgangslage in Bezug auf die künftige Integration der Schweiz im europäischen Strommarkt ein Risiko für anhaltende Stromlücken"',
      source: "",
    },
    {
      question:
        "Welche entscheidenden Schritte müssen ergriffen werden, damit wir in der Schweiz eine zuverlässige und nachhaltige Stromversorgung für die Zukunft sicherstellen können?",
      response:
        '"Mittel- bis langfristig stellen sich diverse Fragen bezüglich unserer Stromversorgungssicherheit [...] Der weitere Ausbau der Wasserkraft mit seinen knapp 60 Prozent Anteil an der Produktion ist aufgrund der ganzen Beschwerdeverfahren der links-grünen Verbände in Gefahr"',
      source: "",
    },
    {
      question: "Braucht die Schweiz Atomkraftwerke?",
      response:
        'Ja, aber nur die bestehenden: "Um auch mittelfristig und vor allem in den Wintermonaten eine sichere Stromversorgung zu garantieren müssen die bestehenden Kernkraftwerke (KKW) so lange betrieben werden können wie sie sicher sind"',
      source: "",
    },
    {
      question: "Welche Vorteile sehen Sie in Atomkraft?",
      response:
        "Die FDP erkennt die Bedeutung der bestehenden Kernkraftwerke für die Stromversorgungssicherheit an, insbesondere in den Wintermonaten.",
      source: "",
    },
    {
      question:
        "Wie soll die Produktion der Atomkraftwerke kompensiert werden?",
      response:
        "Neben dem Ausbau der erneuerbaren Energien und der Verbesserung der Energieeffizienz ist die Förderung der Transparenz und Information der Bevölkerung über die aktuelle Strom- und Energieversorgung der Schweiz notwendig",
      source: "",
    },
  ],
};

const FDP = () => {
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
              Positionspapier FDP
            </Link>
          </div>
        </main>
      </div>
    </>
  );
};

export default FDP;

import Navbar from "~/components/Navbar";
import Link from "next/link";
import PoliticsQA from "~/components/PoliticsQA";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const questionPage = {
  partyName: "JUSO",
  partyURL: "https://juso.ch",
  partyImage: "/politik/juso-logo.svg",
  source: "https://juso.ch/de/positionspapiere/programm/",
  content: [
    {
      question:
        "Wie bewertet Ihre Partei die aktuelle Stromversorgungssituation in der Schweiz in Bezug auf Nachhaltigkeit, Sicherheit und erneuerbare Energien?",
      response:
        "Die JUSO betont die Bedeutung einer CO2-neutralen Stromversorgung und unterstützt die Beschleunigung des Ausbaus erneuerbarer Energien.",
      source: "",
    },
    {
      question: "Wie stufen Sie die aktuelle Stromversorgungslage ein?",
      response:
        "Die JUSO sieht die Notwendigkeit von Anreizen im Bereich der Speicherung für kritische Wintermonate, was auf eine angespannte oder besorgniserregende Situation hindeuten könnte.",
      source: "",
    },
    {
      question:
        "Welche entscheidenden Schritte müssen ergriffen werden, damit wir in der Schweiz eine zuverlässige und nachhaltige Stromversorgung für die Zukunft sicherstellen können?",
      response: "Die JUSO Schweiz fordert, dass der Verbrauch von fossilen Energieträgern reduziert und der Einsatz von erneuerbaren Energien gefördert wird, um eine sichere und nachhaltige Stromversorgung in der Schweiz zu gewährleisten.",
      source: "",
    },
    {
      question: "Braucht die Schweiz Atomkraftwerke?",
      response:
        "Die JUSO setzt auf Speicherlösungen und erneuerbare Energien und stellt sich gegen den Ausbau von Atomkraftwerken.",
      source: "",
    },
    {
      question:
        "Wie soll die Produktion der Atomkraftwerke kompensiert werden?",
      response: "Als Kompensation für die Produktion von Atomkraftwerken schlägt die JUSO die verstärkte Förderung erneuerbarer Energien vor.",
      source: "",
    },
    {
      question:
        "Wie trägt Ihre Partei dazu bei, den Fortschritt in der Entwicklung neuer Energiespeichertechnologien und effizienterer, nachhaltiger Produktionsmethoden zu fördern?",
      response: "Die JUSO fordert Investitionen in Forschung und Innovation, um das Wissen aus den technischen Hochschulen in die Praxis umzusetzen und somit langfristig zu einer effizienten Lösung für die Stromversorgungssicherheit beizutrage",
      source: "",
    },
  ],
};

const JUSO = () => {
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
            partyName={questionPage.partyName}
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


export default JUSO;

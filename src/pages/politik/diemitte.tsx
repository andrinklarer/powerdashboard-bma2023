import Navbar from "~/components/Navbar";
import Link from "next/link";
import PoliticsQA from "~/components/PoliticsQA";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const questionPage = {
  partyName: "Die Mitte",
  partyURL: "https://die-mitte.ch",
  partyImage: "/politik/diemitte-logo.svg",
  source: "https://bs.die-mitte.ch/themen/parteiprogramm/",
  content: [
    {
      question:
        "Wie bewertet die Mitte die aktuelle Stromversorgungssituation in der Schweiz in Bezug auf Nachhaltigkeit, Sicherheit und erneuerbare Energien?",
      response:
        "Die Mitte ist überzeugt, dass der Entscheid zur Energiestrategie 2050 richtig war. Die aktuelle Lage im Bereich der Stromversorgung ist jedoch angespannt, weil das Parlament es unterlassen hat, direkt im Anschluss sehr aktiv in nachhaltige Energien zu investieren. Hier haben wir nun einen massiven Aufholbedarf.",
      source: "https://www.svp.ch/wp-content/uploads/230726_Parteiprogramm.pdf",
    },
    {
      question: "Wie stufen Sie die aktuelle Stromversorgungslage ein?",
      /* erweitere text hier */
      response: '"Angespannt"',
      source: "https://www.svp.ch/wp-content/uploads/230726_Parteiprogramm.pdf",
    },
    {
      question:
        "Welche entscheidenden Schritte müssen ergriffen werden, damit wir in der Schweiz eine zuverlässige und nachhaltige Stromversorgung für die Zukunft sicherstellen können?",
      response: '"Es gilt auf verschiedensten Ebenen zu arbeiten:"',
      responseList: [
        "Energieproduktion: Ausbau erneuerbarer Energien",
        "Energiespeicherung: Investitionen in neue Technologien",
        "Energieeffizienz: Gebäudesanierungen, Optimierung von Prozessenergie etc.",
        "Stromabkommen mit der EU",
      ],
      source: "https://www.svp.ch/wp-content/uploads/230726_Parteiprogramm.pdf",
    },
    {
      question: "Braucht die Schweiz Atomkraftwerke?",
      /* erweitere text hier */
      response: '"Ja, nur die bestehenden"',
      source: "https://www.svp.ch/wp-content/uploads/230726_Parteiprogramm.pdf",
    },
  ],
};

const DieMitte = () => {
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

export default DieMitte;

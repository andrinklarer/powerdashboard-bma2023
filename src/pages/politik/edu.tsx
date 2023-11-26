import Navbar from "~/components/Navbar";
import Link from "next/link";
import PoliticsQA from "~/components/PoliticsQA";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const questionPage = {
  partyName: "EDU",
  partyURL: "https://www.edu-schweiz.ch",
  partyImage: "/politik/edu-logo.webp",
  source: "https://www.edu-schweiz.ch/positionen/",
  content: [
    {
      question:
        "Wie bewertet Ihre Partei die aktuelle Stromversorgungssituation in der Schweiz in Bezug auf Nachhaltigkeit, Sicherheit und erneuerbare Energien?",
      /* erweitere text hier */
      response:
        '"Die Versorgungssicherheit, insbesondere bei der Elektrizität, hat Priorität. [...] Um ein Gleichgewicht aus Versorgungssicherheit, Wirtschaftlichkeit und Nachhaltigkeit im Energiesektor aufrecht zu erhalten, unterstützen wir ein breit diversifiziertes Portfolio ohne Verbote."',
      source: "",
    },
    {
      question: "Wie stufen Sie die aktuelle Stromversorgungslage ein?",
      /* erweitere text hier */
      response:
        'Die EDU stuft die aktuelle Stromversorgungslage in der Schweiz als besorgniserregend ein, da die Versorgungssicherheit als "grösstes Risiko mit dem größten Schadenspotenzial für die Schweiz" angesehen wird.',
      source: "",
    },
    {
      question:
        "Welche entscheidenden Schritte müssen ergriffen werden, damit wir in der Schweiz eine zuverlässige und nachhaltige Stromversorgung für die Zukunft sicherstellen können?",
      /* erweitere text hier */
      response:
        "Die Elektrizitätsversorgung gehört aus Sicht der EDU [...] zum Bereich des Service public und muss in der öffentlichen Hand bleiben. [...] Die EDU unterstützt eine Optimierung der Nutzung der Wasserkraft für die Produktion von elektrischer Energie in der Schweiz.",
      source: "",
    },
    {
      question: "Braucht die Schweiz Atomkraftwerke?",
      /* erweitere text hier */
      response:
        "Ja, es soll in weitere investiert werden. Wollen wir unseren Wohlstand, der massgeblich auf der Verfügbarkeit von (günstiger) Energie und Strom beruht, nicht aufs Spiel setzen, kann auf die Nutzung von Kernenergie zumindest mittelfristig nicht verzichtet werden.",
      source: "",
    },
    {
      question: "Welche Vorteile sehen Sie in Atomkraft?",
      /* erweitere text hier */
      response: `"Neue Kernreaktor-Generationen verfügen bezüglich Sicherheit, Entsorgung oder Recycling von radioaktiven Abfällen und Verfügbarkeit von Brennstoffen über entscheidende Verbesserungen."`,
      source: "",
    },
    {
      question:
        "Was braucht es um die Bevölkerung von Atomkraft zu überzeugen?",
      /* erweitere text hier */
      response:
        "Information über technologische Fortschritte und Sicherheitsmaßnahmen die in der Kernenergie wichtig sind",
      source: "",
    },
    {
      question:
        "Wie soll die Produktion der Atomkraftwerke kompensiert werden?",
      /* erweitere text hier */
      response: `"Die EDU befürwortet die Aufhebung des Kernenergieverbots, Verzicht auf den Kosten verursachenden aber unnötigen \"Gegenverkehr\" im Stromnetz mit kostspieliger \"Smart-grid-Steuerung\" gemäss Energiestrategie 2050."`,
      source: "",
    },
    {
      question:
        "Wie trägt Ihre Partei dazu bei, den Fortschritt in der Entwicklung neuer Energiespeichertechnologien und effizienterer, nachhaltiger Produktionsmethoden zu fördern?",
      /* erweitere text hier */
      response: `"Die EDU befürwortet die Förderung von dezentralen Blockheizkraftwerken für die Energieversorgung im Winter. [...] eine Beteiligung der Schweiz an internationalen Kontrollen und Sanierungen von Kern-Brennstoff-Aufbereitungs- und Produktionsanlagen im Interesse von Sicherheit und Umwelt."`,
      source: "",
    },
  ],
};

const Edu = () => {
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

export default Edu;

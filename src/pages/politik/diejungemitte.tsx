import Navbar from "~/components/Navbar";
import Link from "next/link";
import PoliticsQA from "~/components/PoliticsQA";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const questionPage = {
  partyName: "Die Junge Mitte",
  partyURL: "https://diejungemitte.ch",
  partyImage: "/politik/diejungemitte-logo.webp",
  source: "https://diejungemitte.ch/unsere-politik",
  content: [
    {
      question:
        "Wie bewertet Ihre Partei die aktuelle Stromversorgungssituation in der Schweiz in Bezug auf Nachhaltigkeit, Sicherheit und erneuerbare Energien?",
      response:
        "Die Partei bewertet die Situation als eine, die dringend den Ausbau erneuerbarer Energien erfordert, um das Ziel der Netto-Null-Emissionen zu erreichen, und betont die Wichtigkeit der Wasserkraft als Rückgrat der Versorgungssicherheit.",
      source: "",
    },
    {
      question: "Wie stufen Sie die aktuelle Stromversorgungslage ein?",
      response:
        "Die Junge Mitte betonen die Notwendigkeit eines Ausbaus der erneuerbaren Energien und einer stärkeren Nutzung der vorhandenen ",
      source: "",
    },
    {
      question:
        "Welche entscheidenden Schritte müssen ergriffen werden, damit wir in der Schweiz eine zuverlässige und nachhaltige Stromversorgung für die Zukunft sicherstellen können?",
      response:
        "Die entscheidenden Schritte beinhalten den Ausbau erneuerbarer Energien, die Förderung der Photovoltaik und Windenergie, die Prüfung des Geothermiepotenzials und den Abschluss eines Stromabkommens mit der EU.",
      source: "",
    },
    {
      question: "Braucht die Schweiz Atomkraftwerke?",
      response:
        "Nein, die Partei unterstützt die Energiestrategie 2050, die den Bau neuer Kernkraftwerke verbietet.",
      source: "",
    },
    {
      question:
        "Was braucht es um die Bevölkerung von Atomkraft zu überzeugen?",
      response:
        "Die Partei äußert Bedenken hinsichtlich der Sicherheit und Wirtschaftlichkeit neuer Kernkraftwerke sowie der ungelösten Entsorgungs- und Sicherheitsfragen.",
      source: "",
    },
    {
      question:
        "Wie soll die Produktion der Atomkraftwerke kompensiert werden?",
      response:
        "Durch den verstärkten Einsatz und Ausbau erneuerbarer Energien wie Wasserkraft, Sonnen- und Windenergie.",
      source: "",
    },
    {
      question:
        "Wie trägt Ihre Partei dazu bei, den Fortschritt in der Entwicklung neuer Energiespeichertechnologien und effizienterer, nachhaltiger Produktionsmethoden zu fördern?",
      response:
        'Die Partei fordert die Förderung von Forschung und Nutzung von "grünem" Wasserstoff und synthetischen Treibstoffen sowie die Erschließung zusätzlicher Speicherkapazitäten.',
      source: "",
    },
  ],
};

const diejungemitte = () => {
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

export default diejungemitte;

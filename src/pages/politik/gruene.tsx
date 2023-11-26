import Navbar from "~/components/Navbar";
import Link from "next/link";
import PoliticsQA from "~/components/PoliticsQA";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const questionPage = {
  partyName: "Grüne",
  partyURL: "https://gruene.ch",
  partyImage: "/politik/gruene-logo.svg",
  source:
    "https://verts.ch/wp-content/uploads/2023/05/Agenda-2023_Version_4.1_d.pdf",
  content: [
    {
      question:
        "Wie bewertet Ihre Partei die aktuelle Stromversorgungssituation in der Schweiz in Bezug auf Nachhaltigkeit, Sicherheit und erneuerbare Energien?",
      response:
        "Die Stromversorgungssicherheit ist durch die unsichere Ausgangslage nach dem Entscheid für einen KKW-Ausstieg und dem zu langsamen Ausbau der erneuerbaren Energien gefährdet. Der Stromverbrauch wird bis 2050 deutlich steigen, und der zusätzliche Strom muss möglichst CO2-neutral produziert werden, um die Klimaziele nicht zu gefährden.",
      source: "",
    },
    {
      question: "Wie stufen Sie die aktuelle Stromversorgungslage ein?",
      response:
        "Die Lage wird als kritisch bewertet, da bereits ab 2025 ein Risiko für anhaltende Stromlücken besteht, vor allem durch die fehlende Integration der Schweiz im europäischen Strommarkt.",
      source: "",
    },
    {
      question:
        "Welche entscheidenden Schritte müssen ergriffen werden, damit wir in der Schweiz eine zuverlässige und nachhaltige Stromversorgung für die Zukunft sicherstellen können?",
      response:
        "Es müssen rasch Lösungen für den grenzüberschreitenden Austausch von Energie gefunden werden, Kraftwerkskapazitäten im Inland aufgebaut, der Ausbau der erneuerbaren Energien beschleunigt, die Energieeffizienz erhöht und die Strommarktöffnung vollständig umgesetzt werden.",
      source: "",
    },
    {
      question: "Braucht die Schweiz Atomkraftwerke?",
      response:
        '"Die bestehenden Kernkraftwerke (KKW) müssen so lange betrieben werden können, wie sie sicher sind, und es gilt das Potenzial der bestehenden KKW besser zu nutzen."',
      source: "",
    },
    {
      question: "Welche Vorteile sehen Sie in Atomkraft?",
      response:
        "Die Atomkraft bietet eine zuverlässige Grundlast an Energie und unterstützt die CO2-neutrale Stromproduktion, welche für die Erreichung der Klimaziele essentiell ist.",
      source: "",
    },
    {
      question:
        "Was braucht es um die Bevölkerung von Atomkraft zu überzeugen?",
      response:
        "Es braucht eine klare Kommunikation über die Sicherheit der Technologie und deren Rolle in der Energiestrategie, sowie Transparenz über die Entsorgung und langfristige Sicherheitskonzepte.",
      source: "",
    },
    {
      question: "Welche Bedenken haben Sie in Bezug auf Atomkraft?",
      response:
        "Die Bedenken beziehen sich auf Sicherheitsrisiken, die Entsorgung von radioaktivem Abfall und die hohen Kosten, die mit dem Bau und der Wartung von Kernkraftwerken verbunden sind.",
      source: "",
    },
    {
      question:
        "Wie trägt Ihre Partei dazu bei, den Fortschritt in der Entwicklung neuer Energiespeichertechnologien und effizienterer, nachhaltiger Produktionsmethoden zu fördern?",
      response:
        "Die Partei setzt sich für Investitionen in Forschung und Entwicklung ein, fördert die Forschung im Bereich der «Power-to-X»-Technologie und unterstützt neue Technologien für die Speicherung von Energie.",
      source: "",
    },
  ],
};

const Gruene = () => {
  const { resolvedTheme } = useTheme();
  const [iconPath, setIconPath] = useState("dark");

  useEffect(() => {
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

export default Gruene;

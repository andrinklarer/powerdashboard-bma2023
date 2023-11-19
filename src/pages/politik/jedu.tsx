import Navbar from "~/components/Navbar";
import Link from "next/link";
import PoliticsQA from "~/components/PoliticsQA";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const questionPage = {
  partyName: "Junge EDU",
  partyURL: "https://jedu.ch",
  partyImage: "/politik/jedu-logo.webp",
  source: "https://jedu.ch/partei/",
  content: [
    {
      /* erweitere antwort hier */
      question: "Wie bewertet Ihre Partei die aktuelle Stromversorgungssituation in der Schweiz in Bezug auf Nachhaltigkeit, Sicherheit und erneuerbare Energien?",
      response:
        "Die Stromversorgungssicherheit der Schweiz hängt sowohl von der eigenen Produktion als auch der umliegenden Länder - insb. in Kontinentaleuropa - zur permanenten Stabilisierung unseres Stromnetztes ab. Analoges gilt für die Gasversorgung, die indirekt in die Stromversorgung einfliesst. Die Schweiz hat eine intrinsische Motivation sowohl einen hohen Eigenversorgungsgrad, ein breit diversifiziertes Produktionsportfolio sowie durch die Flexibilität aus dem Zentrum Europas zur Stabilisierung des Stromnetzes beizutragen.",
      responseList: [
        "Entsprechend bewertet die Junge EDU Schweiz die aktuelle Lage als sehr volatil ein, was für die Stromversorgungssituation der Schweiz nachteilig ist.",
        "Nachhaltigkeit: Deutschland stellt drei Kernkraftwerke ab und erhöht die Stromproduktion aus Kohle - unsinnig!",
        "Sicherheit: Die Versorgungssicherheit ist durch die Abhängigkeit von Primärrohstoffen, Kraftwerksverfügbarkeiten sowie der globalen Lieferkette derzeit auf dem Prüfstand!",
        "Erneuerbare Energien: Viele Grossprojekte sowie der für die weitere Einbindung der erneuerbaren ins Stromnetz nötige Ausbau der Netze wird durch Einsprachen blockiert.",
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
      response: "",
      responseList: [
        "Genehmigungsverfahren kontrolliert vereinfachen",
        "Strategischer Netzausbau",
        "Technologieneutralität im Kraftwerksbau",
        "Ausbau der flexiblen Assets (bspw. Pumpspeicher, Batterien, ...)",
      ],
      source: "",
    },
    {
      /* erweitere antwort hier */
      question: "Wie stufen Sie die aktuelle Stromversorgungslage ein?",
      response: "Ja, es soll in weitere investiert werden",
      source: "",
    },
    {
      /* erweitere antwort hier */
      question: "Welche Vorteile sehen Sie in Atomkraft?",
      response: "Winterstromproduktion und Einbindbarkeit ins Stromnetz",
      source: "",
    },
    {
      /* erweitere antwort hier */
      question:
        "Was braucht es um die Bevölkerung von Atomkraft zu überzeugen?",
      response:
        "Aufzeigen der Auswirkungen auf die Wirtschaftlichkeit, Versorgungssicherheit durch Schweizer Stromproduktion im Winter, Rohstoffkreislauf, Einbindbarkeit ins bestehende Netz, Forschung & Entwicklung neuer Technologien",
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

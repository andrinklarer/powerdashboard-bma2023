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
        "Die zentrale Rolle der erneuerbaren Energien und der Nachhaltigkeit wird von den Grünen hervorgehoben, weshalb sie der Ansicht sind, dass die aktuelle Situation der Stromversorgung in der Schweiz in diesen Bereichen optimiert werden muss.",
      source: "",
    },
    {
      question: "Wie stufen Sie die aktuelle Stromversorgungslage ein?",
      response:
        "Die aktuelle Stromsituation wird von den Grünen als angespannt bzw. kritisch eingeschätzt. Dies gilt insbesondere im Hinblick auf die langfristige Sicherung einer umweltverträglichen und sicheren Energieversorgung.",
      source: "",
    },
    {
      question:
        "Welche entscheidenden Schritte müssen ergriffen werden, damit wir in der Schweiz eine zuverlässige und nachhaltige Stromversorgung für die Zukunft sicherstellen können?",
      response:
        "Der Ausbau der erneuerbaren Energien und der Förderung der Energieeffizienz für eine nachhaltige und zuverlässige Stromversorgung stehen im Vordergrund.",
      source: "",
    },
    {
      question: "Braucht die Schweiz Atomkraftwerke?",
      response:
        'Die Grünen sind traditionell gegen die Kernenergie und setzen sich daher für die schrittweise Stilllegung der bestehenden Kernkraftwerke und für Neuinvestitionen in andere Energieformen ein.',
      source: "",
    },
    {
      question: "Welche Bedenken haben Sie in Bezug auf Atomkraft?",
      response:
        "Die Grünen haben Bedenken zu sämtlichen Aspekten, insbesondere zu den Umweltrisiken, den langfristigen Kosten und der Problematik der Endlagerung radioaktiver Abfälle.",
      source: "",
    },
    {
      question: "Wie soll die Produktion der Atomkraftwerke kompensiert werden?",
      response:
        "An die Stelle der Atomkraft sollen erneuerbare Energien wie Wind-, Sonnen- und Wasserkraft treten",
      source: "",
    },
    {
      question:
        "Wie trägt Ihre Partei dazu bei, den Fortschritt in der Entwicklung neuer Energiespeichertechnologien und effizienterer, nachhaltiger Produktionsmethoden zu fördern?",
      response:
        "Investitionen in Forschung und Entwicklung erneuerbarer Energien und effizienterer, nachhaltiger Technologien werden von den Grünen befürwortet.",
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

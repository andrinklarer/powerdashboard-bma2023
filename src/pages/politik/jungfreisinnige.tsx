import Navbar from "~/components/Navbar";
import Link from "next/link";
import PoliticsQA from "~/components/PoliticsQA";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const questionPage = {
  partyName: "Jungfreisinnige",
  partyURL: "https://jungfreisinnige.ch/",
  partyImage: "/politik/jungfreisinnige-logo.svg",
  source: "https://jungfreisinnige.ch/politik/",
  content: [
    {
      /* erweitere antwort hier */
      question:
        "Wie bewertet Ihre Partei die aktuelle Stromversorgungssituation in der Schweiz in Bezug auf Nachhaltigkeit, Sicherheit und erneuerbare Energien?",
      response:
        "Unsere aktuelle Stromversorgung ist wenig nachhaltig, da wir aufgrund der gescheiterten Energiestrategie 2050 auf u.a. Kohlenstrom aus Deutschland und Polen angewiesen sind, was weder ökonomisch, noch ökologisch nachhaltig ist. Gewährleistet ist die Stromversorgung aufgrund dieser Abhängigkeiten ebenfalls nicht. Bei den erneuerbaren Energien kann die Schweiz noch mehr machen - das Problem liegt hierbei indes primär bei Umweltverbänden und Ortsbildschützern, welche entsprechende Projekt massgeblich verhindern.",
      source: "",
    },
    {
      question: "Wie stufen Sie die aktuelle Stromversorgungslage ein?",
      response: "Kritisch",
      source: "",
    },
    {
      question:
        "Welche entscheidenden Schritte müssen ergriffen werden, damit wir in der Schweiz eine zuverlässige und nachhaltige Stromversorgung für die Zukunft sicherstellen können?",
      response:
        "Technologieneutralität. Unsere Gesetze müssen offen sein für sämtliche Technologien, dazu gehört auch die Kernenergie. Aufgrund des hohen Wirkungsgrades ist es zentral, dass auch AKWs betrieben werden dürfen, solange sie sicher sind. Ansonsten bleiben wir abhängig vom Ausland.",
      source: "",
    },
    {
      question: "Braucht die Schweiz Atomkraftwerke?",
      response: "Ja, es soll in weitere investiert werden",
      source: "",
    },
    {
      question: "Welche Vorteile sehen Sie in Atomkraft?",
      response: "ökologisch, grosse Wirkung, weniger Abhängigkeit vom Ausland",
      source: "",
    },
    {
      question:
        "Was braucht es um die Bevölkerung von Atomkraft zu  überzeugen?",
      response:
        "Abbau ideologischer Scheuklappen. Wir müssen endlich wieder sachlich und vernünftig über dieses Thema diskutieren. Wie in allen anderen Dossiers. Dann wird jeder einsehen, dass wir zur Zeit nicht um Kernkraft rum kommen. Mit an die Strasse kleben, hat noch niemand sein Iphone geladen.",
      source: "",
    },
  ],
};

const Jungfreisinnige = () => {
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

export default Jungfreisinnige;

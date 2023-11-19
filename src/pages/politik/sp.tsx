import Navbar from "~/components/Navbar";
import Link from "next/link";
import PoliticsQA from "~/components/PoliticsQA";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const questionPage = {
  partyName: "SP",
  partyURL: "https://www.sp-ps.ch",
  partyImage: "/politik/sp-logo.svg",
  source: "https://www.sp-ps.ch/wofuer-wir-stehen/parteiprogramm/",
  content: [
    {
      question:
        "Wie bewertet die SP die aktuelle Stromversorgungssituation in der Schweiz in Bezug auf Nachhaltigkeit, Sicherheit und erneuerbare Energien?",
      response:
        '"Die SP Schweiz sieht die aktuelle Stromversorgungssicherheit als eher ungenügend, weil man, erstens, noch zu abhängig von fossilen Energie-Importen abhängig ist; zweitens, weil unsere AKWs immer älter werden und Ausfälle immer wahrscheinlicher werden; und drittens, weil erneuerbare Energien nicht genügend ausgebaut sind."',
      source: "https://www.svp.ch/wp-content/uploads/230726_Parteiprogramm.pdf",
    },
    {
      question: "Wie stufen Sie die aktuelle Stromversorgungslage ein?",
      /* erweitere text hier */
      response:
        '"Angespannt"',
      source: "https://www.svp.ch/wp-content/uploads/230726_Parteiprogramm.pdf",
    },
    {
      question:
        "Welche entscheidenden Schritte müssen ergriffen werden, damit wir in der Schweiz eine zuverlässige und nachhaltige Stromversorgung für die Zukunft sicherstellen können?",
      response:
        '"Der Ausbau erneuerbarer Energien ist die fundamentale Voraussetzung für eine zuverlässige und nachhaltige Stromversorgung. Vor allem muss die Wind- und Solarenergie massiv ausgebaut werden."',
      source: "https://www.svp.ch/wp-content/uploads/230726_Parteiprogramm.pdf",
    },
    {
      question: "Braucht die Schweiz Atomkraftwerke?",
      /* erweitere text hier */
      response:
        '"Nein"',
      source: "https://www.svp.ch/wp-content/uploads/230726_Parteiprogramm.pdf",
    },
    {
      question: "Welche Bedenken haben Sie in Bezug auf Atomkraft?",
      /* erweitere text hier */
      response:
        '"Nukleare Katastrophen, Radioaktiver Abfall, Gesundheitsrisiken, Kosten, Die Lieferkette von Uranium ist höchst problematisch."',
      source: "https://www.svp.ch/wp-content/uploads/230726_Parteiprogramm.pdf",
    },
    {
      question:
        "Wie soll die Produktion der Atomkraftwerke kompensiert werden?",
      /* erweitere text hier */
      response:
        '"Wind- und Solarenergie, Biomasse sowie die Entwicklung von Energiespeichermöglichkeiten."',
      source: "https://www.svp.ch/wp-content/uploads/230726_Parteiprogramm.pdf",
    },
    {
      question:
        "Wie trägt Ihre Partei dazu bei, den Fortschritt in der Entwicklung neuer Energiespeichertechnologien und effizienterer, nachhaltiger Produktionsmethoden zu fördern?",
      /* erweitere text hier */
      response:
        '"Wir forschen nicht nur zu diesem Thema (siehe, zum Beispiel, die Bücher von Roger Nordmann), aber gestalten auch die Gesetzgebung im Parlament aktiv mit. Die SP war zentral in der Erarbeitung des Mantelerlasses, Solar- und Windexpresses. Ihren Einsatz geht in der UREK weiter."',
      source: "https://www.svp.ch/wp-content/uploads/230726_Parteiprogramm.pdf",
    },
  ],
};

const sp = () => {
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

export default sp;

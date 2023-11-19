import Navbar from "~/components/Navbar";
import Link from "next/link";
import PoliticsQA from "~/components/PoliticsQA";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const questionPage = {
  partyName: "Grünliberale",
  partyURL: "https://grunliberale.ch",
  partyImage: "/politik/gruenliberale-logo.svg",
  source: "https://grunliberale.ch/themen.html",
  content: [
    {
      question:
        "Wie bewertet die Grünliberale die aktuelle Stromversorgungssituation in der Schweiz in Bezug auf Nachhaltigkeit, Sicherheit und erneuerbare Energien?",
      response:
        'Die Schweiz muss nicht zwischen einer sicheren oder einer sauberen Energieversorgung entscheiden. Für eine resiliente Energieversorgung wollen wir in den richtigen, nachhaltigen Energiemix investieren und uns gleichzeitig mit unseren Nachbarländern weiter vernetzen.',
      source: "",
    },
    {
      question: "Wie stufen Sie die aktuelle Stromversorgungslage ein?",
      response:
        'Angespannt/Besorgniserregend: Die Schweiz verbraucht im Winter mehr Strom, als sie produziert. Die sogenannte Winterstrom-Lücke ist dieses Jahr besonders akut, da Lieferengpässe aus unseren Nachbarländern drohen.',
      source: "",
    },
    {
      question:
        "Welche entscheidenden Schritte müssen ergriffen werden, damit wir in der Schweiz eine zuverlässige und nachhaltige Stromversorgung für die Zukunft sicherstellen können?",
      response:
        'Es ist höchste Zeit für eine grosse Effizienz-, Ausbau und Speicheroffensive. Damit werden nicht alle Versäumnisse der letzten Jahre bis im kommenden Winter aufgeholt. Aber die kurz- und langfristigen Ziele bedingen dieselben Massnahmen.',
      source: "",
    },
    {
      question: "Braucht die Schweiz Atomkraftwerke?",
      /* erweitere text hier */
      response:
        'Dank Power-to-X kann die Schweiz die Versorgungssicherheit ohne den Neubau fossiler oder atomarer Grosskraftwerke sicherstellen.',
      source: "",
    },
    {
      question: "Welche Bedenken haben Sie in Bezug auf Atomkraft?",
      /* erweitere text hier */
      response:
        'Die Kernenergie ist keine Alternative, der Atomausstieg nicht verhandelbar. Die Entsorgungs- und Sicherheitsfragen bleiben ungelöst. Auch wirtschaftlich sind neue Kernkraftwerke nicht rentabel.',
      source: "",
    },
    {
      question: "Wie soll die Produktion der Atomkraftwerke kompensiert werden?",
      /* erweitere text hier */
      response:
        'Für den kompletten Umbau des Schweizer Stromsystems auf 100% erneuerbare Energie haben wir nur noch rund 20 Jahre Zeit. Das grösste Ausbaupotential hat die Photovoltaik.',
      source: "",
    },
    {
      question: "Wie trägt Ihre Partei dazu bei, den Fortschritt in der Entwicklung neuer Energiespeichertechnologien und effizienterer, nachhaltiger Produktionsmethoden zu fördern?",
      /* erweitere text hier */
      response:
        'Die Schweiz und Europa brauchen eine Innovationsoffensive für Speichertechnologien. Forschungsprojekte für die Umwandlung von Strom oder Sonne direkt in eine andere Energieform, z.B. synthetische Flüssigtreibstoffe (Power-to-X), und zur Umwandlung von Wärme in eine andere Energieform, z.B. Strom (Heat-to-X) und die Sektorenkopplung, müssen gefördert werden und rasch auf den Markt kommen.',
      source: "",
    },
  ],
};


// {
//   question: "",
//   /* erweitere text hier */
//   response:
//     '',
//   source: "",
// },

const Gruenliberale = () => {
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

export default Gruenliberale;

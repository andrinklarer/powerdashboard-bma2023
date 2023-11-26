import Navbar from "~/components/Navbar";
import Link from "next/link";
import PoliticsQA from "~/components/PoliticsQA";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const questionPage = {
  partyName: "SVP",
  partyURL: "https://www.svp.ch",
  partyImage: "/politik/svp-logo.webp",
  source: "https://www.svp.ch/wp-content/uploads/230726_Parteiprogramm.pdf",
  content: [
    {
      question:
        "Wie bewertet Ihre Partei die aktuelle Stromversorgungssituation in der Schweiz in Bezug auf Nachhaltigkeit, Sicherheit und erneuerbare Energien?",
      response:
        '"Eine Strom-Mangellage ist die grösste Bedrohung für unser Land und wird gemäss Bund bereits in naher Zukunft Realität – mit katastrophalen Folgen für die Menschen in der Schweiz."',
      source: "https://www.svp.ch/wp-content/uploads/230726_Parteiprogramm.pdf",
    },
    {
      question: "Wie stufen Sie die aktuelle Stromversorgungslage ein?",
      /* erweitere text hier */
      response:
        '"Denn der Schweiz mangelt es bereits heute, vor allem im Winterhalbjahr, an genügend Strom."',
      source: "https://www.svp.ch/wp-content/uploads/230726_Parteiprogramm.pdf",
    },
    {
      question:
        "Welche entscheidenden Schritte müssen ergriffen werden, damit wir in der Schweiz eine zuverlässige und nachhaltige Stromversorgung für die Zukunft sicherstellen können?",
      response:
        '"Die SVP fordert seit langem, unverzüglich einen Strom-General einzusetzen mit dem Auftrag, für eine sichere, unabhängige und kostengünstige Stromversorgung zu sorgen."',
      source: "https://www.svp.ch/wp-content/uploads/230726_Parteiprogramm.pdf",
    },
    {
      question: "Braucht die Schweiz Atomkraftwerke?",
      response:
        '"Bestehende Kernkraftwerke ersetzen... Oberste Priorität ist: Die bestehenden Kernkraftwerke müssen so lange am Netz bleiben, wie sie sicher und wirtschaftlich sind. Darüber hinaus braucht es den Bau neuer Kernkraftwerke neuster Generationen."',
      source: "https://www.svp.ch/wp-content/uploads/230726_Parteiprogramm.pdf",
    },
    {
      question: "Welche Vorteile sehen Sie in Atomkraft?",
      /* erweitere text hier */
      response:
        '"Es wäre unsinnig, auf diese bewährte Säule der Schweizer Energieversorgung zu verzichten, nachdem wir seit über fünfzig Jahren klaglos mit sicheren Kernkraftwerken leben."',
      source: "https://www.svp.ch/wp-content/uploads/230726_Parteiprogramm.pdf",
    },
    {
      question:
        "Was braucht es um die Bevölkerung von Atomkraft zu überzeugen?",
      /* erweitere text hier */
      response:
        '"Technisch ist die sichere Entsorgung radioaktiver Abfälle längst gelöst. Die links-grüne Verhinderungstaktik ist kontraproduktiv."',
      source: "https://www.svp.ch/wp-content/uploads/230726_Parteiprogramm.pdf",
    },
    {
      question:
        "Wie trägt die SVP dazu bei, den Fortschritt in der Entwicklung neuer Energiespeichertechnologien und effizienterer, nachhaltiger Produktionsmethoden zu fördern?",
      /* erweitere text hier */
      response:
        '"Die SVP ist für Technologieoffenheit und unterstützt neue Technologien wie synthetische Treibstoffe und neue Speichertechnologien. Die SVP spricht sich gegen Technologieverbote wie beispielsweise ein Ölheizungsverbot oder ein Fahrverbot für Benzin- oder Dieselautos aus."',
      source: "https://www.svp.ch/wp-content/uploads/230726_Parteiprogramm.pdf",
    },
  ],
};

const Svp = () => {
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

export default Svp;

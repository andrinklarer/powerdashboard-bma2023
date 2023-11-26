import Navbar from "~/components/Navbar";
import Link from "next/link";
import PoliticsQA from "~/components/PoliticsQA";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const questionPage = {
  partyName: "Junge SVP",
  partyURL: "https://www.jsvp.ch/",
  partyImage: "/politik/jsvp-logo.webp",
  source:
    "https://www.jsvp.ch/wp-content/uploads/2022/10/JSVP-Parteiprogramm_2019-2023.pdf",
  content: [
    {
      question:
        "Wie bewertet Ihre Partei die aktuelle Stromversorgungssituation in der Schweiz in Bezug auf Nachhaltigkeit, Sicherheit und erneuerbare Energien?",
      response:
        "Die Junge SVP legt starken Nachdruck auf Eigenverantwortung und freie Marktwirtschaft, was darauf hindeuten könnte, dass sie die Stromversorgung unter diesen Gesichtspunkten bewerten würde, einschließlich einer möglichen Befürwortung der Nutzung von Kernkraft und anderen Energiequellen, die zur wirtschaftlichen Unabhängigkeit beitragen.",
      source: "",
    },
    {
      question: "Wie stufen Sie die aktuelle Stromversorgungslage ein?",
      response:
        "Die Junge SVP sieht die aktuelle Situation der Stromversorgung als angespannt oder kritisch an, mit besonderem Augenmerk auf die Gewährleistung der Versorgungssicherheit und Unabhängigkeit.",
      source: "",
    },
    {
      question:
        "Welche entscheidenden Schritte müssen ergriffen werden, damit wir in der Schweiz eine zuverlässige und nachhaltige Stromversorgung für die Zukunft sicherstellen können?",
      response:
        "Maßnahmen zur Stärkung der Energieunabhängigkeit werden unterstützt, u.a. durch den Ausbau der Kernenergie, die Förderung erneuerbarer Energien und die Reduzierung der Importabhängigkeit.",
      source: "",
    },
    {
      question: "Braucht die Schweiz Atomkraftwerke?",
      response:
        "Die Nutzung der Kernenergie wird von der Junge SVP befürwortet, insbesondere wenn sie zur Energieunabhängigkeit und zur wirtschaftlichen Stabilität beiträgt.",
      source: "",
    },
    {
      question: "Welche Vorteile sehen Sie in Atomkraft?",
      response:
        "Vorteile werden in der effizienten Energieerzeugung, der Verringerung der Abhängigkeit von fossilen Brennstoffen und der Unterstützung der Energieunabhängigkeit gesehen.",
      source: "",
    },
    {
      question:
        "Was braucht es, um die Bevölkerung von Atomkraft zu überzeugen?",
      response:
        "Aufklärung über die Sicherheit und Effizienz der Atomkraft sowie deren Rolle bei der Gewährleistung der Energieunabhängigkeit könnte ein Ansatz sein.",
      source: "",
    },
    {
      question:
        "Wie trägt Ihre Partei dazu bei, den Fortschritt in der Entwicklung neuer Energiespeichertechnologien und effizienterer, nachhaltiger Produktionsmethoden zu fördern?",
      response:
        "Die Förderung von Forschung und Entwicklung im Energiebereich wird unterstützt, vor allem wenn sie zu mehr Unabhängigkeit und Wirtschaftskraft beiträgt.",
      source: "",
    },
  ],
};

const JSVP = () => {
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

export default JSVP;

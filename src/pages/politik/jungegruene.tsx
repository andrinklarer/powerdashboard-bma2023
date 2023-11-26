import Navbar from "~/components/Navbar";
import Link from "next/link";
import PoliticsQA from "~/components/PoliticsQA";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const questionPage = {
  partyName: "Junge Grüne",
  partyURL: "https://www.jungegruene.ch",
  partyImage: "/politik/jungegruene-logo.svg",
  source: "https://www.jungegruene.ch/unsere-politik",
  content: [
    {
      question:
        "Wie bewertet Ihre Partei die aktuelle Stromversorgungssituation in der Schweiz in Bezug auf Nachhaltigkeit, Sicherheit und erneuerbare Energien?",
      response:
        "Als Junge Grüne sehen wir Handlungsbedarf bei der Stromversorgung in der Schweiz. Wir setzen uns für eine nachhaltigere Energiepolitik ein, die sich stärker auf erneuerbare Quellen wie Wind-, Solar- und Geothermie stützt und weg von fossilen und nuklearen Energieformen bewegt. Die Sicherheit der Energieversorgung sollte durch Diversifizierung und die Förderung lokaler, erneuerbarer Produktion sowie den Ausbau von Speicherlösungen und intelligenten Netzen verbessert werden. Unser Ziel ist eine zukunftsfähige, umweltfreundliche und zuverlässige Energieversorgung, die die Schweiz als Vorbild für eine erfolgreiche Energiewende positioniert.",
      source: "",
    },
    {
      question: "Wie stufen Sie die aktuelle Stromversorgungslage ein?",
      /* erweitere antwort hier */
      response: "Angespannt",
      source: "",
    },
    {
      question:
        "Welche entscheidenden Schritte müssen ergriffen werden, damit wir in der Schweiz eine zuverlässige und nachhaltige Stromversorgung für die Zukunft sicherstellen können?",
      response:
        "Um eine zuverlässige und nachhaltige Stromversorgung in der Schweiz zu gewährleisten, sind aus Sicht der Jungen Grünen folgende Schritte zentral:",
      responseList: [
        "Intensivierung des Ausbaus erneuerbarer Energien: Förderung von Solarenergie, Windkraft und anderen erneuerbaren Quellen.",
        "Steigerung der Energieeffizienz: Umsetzung von Massnahmen zur Energieeinsparung in allen Sektoren, insbesondere im Gebäudebereich.",
        "Investition in Netzinfrastruktur und Smart Grids: Anpassung der Stromnetze an die dezentrale Einspeisung erneuerbarer Energien und Verbesserung der Netzsteuerung.",
        "Entwicklung und Förderung von Speichertechnologien: Unterstützung von Batteriespeichern, Pumpspeicherkraftwerken und anderen Speichermöglichkeiten.",
        "Gesetzgeberische Anpassungen: Vereinfachung der gesetzlichen Rahmenbedingungen für den schnelleren Ausbau und Betrieb erneuerbarer Energieanlagen.",
      ],
      conclusion:
        "Durch die konsequente Umsetzung dieser Massnahmen kann die Schweiz ihre Stromversorgung auf eine nachhaltigere Basis stellen und die Energiezukunft sichern.",
      source: "",
    },
    {
      question: "Braucht die Schweiz Atomkraftwerke?",
      response: "Nein",
      source: "",
    },
    {
      question: "Welche Bedenken haben Sie in Bezug auf Atomkraft?",
      response:
        "Nukleare Katastrophen, Radioaktiver Abfall, Gesundheitsrisiken, Kosten",
      source: "",
    },
    {
      question:
        "Wie soll die Produktion der Atomkraftwerke kompensiert werden?",
      response:
        "Die Abschaltung der Atomkraftwerke in der Schweiz soll durch den Ausbau erneuerbarer Energien, insbesondere Wasserkraft, Sonnenenergie und Windkraft, sowie durch erhöhte Energieeffizienz und den Einsatz von Speichertechnologien kompensiert werden.",
      source: "",
    },
    {
      question:
        "Wie trägt Ihre Partei dazu bei, den Fortschritt in der Entwicklung neuer Energiespeichertechnologien und effizienterer, nachhaltiger Produktionsmethoden zu fördern?",
      response:
        "Die Jungen Grünen setzent sich für politische Rahmenbedingungen ein, die Forschung und Investitionen in neue Energiespeichertechnologien und effizientere, nachhaltige Produktionsmethoden fördern, und unterstützt Bildungsinitiativen und öffentliche Diskurse zu diesen Themen.",
      source: "",
    },
  ],
};

const JungeGruene = () => {
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

export default JungeGruene;

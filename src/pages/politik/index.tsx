import { Separator } from "@radix-ui/react-separator";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import Navbar from "~/components/Navbar";
import PoliticsCard from "~/components/PoliticsCard";

const politicsJson = [
  {
    partyComment:
      '"Eine Strom-Mangellage ist die grösste Bedrohung für unser Land und wird gemäss Bund bereits in naher Zukunft Realität – mit katastrophalen Folgen für die Menschen in der Schweiz."',
    partyImageSource:
      "https://www.svp.ch/wp-content/themes/svp2022/images/SVP_Logo_de.png",
    partyProgramLink: "https://www.svp.ch/positionen/parteiprogramme/",
    partyImage: "/politik/svp-logo.webp",
    partyName: "SVP",
    linkToParty: "https://www.svp.ch",
    readMoreLink: "politik/svp",
  },
  {
    partyComment:
      '"Die SP Schweiz sieht die aktuelle Stromversorgungssicherheit als ungenügend, erstens, abhängig von fossilen Energie-Importen; zweitens,unsere AKWs älter werden; drittens, erneuerbare Energien nicht genügend ausgebaut."',
    partyImageSource:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Logo_der_Sozialdemokratischen_Partei_der_Schweiz_2009%2C_single.svg/1950px-Logo_der_Sozialdemokratischen_Partei_der_Schweiz_2009%2C_single.svg.png",
    partyProgramLink: "https://www.sp-ps.ch/wofuer-wir-stehen/parteiprogramm/",
    partyImage: "/politik/sp-logo.svg",
    partyName: "SP",
    linkToParty: "https://www.sp-ps.ch",
    readMoreLink: "politik/sp",
  },
  {
    partyComment:
      '"Die Mitte ist überzeugt, dass der Entscheid zur Energiestrategie 2050 richtig war. [...] Hier haben wir nun einen massiven Aufholbedarf."',
    partyImageSource:
      "https://die-mitte.ampersand.company/wp-content/uploads/2021/04/11205711/die-mitte-logo.svg",
    partyProgramLink: "https://bs.die-mitte.ch/themen/parteiprogramm/",
    partyImage: "/politik/diemitte-logo.svg",
    partyName: "Die Mitte",
    linkToParty: "https://die-mitte.ch",
    readMoreLink: "politik/diemitte",
  },
  {
    partyComment:
      '"Die Schweiz muss nicht zwischen einer sicheren oder einer sauberen Energieversorgung entscheiden. Für eine resiliente Energieversorgung wollen wir in den richtigen, nachhaltigen Energiemix investieren und uns gleichzeitig mit unseren Nachbarländern weiter vernetzen."',
    partyImageSource:
      "https://grunliberale.ch/dam/jcr:06b7f00f-08c1-45b6-8d37-82ebecb1e193/Test%20Logo%202.png",
    partyProgramLink: "https://grunliberale.ch/themen.html",
    partyImage: "/politik/gruenliberale-logo.svg",
    partyName: "Grünliberale",
    linkToParty: "https://grunliberale.ch",
    readMoreLink: "politik/gruenliberale",
  },

  {
    partyComment:
      "Die EDU sieht die aktuelle Stromversorgungslage kritisch, insbesondere hinsichtlich der Versorgungssicherheit und der Abhängigkeit von fossilen Brennstoffen und Importen.",
    partyImageSource:
      "https://www.edu-sh.ch/app/download/8813876386/Logo_EDU-UDF_d_ES_gross.jpg?t=1502204674",
    partyProgramLink: "https://www.edu-schweiz.ch/positionen/",
    partyImage: "/politik/edu-logo.webp",
    partyName: "EDU",
    linkToParty: "https://www.edu-schweiz.ch",
    readMoreLink: "politik/edu",
  },
];
const youngPoliticsJson = [
  {
    partyComment:
      '"Unsere aktuelle Stromversorgung ist wenig nachhaltig, da wir aufgrund der gescheiterten Energiestrategie 2050 auf u.a. Kohlenstrom aus Deutschland und Polen angewiesen sind, was weder ökonomisch, noch ökologisch nachhaltig ist. [...]"',
    partyImageSource:
      "https://jungfreisinnige.ch/wp-content/uploads/2023/04/logo-blau.svg",
    partyProgramLink: "https://jungfreisinnige.ch/politik/",
    partyImage: "/politik/jungfreisinnige-logo.svg",
    partyName: "Jungfreisinnige",
    linkToParty: "https://jungfreisinnige.ch",
    readMoreLink: "politik/jungfreisinnige",
  },
  {
    partyComment:
      '"Wir setzen uns für eine nachhaltigere Energiepolitik ein, die sich stärker auf erneuerbare Quellen wie Wind-, Solar- und Geothermie stützt und weg von fossilen und nuklearen Energieformen bewegt."',
    partyImageSource: "https://www.jungegruene.ch/img/redesign2015/logo_de.svg",
    partyProgramLink: "https://www.jungegruene.ch/unsere-politik",
    partyImage: "/politik/jungegruene-logo.svg",
    partyName: "Junge Grüne",
    linkToParty: "https://www.jungegruene.ch",
    readMoreLink: "politik/jungegruene",
  },
  {
    partyComment:
      '"Durch die zunehmende Elektrifizierung aufgrund der Dekarbonisierung wird der Stromverbrauch derSchweiz bis 2050 ansteigen. Dies erfordert einen raschen Zubau an erneuerbaren Energien, um den zukünftigenzusätzlichen Bedarf decken zu können."',
    partyImageSource:
      "https://djm-bucket01.fra1.digitaloceanspaces.com/assets/diejungemitte.ch/logo-1.png",
    partyProgramLink: "https://diejungemitte.ch/unsere-politik",
    partyImage: "/politik/diejungemitte-logo.webp",
    partyName: "Die Junge Mitte",
    linkToParty: "https://diejungemitte.ch",
    readMoreLink: "politik/diejungemitte",
  },
  {
    partyComment:
      '"Unser aktuelles Stromversorgungssystem ist [...] im internationalen Vergleich in Bezug auf Nachhaltigkeit und Sicherheit eher gut situiert. Der zunehmende Importbedarf im Winter ist allerdings suboptimal."',
    partyImageSource:
      "https://apidata.ch.jglp.ch/uploads/medium_jglp_schweiz_logo_web_4bdb5de878.jpg",
    partyProgramLink: "https://jungegrunliberale.ch/unsere-politik#positionen",
    partyImage: "/politik/jungegrunliberale-logo.webp",
    partyName: "Junge Grünliberale",
    linkToParty: "https://jungegrunliberale.ch",
    readMoreLink: "politik/jungegrunliberale",
  },
  {
    partyComment:
      '"Entsprechend bewertet die Junge EDU Schweiz die aktuelle Lage als sehr volatil ein, was für die Stromversorgungssituation der Schweiz nachteilig ist."',
    partyImageSource:
      "https://jedu.ch/wp-content/uploads/sites/23/2022/07/Banner_JEDU-1-300x152.png",
    partyProgramLink: "https://jedu.ch/partei/",
    partyImage: "/politik/jedu-logo.webp",
    partyName: "Junge EDU",
    linkToParty: "https://jedu.ch",
    readMoreLink: "politik/jedu",
  },
];

const Politics = () => {
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
          <div className="my-16 text-center text-5xl font-bold">
            <h2>Partei&uuml;berblick</h2>
          </div>

          <div className="mx-2 flex justify-center">
            <div className="mb-16 grid grid-cols-1 justify-center gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3">
              {politicsJson.map((item) => (
                <PoliticsCard
                  partyProgramLink={item.partyProgramLink}
                  partyImageSource={item.partyImageSource}
                  partyComment={item.partyComment}
                  partyImage={"/" + iconPath + item.partyImage}
                  partyName={item.partyName}
                  linkToParty={item.linkToParty}
                  readMoreLink={item.readMoreLink}
                  key={item.partyName}
                />
              ))}
              <div className="col-span-1 mb-12 mt-24 md:col-span-2 2xl:col-span-3">
                <Separator className="h-[1px] w-full" />
                <h2 className="text-center text-5xl font-bold">Jungparteien</h2>
              </div>
              {youngPoliticsJson.map((item) => (
                <PoliticsCard
                  partyProgramLink={item.partyProgramLink}
                  partyImageSource={item.partyImageSource}
                  partyComment={item.partyComment}
                  partyImage={"/" + iconPath + item.partyImage}
                  partyName={item.partyName}
                  linkToParty={item.linkToParty}
                  readMoreLink={item.readMoreLink}
                  key={item.partyName}
                />
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Politics;

import React from "react";
import Navbar from "~/components/Navbar";
import PoliticsCard from "~/components/PoliticsCard";

const politicsJson = [
  {
    partyComment:
      '"Eine Strom-Mangellage ist die grösste Bedrohung für unser Land und wird gemäss Bund bereits in naher Zukunft Realität – mit katastrophalen Folgen für die Menschen in der Schweiz."',
    partyImageSource:
      "https://www.svp.ch/wp-content/themes/svp2022/images/SVP_Logo_de.png",
    partyProgramLink: "https://www.svp.ch/positionen/parteiprogramme/",
    partyImage: "/politik/svp-logo.png",
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
    partyImage: "/politik/sp-logo.png",
    partyName: "SP",
    linkToParty: "https://www.sp-ps.ch",
    readMoreLink: "politik/sp",
  },
  {
    partyComment:
      'Die EDU sieht die aktuelle Stromversorgungslage kritisch, insbesondere hinsichtlich der Versorgungssicherheit und der Abhängigkeit von fossilen Brennstoffen und Importen.',
    partyImageSource:
      "https://www.edu-sh.ch/app/download/8813876386/Logo_EDU-UDF_d_ES_gross.jpg?t=1502204674",
    partyProgramLink: "https://www.edu-schweiz.ch/positionen/",
    partyImage: "/politik/edu-logo.jpg",
    partyName: "EDU",
    linkToParty: "https://www.edu-schweiz.ch",
    readMoreLink: "politik/edu",
  },
];

const politics = () => {
  return (
    <>
      <div className="flex">
        <main className="relative flex-grow">
          <Navbar />
          <div className="mt-4"></div>
          <div className="col-span-12 mx-2 flex items-stretch justify-center space-x-8 sm:col-span-12 md:col-span-8 2xl:col-span-4">
            <div className="grid grid-cols-1 justify-center gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3">
              {politicsJson.map((item) => (
                <PoliticsCard
                  partyProgramLink={item.partyProgramLink}
                  partyImageSource={item.partyImageSource}
                  partyComment={item.partyComment}
                  partyImage={item.partyImage}
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

export default politics;

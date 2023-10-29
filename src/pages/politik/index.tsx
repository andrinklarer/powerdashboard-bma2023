import React from "react";
import Navbar from "~/components/Navbar";
import PoliticsCard from "~/components/PoliticsCard";

const politicsJson = [
  {
    partyComment: '"...."',
    partyImage: "night-mode.svg",
    partyName: "svp",
    linkToParty: "https://www.svp.ch",
    readMoreLink: "svp",
  },
];

const politics = () => {
  return (
    <>
      <div className="flex">
        <main className="relative flex-grow">
          <Navbar />
          <div
            className={`grid grid-cols-1 justify-center md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-4`}
          >
            {politicsJson.map((item) => (
              <PoliticsCard
                partyComment={item.partyComment}
                partyImage={item.partyImage}
                partyName={item.partyName}
                linkToParty={item.linkToParty}
                readMoreLink={item.readMoreLink}
                key={item.partyName}
              />
            ))}
          </div>
        </main>
      </div>
    </>
  );
};

export default politics;

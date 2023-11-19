import Image from "next/image";

type questionPage = {
  partyName: string;
  partyURL: string;
  partyImage: string;
  content: {
    question: string;
    response: string;
    source: string;
    responseList?: string[];
    conclusion?: string;
  }[];
};
const PoliticsQA = (questionPage: questionPage) => (
  <div className="px-8">
    <div className="flex justify-center pt-10 px-8">
      <Image
        className={questionPage.partyName}
        src={questionPage.partyImage}
        alt={questionPage.partyName}
        width={400}
        height={220}
        objectFit="contain"
      />
    </div>
    <h1 className="pt-4 text-center text-4xl font-bold text-shadow-sm xs:text-5xl sm:text-6xl">
      {questionPage.partyName}
    </h1>
    <div className="grid grid-cols-12 sm:justify-items-center gap-4 space-y-8 pt-8">
      {questionPage.content.map((item, index) => (
        <>
          <div className="col-span-12 sm:w-10/12 md:w-8/12 2xl:w-6/12">
            <div className="sm:text-md md:text-xl  font-bold">
              {index + 1}. {item.question}
            </div>
            <div className="pt-2 sm:text-sm md:text-lg">
              {item.response}
              {item.responseList ? (
                <div className="pt-2">
                  <ul className="list-disc list-inside">
                    {item.responseList.map((responseListItem) => (
                      <li className="pl-3">{responseListItem}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <></>
              )}
              {item.conclusion ? (
                <div className="pt-2">{item.conclusion}</div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </>
      ))}
    </div>
  </div>
);

export default PoliticsQA;

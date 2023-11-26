import Image from "next/image";

type questionPage = {
  partyName?: string;
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
    <div className="flex justify-center object-center px-8 pt-10">
      <Image
        className="max-h-56 object-contain"
        src={questionPage.partyImage}
        alt={
          questionPage.partyName ? questionPage.partyName : "Logo der Partei"
        }
        width={400}
        height={220}
      />
    </div>
    <h1 className="pt-4 text-center text-4xl font-bold text-shadow-sm xs:text-5xl sm:text-6xl">
      {questionPage.partyName}
    </h1>
    <div className="grid grid-cols-12 gap-4 space-y-8 pt-8 sm:justify-items-center">
      {questionPage.content.map((item, index) => (
        <>
          <div
            key={"response." + index}
            className="col-span-12 sm:w-10/12 md:w-8/12 2xl:w-6/12"
          >
            <div className="sm:text-md font-bold  md:text-xl">
              {index + 1}. {item.question}
            </div>
            <div className="pt-2 sm:text-sm md:text-lg">
              {item.response}
              {item.responseList ? (
                <div className="pt-2">
                  <ul className="list-inside list-disc">
                    {item.responseList.map((responseListItem, index1) => (
                      <li className="pl-3" key={"responseList." + index1}>
                        {responseListItem}
                      </li>
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

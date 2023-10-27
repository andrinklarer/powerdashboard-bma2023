import Image from "next/image";
import * as React from "react";

interface PoliticsCard {
  linkToParty: string;
  partyImage: string;
  partyName: string;
  partyComment: string;
  readMoreLink: string;
}

const PoliticsCard = ({
  linkToParty,
  partyImage,
  partyName,
  partyComment,
  readMoreLink,
}: PoliticsCard) => {
  return (
    <div className="flex justify-center p-5">
      <div className="flex-grow flex-col rounded-lg border border-gray-200 bg-white p-5 shadow dark:border-gray-700 dark:bg-gray-900">
        <a href={linkToParty}>
          <div className="flex items-center justify-center">
            <Image
              width={400}
              height={400}
              className="rounded-t-lg "
              src={partyImage}
              alt={partyName}
            />
          </div>
          <div className="flex items-center justify-center pt-10">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {partyName}
            </h5>
          </div>
        </a>

        <div className="flex items-center justify-center">
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {partyComment}
          </p>
        </div>
        <div className="flex items-center justify-center">
          <a
            href={readMoreLink}
            className="inline-flex items-center rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Weiter Lesen
            <svg
              className="ml-2 h-3.5 w-3.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default PoliticsCard;

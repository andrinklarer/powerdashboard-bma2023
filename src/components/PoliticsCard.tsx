import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

import Image from "next/image";
import Link from "next/link";
import { Button } from "~/components/ui/button";

interface PoliticsCard {
  linkToParty: string;
  partyImage: string;
  partyName: string;
  partyComment: string;
  readMoreLink: string;
  partyImageSource: string;
  partyProgramLink: string;
}

const PoliticsCard = ({
  linkToParty,
  partyImage,
  partyName,
  partyComment,
  readMoreLink,
  partyImageSource,
  partyProgramLink,
}: PoliticsCard) => {
  return (
    <Card className="flex max-w-[450px] flex-wrap">
      <CardHeader className="p-6">
        <CardTitle className="flex items-center justify-center">
          <div className=" text-center text-2xl font-bold tracking-tight">
            <a href={linkToParty}>
              <div className="flex h-56 items-center justify-center overflow-hidden rounded-t-lg">
                <Image
                  className="max-h-48 rounded rounded-t-lg object-contain"
                  src={partyImage}
                  alt={partyName}
                  width={400}
                  height={224}
                />
              </div>
            </a>
            {partyName}
          </div>
        </CardTitle>
        <CardDescription className="text-md text-center">
          {partyComment}
        </CardDescription>
      </CardHeader>
      <CardFooter className="w-full items-end justify-around pt-0">
        <Link href={partyProgramLink} className="m-1">
          <Button variant="outline">
            Zum Parteiprogram
            <svg
              className="ml-2 h-3.5 w-3.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            >
              <path d="M1 5h12m0 0L9 1m4 4L9 9" />
            </svg>
          </Button>
        </Link>
        <Link href={readMoreLink} className="m-1">
          <Button>
            Weiter Lesen
            <svg
              className="ml-2 h-3.5 w-3.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            >
              <path d="M1 5h12m0 0L9 1m4 4L9 9" />
            </svg>
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default PoliticsCard;

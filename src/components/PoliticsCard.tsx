import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import Image from "next/image";
import { Separator } from "@radix-ui/react-separator";
import { AlertTriangle, LineChart, Search, Users } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import Navbar from "../components/Navbar";

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
    <Card className="flex max-h-[520px] max-w-[450px] flex-wrap">
      <CardHeader className="p-6">
        <CardTitle className="flex items-center justify-center">
          <div className="text-center text-2xl font-bold tracking-tight">
            <a href={linkToParty}>
              <div className="flex h-56 w-full items-center justify-center overflow-hidden rounded-t-lg">
                <Image
                  className="max-h-56 w-auto max-w-full rounded-t-lg"
                  src={partyImage}
                  alt={partyName}
                  width={400} 
                  height={220}
                  layout="responsive" 
                  objectFit="contain" 
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
      <CardFooter className="w-full justify-around pt-0">
        <Link href={partyProgramLink} className="m-1">
          <Button>
            Zum Parteiprogram
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
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Button>
        </Link>
      </CardFooter>
    </Card>

    // <div className="flex justify-center p-5">
    //   <div className="flex-grow flex-col rounded-lg border border-gray-200 bg-white p-5 shadow dark:border-gray-700 dark:bg-gray-900">
    //     <a href={linkToParty}>
    //       <div className="flex items-center justify-center">
    //         <Image
    //           width={400}
    //           height={400}
    //           className="rounded-t-lg "
    //           src={partyImage}
    //           alt={partyName}
    //         />
    //       </div>
    //       <div className="flex items-center justify-center pt-10">
    //         <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
    //           {partyName}
    //         </h5>
    //       </div>
    //     </a>
    //     <div>
    //     <CardFooter className="items-end pt-0">
    //       <Link href="/politik">
    //         <Button>
    //           Zum Parteiprogram
    //           <svg
    //             className="ml-2 h-3.5 w-3.5"
    //             aria-hidden="true"
    //             xmlns="http://www.w3.org/2000/svg"
    //             fill="none"
    //             viewBox="0 0 14 10"
    //           >
    //             <path
    //               stroke="currentColor"
    //               stroke-linecap="round"
    //               stroke-linejoin="round"
    //               stroke-width="2"
    //               d="M1 5h12m0 0L9 1m4 4L9 9"
    //             />
    //           </svg>
    //         </Button>
    //       </Link>
    //     </CardFooter>

    //     <CardFooter className="items-end pt-0">
    //       <Link href="/politik">
    //         <Button>
    //           Weiter Lesen
    //           <svg
    //             className="ml-2 h-3.5 w-3.5"
    //             aria-hidden="true"
    //             xmlns="http://www.w3.org/2000/svg"
    //             fill="none"
    //             viewBox="0 0 14 10"
    //           >
    //             <path
    //               stroke="currentColor"
    //               stroke-linecap="round"
    //               stroke-linejoin="round"
    //               stroke-width="2"
    //               d="M1 5h12m0 0L9 1m4 4L9 9"
    //             />
    //           </svg>
    //         </Button>
    //       </Link>
    //     </CardFooter>
    //     </div>
    //     {/* <div className="flex items-center justify-center">
    //       <a
    //         href={readMoreLink}
    //         className="inline-flex items-center rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    //       >

    //       </a>
    //     </div> */}
    //   </div>
    // </div>
  );
};

export default PoliticsCard;

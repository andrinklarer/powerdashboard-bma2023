import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

import Navbar from "../components/Navbar";
import { Button } from "~/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex">
        <main className="relative flex-grow ">
          <Navbar />
          <div className="flex">
            <div className="grid grid-cols-12 justify-items-center gap-4 space-y-8">
              <div className="col-span-12 mt-16 ">
                <h1 className="text-4xl font-bold sm:text-6xl ">
                  Powerdashboard
                </h1>
              </div>
              <div className="col-span-12 p-4 sm:w-10/12 md:w-8/12 2xl:w-6/12">
                <p className="text-22 mb-2 font-bold">
                  Einzigartige Einblicke in den Stromhaushalt der Schweiz!
                </p>
                <p className="text-18 text-justify">
                  Sie können historische und aktuellere Daten bis Ende Oktober
                  2023 einsehen und diese mit diversen Parametern und
                  hypothetischen Szenarien manipulieren. Zusätzlich sind die
                  Standpunkte verschiedener Parteien zur Stromversorgung sowie
                  deren Ansätze zur Förderung von Entwicklungen in diesem
                  Bereich abgebildet.
                </p>
              </div>
              <div className="hidden md:col-span-2 md:block 2xl:col-span-3"></div>
              <div className="col-span-12 mx-2 flex h-fit justify-center space-x-8 sm:col-span-6 md:col-span-4 2xl:col-span-3">
                <Card className="flex max-w-[450px] flex-wrap justify-end">
                  <CardHeader className="p-6">
                    <CardTitle className="text-2xl">
                      Analyse von historischen und aktuellen Daten
                    </CardTitle>
                    <CardDescription className="text-md">
                      Manipulieren Sie die Stromdaten anhand von diversen
                      Parametern und Was-Wäre-Wenn-Szenarien.
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="flex justify-end pt-0">
                    <Link href="/dashboard">
                      <Button>Mehr</Button>
                    </Link>{" "}
                  </CardFooter>
                </Card>
              </div>
              <div className="col-span-12 mx-2 flex justify-center space-x-8 sm:col-span-6 md:col-span-4 2xl:col-span-3">
                <Card className="flex max-w-[450px] flex-wrap justify-end">
                  <CardHeader className="">
                    <CardTitle className="text-2xl">
                      Übersicht verschiedener Parteien
                    </CardTitle>
                    <CardDescription className="text-md">
                      Erfahren Sie mehr über die Meinungen verschiedener
                      Parteien zum Themenbereich Strom und Stromerzeugung.
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="items-end pt-0">
                    <Link href="/politik">
                      <Button>Mehr</Button>
                    </Link>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

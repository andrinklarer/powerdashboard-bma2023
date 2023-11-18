import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";

import { Separator } from "@radix-ui/react-separator";
import { AlertTriangle, LineChart, Search, Users } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <>
      <div className=" flex">
        <main className="relative flex-grow ">
          <div className="flex">
            <div className="grid grid-cols-12 justify-items-center gap-4 space-y-8">
              <div className="col-span-12 w-full bg-[url('/title.png')] bg-cover bg-center pb-16 shadow-xl">
                <Navbar />
                <h1 className="text-shadow-sm pt-32 text-center text-4xl font-bold xs:text-5xl sm:text-6xl">
                  Powerdashboard
                </h1>
              </div>
              <div className="col-span-12 p-4 sm:w-10/12 md:w-8/12 2xl:w-6/12">
                <p className="mb-2 text-22 font-bold">
                  Einzigartige Einblicke in den Stromhaushalt der Schweiz!
                </p>
                <p className="text-justify text-18">
                  Sie können historische und aktuellere Daten bis Ende Oktober
                  2023 einsehen und diese mit diversen Parametern und
                  hypothetischen Szenarien manipulieren. Zusätzlich sind die
                  Standpunkte verschiedener Parteien zur Stromversorgung sowie
                  deren Ansätze zur Förderung von Entwicklungen in diesem
                  Bereich abgebildet.
                </p>
              </div>
              <div className="hidden md:col-span-2 md:block 2xl:col-span-3"></div>
              <div className="col-span-12 mx-2 flex items-stretch justify-center space-x-8 sm:col-span-12 md:col-span-8 2xl:col-span-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="flex-grow">
                    <Card className="flex h-full max-w-[450px] flex-wrap justify-end">
                      <CardHeader className="p-6">
                        <CardTitle className="flex items-center ">
                          <Search className="h-8 w-8 flex-shrink-0" />
                          <Separator
                            orientation="vertical"
                            className="ml-2 mr-3 h-4/6 w-[1px] bg-zinc-400"
                          />
                          <div className="text-2xl font-bold tracking-tight">
                            Analyse von historischen und aktuellen Daten
                          </div>
                        </CardTitle>
                        <CardDescription className="text-md">
                          Manipulieren Sie die Stromdaten anhand von diversen
                          Parametern und Was-Wäre-Wenn-Szenarien.
                        </CardDescription>
                      </CardHeader>
                      <CardFooter className="items-end pt-0">
                        <Link href="/dashboard">
                          <Button>Mehr</Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  </div>
                  <div className="flex-grow">
                    <Card className=" flex h-full max-w-[450px] flex-wrap justify-end">
                      <CardHeader className="">
                        <CardTitle className="flex items-center ">
                          <Users className="h-8 w-8 flex-shrink-0" />
                          <Separator
                            orientation="vertical"
                            className="ml-2 mr-3 h-4/6 w-[1px] bg-zinc-400"
                          />
                          <div className="text-2xl font-bold tracking-tight">
                            Übersicht verschiedener Parteien
                          </div>
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
              <div className="hidden md:col-span-2 md:block 2xl:col-span-3"></div>
              <div className="hidden md:col-span-2 md:block 2xl:col-span-3"></div>
              <div className="col-span-12  mx-2 flex justify-center space-x-8 sm:col-span-12 md:col-span-8 2xl:col-span-6">
                <Alert>
                  <AlertTriangle className="mt-[1px] h-6 w-6" />
                  <AlertTitle className="!pl-9 text-lg font-bold">
                    Achtung!
                  </AlertTitle>
                  <AlertDescription className="!pl-9">
                    <div className="mt-2 space-y-2 text-base text-muted-foreground">
                      <p>
                        Die hier dargestellten Statistiken sollten nicht als
                        offizielle Quelle für wissenschaftliche oder kritische
                        Bildungszwecke verwendet werden. Sie dienen allein der
                        Illustration von Was-Wäre-Wenn-Szenarien und sollen zum
                        Nachdenken im Bereich der Energieversorgung anregen.
                      </p>
                      <p>
                        Die angepassten Parameter werden auf die gesamte
                        historische Statistik übertragen und dienen nicht als
                        Vorschau auf künftige Daten oder repräsentativ für
                        Vergangenes. Auch berücksichtigen die Berechnungen nicht
                        die aktuellen Entwicklungen, wie beispielsweise die
                        Anzahl der Autos zu Beginn des Jahres 2023.
                      </p>
                    </div>
                  </AlertDescription>
                </Alert>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

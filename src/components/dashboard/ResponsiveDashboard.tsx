"use client";
import { isSameMonth, startOfMonth, startOfYear } from "date-fns";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import type { DateRange } from "react-day-picker";
import {
  DiagrammType,
  amountOfNuclearPowerPlants,
  amountOfWindTurbines,
  dataFreshness,
  efficiencyOfSolarPanels,
} from "~/lib/consts";
import { useIsMobile } from "~/lib/utils";
import { api } from "~/utils/api";
import { DateRangePicker } from "../DateRangePicker";
import StackedAreaChartPlot from "../charts/StackedAreaChartPlot";
import { Tabs, TabsList, TabsTrigger } from "./../ui/tabs";
import ChartSetting from "./ChartSettings";
import ProductionOptions from "./ProductionOptions";
import ScenarioOptions from "./ScenarioOptions";

import { Separator } from "@radix-ui/react-separator";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./../ui/sheet";

function getLatestDate() {
  const { data } = api.powerDashboard.getLastDate.useQuery();
  if (data) {
    return data.date;
  } else {
    return dataFreshness;
  }
}

function getFirstDate() {
  const { data } = api.powerDashboard.getFirstDate.useQuery();
  if (data) {
    return data.date;
  } else {
    return startOfMonth(dataFreshness);
  }
}

const ResponsiveCharts = () => {
  const latestDate = getLatestDate();
  const firstDate = getFirstDate();

  const isMobile = useIsMobile();
  const { resolvedTheme } = useTheme();
  const [iconPath, setIconPath] = useState("dark/");

  useEffect(() => {
    // Set the icon path as soon as provided dynamically based on the resolved theme
    if (resolvedTheme) {
      setIconPath(`${resolvedTheme}/`);
    }
  }, [resolvedTheme]);

  const [showConsumption, setShowConsumption] = useState<boolean>(false);
  const [showLosses, setShowLosses] = useState<boolean>(false);
  const [hideNuclear, setHideNuclear] = useState<boolean>(false);

  const [electricCars, setElectricCars] = useState<boolean>(false);

  const [diagramType, setDiagramType] = useState<DiagrammType>(
    DiagrammType.DAY,
  );

  useEffect(() => {
    if (electricCars && showLosses) {
      setShowLosses(false);
    }
  }, [electricCars]);

  useEffect(() => {
    if (electricCars && showLosses) {
      setElectricCars(false);
    }
  }, [showLosses]);

  const [dateRange, setDateRange] = React.useState<DateRange>({
    from: startOfMonth(latestDate),
    to: latestDate,
  });

  const [amountOfNuclear, setAmountOfNuclear] = useState<number>(
    amountOfNuclearPowerPlants,
  );
  const [solarEfficiency, setSolarEfficiency] = useState<number>(
    efficiencyOfSolarPanels,
  );
  const [windTurbines, setWindTurbines] =
    useState<number>(amountOfWindTurbines);

  useEffect(() => {
    if (
      diagramType === DiagrammType.MONTH &&
      isSameMonth(dateRange.to!, dateRange.from!)
    ) {
      setDateRange({
        from: startOfYear(latestDate),
        to: latestDate,
      });
    } else if (
      diagramType === DiagrammType.DAY &&
      dateRange.from!.toDateString() ===
        startOfYear(latestDate).toDateString() &&
      dateRange.to!.toDateString() === latestDate.toDateString()
    ) {
      setDateRange({
        from: startOfMonth(latestDate),
        to: latestDate,
      });
    }
  }, [diagramType]);

  return (
    <div>
      <div className="mb-12 mt-4 grid grid-cols-12">
        <div className="col-span-12 my-2 ml-2 mr-0 h-[650px] lg:col-span-8 lg:my-4 lg:ml-4">
          <StackedAreaChartPlot
            diagramType={diagramType}
            dateRange={dateRange}
            showConsumption={showConsumption}
            showLosses={showLosses}
            hideNuclear={hideNuclear}
            nuclearModifier={amountOfNuclear}
            solarEfficiency={solarEfficiency}
            windTurbines={windTurbines}
            electricCars={electricCars}
          />
        </div>
        <div
          className={`col-span-12 m-4 h-fit lg:col-span-4 lg:ml-0 ${
            isMobile && "mt-12"
          }`}
        >
          <div className="w-full space-y-2.5">
            <div className="mb-8 rounded-lg border p-4">
              <div className=" flex items-center justify-between space-x-2 ">
                <label className="text-md font-medium leading-none">
                  Zeitraum
                </label>
                <DateRangePicker
                  diagramType={diagramType}
                  lowerLimit={firstDate}
                  upperLimit={latestDate}
                  dateRange={dateRange}
                  setDateRange={setDateRange}
                />
              </div>
              <hr className="my-3" />
              <div>
                <Tabs defaultValue="days" className="w-full">
                  <TabsList className="w-full">
                    <TabsTrigger
                      className="w-1/2"
                      value="days"
                      onClick={() => setDiagramType(DiagrammType.DAY)}
                    >
                      Tage
                    </TabsTrigger>
                    <TabsTrigger
                      className="w-1/2"
                      value="months"
                      onClick={() => setDiagramType(DiagrammType.MONTH)}
                    >
                      Monate
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>

            <ChartSetting
              label="Verbrauch"
              description="Zeige den Stromverbrauch der Schweiz."
              state={showConsumption}
              setState={setShowConsumption}
            />
            <ChartSetting
              label="Bedarf"
              description="Zeige den Verbrauch + Verluste durch die Strom&uuml;bertragung und Verteilung."
              state={showLosses}
              setState={setShowLosses}
              disabled={!showConsumption}
            />
            <ChartSetting
              label="Kernkraft"
              description="Stromproduktion ohne Kernkraft."
              state={hideNuclear}
              setState={setHideNuclear}
            />
            <ScenarioOptions
              iconPath={iconPath + "electricCar.svg"}
              title="Elektromobilit&auml;t"
              dialogTitle="Elektromobilit&auml;t"
              dialogDescription="Einf&uuml;hrung einer Elektroautopflicht."
              dialogContent={
                <div className="space-y-4">
                  <p className="text-justify text-muted-foreground">
                    Im Jahr 2023 verbrauchen die 155&apos;496 in der Schweiz
                    eingel&ouml;sten, reinen Elektroautos etwa 466 GWh Strom.{" "}
                  </p>
                  <p className="text-justify text-muted-foreground ">
                    Diese Schätzung basiert auf Angaben von{" "}
                    <Link
                      className="underline"
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://www.enex.me/blog/energie/wie-viel-strom-brauchen-e-autos-in-der-schweiz"
                    >
                      ENEX.ME
                    </Link>
                    , dem{" "}
                    <Link
                      className="underline"
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://www.bfs.admin.ch/bfs/de/home/statistiken/mobilitaet-verkehr/verkehrsinfrastruktur-fahrzeuge/fahrzeuge/strassenfahrzeuge-bestand-motorisierungsgrad.html"
                    >
                      Bundesamt für Statistik (BFS)
                    </Link>{" "}
                    und folgender Rechnung: Ein Elektroauto verbraucht im
                    Schnitt 20 Kilowattstunden (kWh) für 100 Kilometer. Bei
                    einer durchschnittlichen Jahresfahrleistung von 15&apos;000
                    Kilometern mal 155&apos;496 Elektroautos ergibt sich ein
                    Stromverbrauch von 466 GWh. Pro Tag entspricht dies
                    ungef&auml;hr 1.3 GWh.{" "}
                  </p>
                  <Image
                    className=""
                    src={resolvedTheme + "/LaTeX/eCar.svg"}
                    height="50"
                    width="1000"
                    alt="Elektroauto Formel"
                  ></Image>
                  <p className="text-justify text-muted-foreground">
                    Der t&auml;gliche Stromverbrauch unter der Annahme, dass
                    alle Personenwagen rein elektrisch betrieben werden, basiert
                    auf folgender Berechnung:
                  </p>
                  <Image
                    className="!mb-2 "
                    src={resolvedTheme + "/LaTeX/eCarTotal.svg"}
                    height="50"
                    width="1000"
                    alt="Elektroauto Formel"
                  ></Image>
                </div>
              }
              setState={setElectricCars}
              state={electricCars}
              disabled={!showConsumption}
            />
          </div>
        </div>
        <div className="col-span-12 m-4 mt-4 h-fit lg:m-8 xl:mr-4 2xl:col-span-6">
          <div className="space-y-2.5 rounded  ">
            <ProductionOptions
              iconPath={iconPath + "nuclearIcon.svg"}
              text="Anzahl Reaktoren in der Schweiz"
              tooltip={
                <p>
                  Die Schweiz hat aktuell{" "}
                  <Link
                    className="underline"
                    target="_blank"
                    rel="noopener noreferrer"
                    href=" https://www.ensi.ch/de/themen/kernkraftwerke-schweiz/"
                  >
                    4 Atomreaktoren
                  </Link>
                  , welche aktiv Strom produzieren. Wird ein Reaktor
                  hinzugef&uuml;gt, wird die zus&auml;tzliche Stromproduktion
                  anhand eines neuen modernen Reaktors berechnet. Eine solche{" "}
                  <Link
                    href="https://www.ge.com/steam-power/products/steam-turbines/nuclear-arabelle#:~:text=Specifications%20for%20EPR%20and%20CPR1000%20reactors%20(50%20Hz%20only)"
                    className="underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    EPR-Turbine von General Electric
                  </Link>{" "}
                  liefert dem Stromnetz{" "}
                  <Link
                    href="https://www.ge.com/steam-power/resources/case-studies/hpc"
                    className="underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ca. 1.6 GW
                  </Link>
                  .
                </p>
              }
              setAmount={setAmountOfNuclear}
              max={10}
              defaultValue={amountOfNuclearPowerPlants}
            />
            <ProductionOptions
              iconPath={iconPath + "solarIcon.svg"}
              text="Wirkungsgrad der Solaranlagen"
              tooltip={
                <p>
                  Aktuelle Solarmodule haben einen{" "}
                  <Link
                    className="underline"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.uvek-gis.admin.ch/BFE/sonnendach/#:~:text=Ab%20September%202022%20wird%20ein%20Modul%2DWirkungsgrad%20von%2020%25%20angenommen"
                  >
                    Wirkungsgrad von etwa 20%.
                  </Link>{" "}
                  Technologische Fortschritte könnten diesen Wert erhöhen und
                  die Stromerzeugung bei gleicher Fläche steigern.
                </p>
              }
              setAmount={setSolarEfficiency}
              max={100}
              defaultValue={efficiencyOfSolarPanels}
            />
            <ProductionOptions
              iconPath={iconPath + "turbineIcon.svg"}
              text="Anzahl Windturbinen"
              tooltip={
                <p>
                  In der Schweiz stehen aktuell nur{" "}
                  <Link
                    target="_blank"
                    className="underline"
                    rel="noopener noreferrer"
                    href="https://www.bfe.admin.ch/bfe/de/home/versorgung/erneuerbare-energien/windenergie.html"
                  >
                    41 Windturbinen.
                  </Link>{" "}
                  Wird eine Windturbine hinzugef&uuml;gt, wird die
                  zus&auml;tzliche Stromproduktion anhand des Durchschnitts der
                  bestehenden Windturbinen berechnet.
                </p>
              }
              setAmount={setWindTurbines}
              max={1000}
              defaultValue={windTurbines}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="mb-8">
              Quellen und Informationen zu den Daten
            </Button>
          </SheetTrigger>{" "}
          <SheetContent
            side={"bottom"}
            className="h-full overflow-auto xs:h-fit"
          >
            <div className="flex items-center justify-center ">
              <div className="grid grid-cols-2 justify-center lg:grid-cols-12 2xl:w-10/12">
                <div className="col-span-9 lg:pr-8">
                  <SheetHeader className="mb-2">
                    <SheetTitle>Informationen zu den Daten</SheetTitle>
                  </SheetHeader>
                  <div className="space-y-2.5">
                    <p>
                      Die Wasserkraftproduktion in der Schweiz basiert auf
                      Flusskraft und Speicherkraft. Flusskraft entsteht durch
                      Laufwasserkraftwerke in Fl&uuml;ssen oder B&auml;chen,
                      w&auml;hrend Speicherkraft durch Speicherkraftwerke und
                      Stauseen generiert wird, die Energie speichern und bei
                      Bedarf Strom erzeugen.
                    </p>
                    <p>
                      Die im Diagramm ersichtliche Produktion aus Solar umfasst
                      nur die Menge, die ins Schweizer Stromnetz eingespiesen
                      wird. Die Gesamtproduktion ist aufgrund des
                      Eigenverbrauchs h&ouml;her.
                    </p>
                    <p>
                      Die Monats&uuml;bersicht gibt aufgrund der variierenden
                      Anzahl von Tagen in jedem Monat nur eingeschr&auml;nkt
                      einen Trend des Stromverbrauchs und der Produktion
                      &uuml;ber das Jahr wieder.
                    </p>
                    <p>
                      Die Datenlage zum Schweizer Stromverbrauch ist{" "}
                      <Link
                        href={
                          "https://opendata.swiss/de/dataset/energiedashboard-ch-stromverbrauch-swissgrid#:~:text=Die%20Datenlage%20zum,mit%20der%20Strombranche."
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                      >
                        nicht zufriedenstellend
                      </Link>
                      . Die Daten sind mit Unsicherheiten behaftet,
                      Fehlermeldungen und Korrekturen sind nicht selten.
                    </p>
                  </div>
                </div>
                <div className="col-span-3 mt-8 text-center sm:text-left lg:mt-0 ">
                  <SheetHeader className="mb-2">
                    <SheetTitle>Daten und Quellen</SheetTitle>
                  </SheetHeader>
                  <p>
                    BFE,{" "}
                    <a
                      href="https://opendata.swiss/de/dataset/energiedashboard-ch-stromproduktion-swissgrid"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                    >
                      Stromproduktion Swissgrid
                    </a>
                  </p>
                  <p>
                    BFE,{" "}
                    <a
                      href="https://opendata.swiss/de/dataset/energiedashboard-ch-stromverbrauch-swissgrid"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                    >
                      Stromverbrauch Swissgrid
                    </a>
                  </p>
                  <div className="flex justify-center sm:justify-start">
                    <Separator className="mb-1 mt-2 h-[1px] w-1/12 max-w-[32px] shrink-0 bg-border" />
                  </div>
                  <p>
                    Icons:{" "}
                    <a
                      href="https://www.flaticon.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                    >
                      flaticon.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default ResponsiveCharts;

"use client";
import { isSameMonth, startOfMonth, startOfYear } from "date-fns";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
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

function calculateTimeDifference(date: Date, date2: Date) {
  const diff = date2.getTime() - date.getTime();
  return Math.ceil(diff / (1000 * 3600 * 24));
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

  const [scenario, setScenario] = useState<number>(0);

  return (
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
            label="Kernkraft ausblenden"
            description="Zeige die Produktion ohne Kernkraft."
            state={hideNuclear}
            setState={setHideNuclear}
          />
          <ScenarioOptions
            iconPath={iconPath + "electricCar.svg"}
            text="Elektromobilit&auml;t"
            dialogTitle="Elektromobilit&auml;t"
            dialogDescription="Einf&uuml;hrung einer Elektroautopflicht"
            dialogContent={
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Von der Gesamtzahl der Personenwagen in der Schweiz machen
                  2023 Elektroautos 3,27% aus was 155&apos;496 Autos entspricht.
                  Zusammen verbrauchen sie j&auml;hrlich rund 466
                  Gigawattstunden (GWh) Strom.{" "}
                </p>
                <p className="text-muted-foreground ">
                  Diese Schätzung basiert auf Angaben von{" "}
                  <Link
                    className="underline"
                    href="https://www.enex.me/blog/energie/wie-viel-strom-brauchen-e-autos-in-der-schweiz"
                  >
                    ENEX.ME
                  </Link>
                  , dem{" "}
                  <Link
                    className="underline"
                    href="https://www.bfs.admin.ch/bfs/de/home/statistiken/mobilitaet-verkehr/verkehrsinfrastruktur-fahrzeuge/fahrzeuge/strassenfahrzeuge-bestand-motorisierungsgrad.html"
                  >
                    Bundesamt für Statistik (BFS)
                  </Link>{" "}
                  und folgender Rechnung: Ein Elektroauto verbraucht im Schnitt
                  20 Kilowattstunden (kWh) für 100 Kilometer. Bei einer
                  durchschnittlichen Jahresfahrleistung von 15&apos;000
                  Kilometern mal 155&apos;496 Autos ergibt sich ein
                  Stromverbrauch von 466 GWh.{" "}
                </p>
                <Image
                  className=""
                  src={resolvedTheme + "/electricCarLaTeX.svg"}
                  height="100"
                  width="1000"
                  alt="Elektroauto Formel"
                ></Image>
                <p className="text-muted-foreground">
                  Den Stromverbrauch pro Tag falls alle Autos elektrisch
                  betrieben werden, stammt aus folgender Rechnung:
                </p>
                <Image
                  className="!mb-2 "
                  src={resolvedTheme + "/totalElectricCarLaTeX.svg"}
                  height="100"
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
                  href=" https://www.ensi.ch/de/themen/kernkraftwerke-schweiz/"
                >
                  4 Atomreaktoren
                </Link>
                , welche aktiv Strom produzieren. Wird ein Reaktor
                hinzugef&uuml;gt, wird die zus&auml;tzliche Stromproduktion
                anhand des Durchschnitts der bestehenden Reaktoren berechnet.
              </p>
            }
            setAmount={setAmountOfNuclear}
            max={10}
            defaultValue={amountOfNuclearPowerPlants}
          />
          <ProductionOptions
            iconPath={iconPath + "solarIcon.svg"}
            text="Wirkunsgrad der Solaranlagen"
            tooltip={
              <p>
                Aktuelle Solarpanels haben einen Wirkungsgrad von etwa 21.8%.
                Technologische Fortschritte könnten diesen Wert erhöhen und die
                Stromerzeugung bei gleicher Fläche steigern.
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
                  className="underline"
                  href="https://www.bfe.admin.ch/bfe/de/home/versorgung/erneuerbare-energien/windenergie.html/#:~:text=2020%20gibt%20es%20in%20unserem,Gesamtleistung%20von%2037%2C2%20MW"
                >
                  41 Windturbinen.{" "}
                </Link>
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
  );
};

export default ResponsiveCharts;

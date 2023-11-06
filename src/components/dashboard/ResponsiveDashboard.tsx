"use client";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import {
  amountOfNuclearPowerPlants,
  amountOfWindTurbines,
  dataFreshness,
  efficiencyOfSolarPanels,
} from "~/lib/consts";
import { api } from "~/utils/api";
import ChartSetting from "./ChartSettings";
import { DateRangePicker } from "../DateRangePicker";
import ProductionOptions from "./ProductionOptions";
import StackedAreaChartPlot from "../charts/StackedAreaChartPlot";
import Link from "next/link";
import { useIsMobile } from "~/lib/utils";

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
    return getFirstDayOfMonth(dataFreshness);
  }
}

const getFirstDayOfMonth = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth(), 1);
};

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

  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: getFirstDayOfMonth(latestDate),
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

  const [scenario, setScenario] = useState<number>(0);

  const amountToDisplay = calculateTimeDifference(
    getFirstDayOfMonth(latestDate),
    latestDate,
  );

  return (
    <div className="mb-12 mt-4 grid grid-cols-12">
      <div className="col-span-12 my-2 ml-2 mr-0 h-[600px] lg:col-span-8 lg:my-4 lg:ml-4">
        <StackedAreaChartPlot
          amount={amountToDisplay}
          dateRange={dateRange!}
          showConsumption={showConsumption}
          showLosses={showLosses}
          hideNuclear={hideNuclear}
          nuclearModifier={amountOfNuclear}
          solarEfficiency={solarEfficiency}
          windTurbines={windTurbines}
        />
      </div>
      <div
        className={`col-span-12 m-4 h-fit lg:col-span-4 lg:ml-0 ${
          isMobile && "mt-12"
        }`}
      >
        <div className="w-full space-y-2.5">
          <div className="mb-8 flex items-center justify-between space-x-2 rounded-lg border p-4">
            <label className="text-md font-medium leading-none">Zeitraum</label>
            <DateRangePicker
              lowerLimit={firstDate}
              upperLimit={latestDate}
              dateRange={dateRange}
              setDateRange={setDateRange}
            />
          </div>
          <ChartSetting
            label="Verbrauch"
            description="Zeige den Stromverbrauch der Schweiz."
            state={showConsumption}
            setState={setShowConsumption}
          />
          <ChartSetting
            label="Verluste"
            description="Zeige die Verluste in der Strom&uuml;bertragung und -verteilung und wie viel Energie wirklich ben&ouml;tigt wird, um unseren Bedarf zu decken."
            state={showLosses}
            setState={setShowLosses}
            disabled={!showConsumption}
          />
          <ChartSetting
            label="Kernkraft ausblenden"
            description="Zeige die Stromerzeugnisse ohne Kernkraft."
            state={hideNuclear}
            setState={setHideNuclear}
          />
        </div>
      </div>
      <div className="col-span-12 m-4 mt-4 h-fit lg:m-8 xl:col-span-6">
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
                Aktuelle Solarpanels haben einen Wirkungsgrad von etwa 22%.
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
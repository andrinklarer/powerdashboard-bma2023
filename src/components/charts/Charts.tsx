"use client";
import { useTheme } from "next-themes";
import React, { useState } from "react";
import { DateRange } from "react-day-picker";
import {
  amountOfNuclearPowerPlants,
  amountOfWindTurbines,
  dataFreshness,
  efficiencyOfSolarPanels,
} from "~/lib/consts";
import { api } from "~/utils/api";
import ChartSetting from "../ChartSettings";
import { DateRangePicker } from "../DateRangePicker";
import ProductionOptions from "../ProductionOptions";
import StackedAreaChartPlot from "./StackedAreaChartPlot";
import Link from "next/link";

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

const Charts = () => {
  const latestDate = getLatestDate();
  const firstDate = getFirstDate();

  const [showConsumption, setShowConsumption] = useState<boolean>(false);
  const [showLosses, setShowLosses] = useState<boolean>(false);
  const [hideNuclear, setHideNuclear] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(getFirstDayOfMonth(latestDate));

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

  const amountToDisplay = calculateTimeDifference(date, latestDate);

  const theme = useTheme();

  return (
    <>
      <section className="my-4 flex gap-3 px-4">
        <div className="bg-white-700 h-[600px] w-2/3 rounded">
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

        <div className="h-[300px] w-1/3 rounded">
          <div>
            <div className="w-full space-y-6">
              <div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
                    <label className="text-md font-medium leading-none">
                      Zeitraum
                    </label>
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
            </div>
          </div>
        </div>
      </section>

      <section className="my-4 flex gap-2 px-4">
        <div className=" m-8 space-y-4 rounded  ">
          <ProductionOptions
            iconPath={
              theme.theme === "light"
                ? "nuclear-symbol.png"
                : "nuclear-symbol.svg"
            }
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
            iconPath={
              theme.theme === "light" ? "solarIcon.svg" : "solarIconWhite.svg"
            }
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
            iconPath={
              theme.theme === "light"
                ? "turbineIcon.png"
                : "turbineIconWhite.svg"
            }
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
        <div className=" m-8 h-[250px] w-1/2 space-y-4 rounded  "></div>
      </section>
    </>
  );
};

export default Charts;

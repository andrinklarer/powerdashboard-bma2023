"use client";
import { useState } from "react";
import StackedAreaChartPlot from "./StackedAreaChartPlot";
import ChartSetting from "../ChartSettings";
import {
  amountOfNuclearPowerPlants,
  amountOfWindTurbines,
  efficiencyOfSolarPanels,
} from "~/lib/consts";
import ProductionOptions from "../ProductionOptions";
import { DatePicker } from "../DatePicker";
import { api } from "~/utils/api";

function getLatestDate() {
  const { data } = api.powerDashboard.getLastDate.useQuery();
  if (data) {
    return data.date;
  } else {
    return new Date(2023, 8);
  }
}

function getFirstDate() {
  const { data } = api.powerDashboard.getFirstDate.useQuery();
  if (data) {
    return data.date;
  } else {
    return new Date(2023, 8);
  }
}

function calculateTimeDifference(date: Date, date2: Date) {
  const diff = date2.getTime() - date.getTime();
  return Math.ceil(diff / (1000 * 3600 * 24));
}

const Charts = () => {
  const latestDate = getLatestDate();
  const firstDate = getFirstDate();

  const firstDayOfMonth = new Date(
    latestDate.getFullYear(),
    latestDate.getMonth(),
    1,
  );

  const [showConsumption, setShowConsumption] = useState<boolean>(false);
  const [showLosses, setShowLosses] = useState<boolean>(false);
  const [hideNuclear, setHideNuclear] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(firstDayOfMonth);

  const [amountOfNuclear, setAmountOfNuclear] = useState<number>(
    amountOfNuclearPowerPlants,
  );
  const [solarEfficiency, setSolarEfficiency] = useState<number>(
    efficiencyOfSolarPanels,
  );
  const [windTurbines, setWindTurbines] =
    useState<number>(amountOfWindTurbines);

  const amountToDisplay = calculateTimeDifference(date, latestDate);

  return (
    <>
      <section className="my-4 flex gap-3 px-4">
        <div className="bg-white-700 h-[600px] w-2/3 rounded">
          <StackedAreaChartPlot
            amount={amountToDisplay}
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
                  <div className="flex items-center justify-between space-x-2 rounded-lg border bg-slate-200 p-4">
                    <p className="text-md font-medium leading-none">
                      Setze das Startdatum:
                    </p>
                    <DatePicker
                      lowerLimit={firstDate}
                      upperLimit={latestDate}
                      date={date}
                      setDate={setDate}
                    />
                  </div>
                  <ChartSetting
                    label="Verbrauch"
                    description="Vergleiche den Stromverbrauch der Schweiz mit der Gesamtproduktion."
                    state={showConsumption}
                    setState={setShowConsumption}
                  />
                  <ChartSetting
                    label="Verluste"
                    description="Zeige die Verluste welche durch die &Uuml;bertragung und Verteilung entstehen."
                    state={showLosses}
                    setState={setShowLosses}
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
        <div className=" m-8 h-[250px] w-1/2 space-y-4 rounded  ">
          <ProductionOptions
            iconPath="reactorIcon.png"
            text="Anzahl Reaktoren in der Schweiz"
            tooltip="Die Schweiz hat aktuell 4 Atomreaktoren, welche aktiv Strom produzieren. Wird ein Reaktor hinzugef&uuml;gt, wird die zus&auml;tzliche Stromproduktion anhand des Durchschnitts der bestehenden Reaktoren berechnet."
            setAmount={setAmountOfNuclear}
            max={10}
            defaultValue={amountOfNuclearPowerPlants}
          />
          <ProductionOptions
            iconPath="solarIcon.svg"
            text="Wirkunsgrad der Solaranlagen"
            tooltip="Akt"
            setAmount={setSolarEfficiency}
            max={100}
            defaultValue={efficiencyOfSolarPanels}
          />
          <ProductionOptions
            iconPath="turbineIcon.png"
            text="Anzahl Windturbinen"
            tooltip="In der Schweiz stehen aktuell nur 41 Windturbinen. Wird eine Windturbine hinzugef&uuml;gt, wird die zus&auml;tzliche Stromproduktion anhand des Durchschnitts der bestehenden Windturbinen berechnet."
            setAmount={setWindTurbines}
            max={1000}
            step={10}
            defaultValue={windTurbines}
          />
        </div>

        <div className=" h-[250px] w-1/2 rounded bg-gray-700"></div>
      </section>
    </>
  );
};

export default Charts;

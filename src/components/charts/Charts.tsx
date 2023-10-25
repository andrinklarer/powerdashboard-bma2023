"use client";
import { useState } from "react";
import StackedAreaChartPlot from "./StackedAreaChartPlot";
import AreaChartPlot from "./AreaChartPlot";
import ChartSetting from "../ChartSettings";
import QuantityInput from "../NumberInput";
import {
  amountOfNuclearPowerPlants,
  efficiencyOfSolarPanels,
} from "~/lib/consts";
import { Separator } from "./../ui/separator";
import ProductionOptions from "../ProductionOptions";

const Charts = () => {
  const [showConsumption, setShowConsumption] = useState<boolean>(false);
  const [showLosses, setShowLosses] = useState<boolean>(false);
  const [hideNuclear, setHideNuclear] = useState<boolean>(false);

  const [amountOfNuclear, setAmountOfNuclear] = useState<number>(
    amountOfNuclearPowerPlants,
  );
  const [solarEfficiency, setSolarEfficiency] = useState<number>(
    efficiencyOfSolarPanels,
  );

  return (
    <>
      <section className="my-4 flex gap-3 px-4">
        <div className="bg-white-700 h-[600px] w-2/3 rounded">
          <StackedAreaChartPlot
            showConsumption={showConsumption}
            showLosses={showLosses}
            hideNuclear={hideNuclear}
            nuclearModifier={amountOfNuclear}
          />
        </div>

        <div className="h-[300px] w-1/3 rounded">
          <div>
            <div className="w-full space-y-6">
              <div>
                <div className="space-y-4">
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
        <div className=" h-[250px] w-1/2 space-y-4 rounded ">
          <ProductionOptions
            iconPath="reactorIcon.png"
            text="Anzahl Reaktoren in der Schweiz"
            tooltip="Die Schweiz hat aktuell 4 Atomreaktoren, welche aktiv Strom produzieren. Wird ein Reaktor hinzugef&uuml;gt, wird die zus&auml;tzliche Stromproduktion anhand des Durchschnitts der bestehenden Reaktoren berechnet."
            setAmount={setAmountOfNuclear}
            min={0}
            max={10}
            defaultValue={amountOfNuclearPowerPlants}
          />
          <ProductionOptions
            iconPath="sun.svg"
            text="Wirkunsgrad der Solaranlagen"
            tooltip="Akt"
            setAmount={setSolarEfficiency}
            min={0}
            max={100}
            defaultValue={efficiencyOfSolarPanels}
          />
        </div>

        <div className=" h-[250px] w-1/2 rounded bg-gray-700"></div>
      </section>
    </>
  );
};

export default Charts;

"use client";
import { useState } from "react";
import { Switch } from "~/components/ui/switch";
import StackedAreaChartPlot from "./StackedAreaChartPlot";
import AreaChartPlot from "./AreaChartPlot";
import ChartSetting from "../ChartSettings";

const Charts = () => {
  const [showConsumption, setShowConsumption] = useState<boolean>(false);
  const [showLosses, setShowLosses] = useState<boolean>(false);
  const [showNuclear, setShowNuclear] = useState<boolean>(false);

  return (
    <>
      <section className="my-4 flex gap-3 px-4">
        <div className="h-[300px] w-2/3 rounded bg-gray-700">
          <AreaChartPlot />
        </div>

        <div className="h-[300px] w-1/3 rounded bg-gray-700"></div>
      </section>
      <section className="my-4 flex gap-3 px-4">
        <div className="bg-white-700 h-[600px] w-2/3 rounded">
          <StackedAreaChartPlot
            showConsumption={showConsumption}
            showLosses={showLosses}
            showNuclear={showNuclear}
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
                    label="Kernkraft"
                    description="Zeige die Kernkraftproduktion."
                    state={showNuclear}
                    setState={setShowNuclear}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="my-4 flex gap-2 px-4">
        <div className=" h-[250px] w-1/2 rounded bg-gray-700"></div>
        <div className=" h-[250px] w-1/2 rounded bg-gray-700"></div>
      </section>
    </>
  );
};

export default Charts;

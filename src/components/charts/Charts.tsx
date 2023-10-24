"use client";
import { useState } from "react";
import { Switch } from "~/components/ui/switch";
import StackedAreaChartPlot from "./StackedAreaChartPlot";
import AreaChartPlot from "./AreaChartPlot";

const Charts = () => {
  const [showConsumption, setShowConsumption] = useState<boolean>(false);
  const [showLosses, setShowLosses] = useState<boolean>(false);

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
          />
        </div>

        <div className="h-[300px] w-1/3 rounded">
          <div>
            <div className="w-full space-y-6">
              <div>
                <div className="space-y-4">
                  <div className="flex flex-row items-center justify-between space-y-2 rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <label
                        htmlFor="consumption"
                        className="text-base font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Verbrauch
                      </label>
                      <p className="text-sm text-muted-foreground">
                        Vergleiche den Stromverbrauch der Schweiz mit der
                        Gesamtproduktion.
                      </p>
                    </div>
                    <Switch
                      id="consumption"
                      checked={showConsumption}
                      onCheckedChange={() => {
                        setShowConsumption(!showConsumption);
                        setShowLosses(false);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="disabled w-full space-y-6">
              <div>
                <div className="space-y-4">
                  <div className="flex flex-row items-center justify-between space-y-2 rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <label
                        htmlFor="losses"
                        className="text-base font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Stromverlust
                      </label>
                      <p className="text-sm text-muted-foreground">
                        Zeige die Verluste welche durch den Transport und
                        aehnlichem entstehen.
                      </p>
                    </div>
                    <Switch
                      id="losses"
                      checked={showLosses}
                      onCheckedChange={() => {
                        setShowLosses(!showLosses);
                      }}
                      disabled={!showConsumption}
                    />
                  </div>
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

"use client";
import AreaChartPlot from "./AreaChartPlot";
import StackedAreaChartPlot from "./StackedAreaChartPlot";

const Charts = () => {
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
          <StackedAreaChartPlot />
        </div>

        <div className="h-[300px] w-1/3 rounded bg-gray-700"></div>
      </section>

      <section className="my-4 flex gap-2 px-4">
        <div className=" h-[250px] w-1/2 rounded bg-gray-700"></div>
        <div className=" h-[250px] w-1/2 rounded bg-gray-700"></div>
      </section>
    </>
  );
};

export default Charts;

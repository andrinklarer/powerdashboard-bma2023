import ResponsiveCharts from "~/components/charts/ResponsiveDashboard.tsx";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <>
      <div className="flex">
        <main className="relative flex-grow">
          <Navbar />
          <ResponsiveCharts />
        </main>
      </div>
    </>
  );
}

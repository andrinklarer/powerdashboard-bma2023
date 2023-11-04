import ResponsiveDashboard from "~/components/charts/ResponsiveDashboard.tsx";
import Navbar from "../components/Navbar";
import Charts from "../components/charts/Charts";

export default function Home() {
  return (
    <>
      <div className="flex">
        <main className="relative flex-grow">
          <Navbar />
          <ResponsiveDashboard />
        </main>
      </div>
    </>
  );
}

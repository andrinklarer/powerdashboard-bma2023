import ResponsiveDashboard from "~/components/dashboard/ResponsiveDashboard";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <>
      <div className="flex">
        <main className="relative flex-grow">
          <Navbar dashboard />
          <ResponsiveDashboard />
        </main>
      </div>
    </>
  );
}

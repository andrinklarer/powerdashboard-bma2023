import Navbar from "../components/Navbar";
import Charts from "../components/Charts";

export default function Home() {
  return (
    <>
      <div className="flex">
        <main className="relative flex-grow">
          <Navbar />
          <Charts />
        </main>
      </div>
    </>
  );
}

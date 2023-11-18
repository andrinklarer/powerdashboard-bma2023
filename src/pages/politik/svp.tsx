import React from "react";
import Navbar from "~/components/Navbar";

const svpContent = {

}

const svp = () => {
  return (
    <>
      <div className="flex">
        <main className="relative flex-grow">
          <Navbar />
          <div className="mt-4"></div>
          <img alt="light mode / dark mode switch" loading="lazy" width="30" height="30" decoding="async" data-nimg="1" />
        </main>
      </div>
    </>
  );
};

export default svp;

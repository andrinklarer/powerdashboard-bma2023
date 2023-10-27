"use client";

import React, { useState } from "react";
import { useTheme } from "next-themes";
import { log } from "console";
import Image from "next/image";

const DarkModeToggleButton = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const [icon, setIcon] = useState(currentTheme === 'dark' ? 'night-mode.svg' : 'sun.svg');

{/* <a href="https://www.flaticon.com/free-icons/night" title="night icons">Night icons created by rsetiawan - Flaticon</a> */}
{/* <a href="https://www.flaticon.com/free-icons/sun" title="sun icons">Sun icons created by Good Ware - Flaticon</a>  */}
return (
    <div>
      <Image
        src={icon}
        width={30}
        height={30}
        alt="light mode / dark mode switch"
        onClick={() => {
          if (theme == "dark") {
            setIcon("sun.svg");
            setTheme("light");
          } else {
            setIcon("night-mode.svg");
            setTheme("dark");
          }
        }}
      />
    </div>
  );
};

export default DarkModeToggleButton;

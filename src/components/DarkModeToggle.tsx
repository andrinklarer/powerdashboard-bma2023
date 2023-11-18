"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { Button } from "./ui/button";

const DarkModeToggleButton = () => {
  const { resolvedTheme, setTheme } = useTheme();

  const [iconPath, setIconPath] = useState("dark/themeToggle.svg");

  useEffect(() => {
    // Set the icon path as soon as provided dynamically based on the resolved theme
    if (resolvedTheme) {
      setIconPath(`${resolvedTheme}/themeToggle.svg`);
    }
  }, [resolvedTheme]);

  return (
    <Button
      variant="ghost"
      className="p-2"
      onClick={() => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
      }}
    >
      <Image
        src={iconPath}
        width={30}
        height={30}
        alt="light mode / dark mode switch"
      />
    </Button>
  );
};

export default DarkModeToggleButton;

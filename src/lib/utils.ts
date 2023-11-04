import { type ClassValue, clsx } from "clsx";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const useIsMobile = (breakpoint = 640) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set state based on breakpoint
      setIsMobile(window.innerWidth < breakpoint);
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]); // Empty array ensures effect is only run on mount and unmount

  return isMobile;
};

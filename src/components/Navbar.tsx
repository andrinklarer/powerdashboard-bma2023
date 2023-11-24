"use client";

import Link from "next/link";

import { Separator } from "./ui/separator";
import DarkModeToggleButton from "./DarkModeToggle";
import { Button } from "./ui/button";
import { boolean } from "zod";

interface NavbarProps {
  home?: boolean;
  dashboard?: boolean;
  politik?: boolean;
}
const Navbar = ({
  home = false,
  dashboard = false,
  politik = false,
}: NavbarProps) => {
  return (
    <>
      <div className="flex justify-between bg-transparentBackground ">
        <div className="flex h-16 items-center space-x-1 px-6 sm:px-12">
          <Link
            href="/"
            legacyBehavior
            passHref
            className="text-md p-2 font-medium hover:text-primary/80"
          >
            <Button
              variant="ghost"
              className={`text-md ${home ? "font-bold" : "font-medium"}`}
            >
              Home
            </Button>
          </Link>
          <Link
            href="/dashboard"
            legacyBehavior
            passHref
            className="p-2 text-sm font-medium hover:text-primary/80"
          >
            <Button
              variant="ghost"
              className={`text-md ${dashboard ? "font-bold" : "font-medium"}`}
            >
              Dashboard
            </Button>
          </Link>

          <Link
            href="/politik"
            legacyBehavior
            passHref
            className="p-2 text-sm font-medium hover:text-primary/80"
          >
            <Button
              variant="ghost"
              className={`text-md ${politik ? "font-bold" : "font-medium"}`}
            >
              Politik
            </Button>
          </Link>
        </div>
        <div className="flex h-16 w-16 items-center gap-4">
          <DarkModeToggleButton />
        </div>
      </div>
      <Separator />
    </>
  );
};

export default Navbar;

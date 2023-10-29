"use client";

import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import { Separator } from "./ui/separator";
import DarkModeToggleButton from "./DarkModeToggle";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <>
      <div className="flex justify-between">
        <div className="flex h-16 items-center space-x-1 px-12">
          <Button variant="ghost" className="text-md font-medium">
            <Link
              href="/"
              legacyBehavior
              passHref
              className="text-md p-2 font-medium hover:text-primary/80"
            >
              Home
            </Link>
          </Button>
          <Button variant="ghost" className="text-md font-medium">
            <Link
              href="/dashboard"
              legacyBehavior
              passHref
              className="p-2 text-sm font-medium hover:text-primary/80"
            >
              Dashboard
            </Link>
          </Button>

          <Button variant="ghost" className="text-md font-medium">
            <Link
              href="/politik"
              legacyBehavior
              passHref
              className="p-2 text-sm font-medium hover:text-primary/80"
            >
              Politik
            </Link>
          </Button>
        </div>
        <div className="flex h-16 items-center gap-4 px-12">
          <DarkModeToggleButton />
        </div>
      </div>
      <Separator />
    </>
  );
};

export default Navbar;

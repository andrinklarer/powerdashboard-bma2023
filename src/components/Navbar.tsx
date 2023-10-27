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

const Navbar = () => {
  return (
    <>
      <div className="flex justify-between">
        <div className="flex h-16 items-center gap-4 px-12">
          <Link
            href="/"
            legacyBehavior
            passHref
            className="p-2 text-sm font-medium hover:text-primary/80"
          >
            Home
          </Link>
          <Link
            href="/dashboard"
            legacyBehavior
            passHref
            className="p-2 text-sm font-medium hover:text-primary/80"
          >
            Dashboard
          </Link>
          <Link
            href="/politik"
            legacyBehavior
            passHref
            className="p-2 text-sm font-medium hover:text-primary/80"
          >
            Politik
          </Link>
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

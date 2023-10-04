"use client";

import { useEffect, useState } from "react";
import { ModeButton } from "./client-buttons";
import { GitHubButton } from "./server-buttons";
import Link from "next/link";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    window.addEventListener("load", scrolled);
    window.addEventListener("scroll", scrolled);

    return () => {
      window.removeEventListener("load", scrolled);
      window.removeEventListener("scroll", scrolled);
    };
  }, []);

  function scrolled() {
    if (window.scrollY >= 1) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  }

  return (
    <div className="sticky top-0">
      <nav
        className={`${
          isScrolled &&
          "bg-opacity-80 backdrop-blur-sm transition duration-300 ease-out dark:bg-opacity-80"
        } flex justify-between bg-green-600 px-4 py-2 shadow-md dark:bg-green-800`}
      >
        <Label />
        <div className="flex items-center gap-2">
          <ModeButton />
          <GitHubButton />
        </div>
      </nav>
    </div>
  );
};

const Label = () => {
  return (
    <Link href="/">
      <p className="text-2xl font-bold text-slate-50 dark:text-green-400">
        Note
        <span className="font-semibold text-slate-200 dark:text-slate-400">
          Set
        </span>
      </p>
    </Link>
  );
};

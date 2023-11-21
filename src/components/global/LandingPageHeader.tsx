"use client";

import { LandingPageButton } from "./LandingPageButton";
import { ThemeButton } from "./ThemeButton";
import { GitHubButton } from "./GitHubButton";
import { useEffect, useState } from "react";

export const LandingPageHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 0 && isScrolled !== true) {
        console.log(window.scrollY);
        setIsScrolled(true);
      }
      if (window.scrollY <= 0) {
        setIsScrolled(false);
      }
    }

    window.addEventListener("load", handleScroll);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("load", handleScroll);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isScrolled]);

  return (
    <div
      className={`pt-safe-top fixed w-full px-4 ${isScrolled && "navbar-blur"}`}
    >
      <div className="flex justify-between border-b border-slate-400/60 py-2 dark:border-slate-800">
        <LandingPageButton />
        <div className="flex items-center gap-4">
          <ThemeButton />
          <GitHubButton />
        </div>
      </div>
    </div>
  );
};

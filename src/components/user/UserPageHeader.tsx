"use client";

import { useState, useEffect } from "react";
import { Logo } from "../../icons/logo";
import { GitHubButton } from "../global/GitHubButton";
import { ThemeButton } from "../global/ThemeButton";
import { LinkButtons } from "./LinkButtons";
import { LogoutButton } from "./LogoutButton";

export const UserPageHeader = () => {
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
      className={`sticky top-0 space-y-4 px-4 py-4 ${
        isScrolled && "navbar-blur"
      }`}
    >
      <HeaderBar />
      <Navbar />
    </div>
  );
};

const HeaderBar = () => {
  return (
    <div className="flex justify-between rounded-[28px] bg-white px-4 py-2 shadow-md dark:bg-slate-800">
      <Logo />
      <div className="flex items-center gap-4">
        <ThemeButton />
        <GitHubButton />
      </div>
    </div>
  );
};

const Navbar = () => {
  return (
    <div className="flex gap-1">
      <LinkButtons />
      <LogoutButton />
    </div>
  );
};

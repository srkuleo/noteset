"use client";

import { useEffect, useState } from "react";
import { LogoSvg } from "./svgs";
import { ModeButton } from "./client-buttons";
import { GitHubButton } from "./server-buttons";

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
    <div className='sticky top-0'>
      <nav
        className={`${
          isScrolled &&
          "bg-opacity-80 backdrop-blur-sm transition duration-300 ease-out dark:bg-opacity-80"
        } bg-green-600 dark:bg-green-800 flex justify-between px-4 py-2 shadow-sm`}
      >
        <Logo />
        <div className="flex gap-2 items-center">
          <ModeButton />
          <GitHubButton />
        </div>
      </nav>
    </div>
  );
};

export const Logo = () => {
  return (
    <div className='flex items-center gap-1'>
      <div className=''>{LogoSvg}</div>
      <span className='text-2xl font-bold text-slate-light50 dark:text-green-light400'>
        Note
        <span className='font-semibold dark:text-slate-light400'>Set</span>
      </span>
    </div>
  );
};

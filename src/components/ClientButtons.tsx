"use client";

import { links } from "@/util/data";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { DarkModeIcon, GoogleSvg, LightModeIcon } from "./Icons";

//Buttons that require any kind of client side action (hooks, libraries based on custom hooks)

export const ThemeButton = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  function toggleMode() {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }

  if (!mounted) {
    return <div className="h-7 w-7 rounded-full bg-slate-500/10" />;
  }

  return (
    <button onClick={toggleMode}>
      {resolvedTheme === "dark" ? LightModeIcon : DarkModeIcon}
    </button>
  );
};

export const GoogleAuthButton = () => {
  return (
    <button className="mb-4 flex w-full items-center justify-center gap-4 rounded-xl bg-slate-50 py-2 shadow-md ring-1 ring-slate-300 dark:bg-slate-200 dark:ring-0">
      {GoogleSvg}
      <p className="text-sm font-semibold italic text-slate-600">
        Continue with Google
      </p>
    </button>
  );
};

export const LinkButtons = () => {
  const path = usePathname();
  const highlight = <div className="mt-[2px] h-[1px] w-5 bg-white" />;

  return (
    <>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`flex grow flex-col items-center justify-center rounded-xl p-2 shadow-md ${
            link.href === path ? "active-page" : "idle-page"
          }`}
        >
          {link.icon}
          {link.href === path && highlight}
        </Link>
      ))}
    </>
  );
};

"use client";

import { links } from "@/util/data";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { DarkModeIcon, LightModeIcon } from "./Icons";

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

export const LinkButtons = () => {
  const path = usePathname();

  return (
    <>
      {links.map((link) => (
        <Link
          key={link.href}
          className={`flex grow flex-col items-center justify-center rounded-xl p-2 shadow-md ${
            link.href === path
              ? "bg-green-500 text-white dark:bg-green-700"
              : "bg-white dark:bg-slate-800"
          }`}
          href={link.href}
        >
          {link.icon}
          {link.href === path && (
            <div className="mt-[2px] h-[1px] w-5 bg-white" />
          )}
        </Link>
      ))}
    </>
  );
};

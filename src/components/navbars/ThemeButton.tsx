"use client";

import { MoonIcon, SunIcon } from "@/icons/navbars/theme";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const ThemeButton = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    console.log("ThemeButton mounted.");
    setIsMounted(true);
  }, []);

  function switchTheme() {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  }

  if (isMounted) {
    return (
      <button onClick={switchTheme}>
        {resolvedTheme === "light" ? <MoonIcon /> : <SunIcon />}
      </button>
    );
  }

  return (
    <div className="h-6 w-6 rounded-full bg-slate-500/40 dark:bg-slate-700/30" />
  );
};

"use client";

import { LightModeIcon, DarkModeIcon } from "@/icons/theme";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export const ThemeButton = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    console.log("ThemeButton mounted.");
    setMounted(true);
  }, []);

  function toggleMode() {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }

  if (mounted) {
    return (
      <button onClick={toggleMode}>
        {resolvedTheme === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
      </button>
    );
  }

  return (
    <div className="h-6 w-6 rounded-full bg-slate-500/30 dark:bg-slate-700/60" />
  );
};

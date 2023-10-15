"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { DarkModeIcon, LightModeIcon } from "./Svgs";

//Buttons that require any kind of client side action (hooks, libs based on custom hooks - state, effect, context)

export const ModeButton = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  function toggleMode() {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }

  if (!mounted) return <></>;

  return (
    <button onClick={toggleMode}>
      {resolvedTheme === "dark" ? (
        <LightModeIcon className="h-7 w-7 text-slate-50" />
      ) : (
        <DarkModeIcon className="h-7 w-7 text-slate-300" />
      )}
    </button>
  );
};

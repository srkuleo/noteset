"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export const ThemeButtonDevMode = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <></>;

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="text-xs font-bold uppercase"
    >
      {resolvedTheme === "dark" ? "Light" : "Dark"}
    </button>
  );
};

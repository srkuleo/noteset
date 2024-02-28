"use client";

import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      enableSystem
      enableColorScheme
      themes={["system", "dark", "light"]}
    >
      {children}
    </ThemeProvider>
  );
}

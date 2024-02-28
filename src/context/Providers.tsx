"use client";

import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      enableSystem={true}
      defaultTheme="system"
      enableColorScheme={true}
      themes={["system", "dark", "light"]}
    >
      {children}
    </ThemeProvider>
  );
}

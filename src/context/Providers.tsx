"use client";

import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";

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
      <Toaster duration={5000} position="bottom-center" />
    </ThemeProvider>
  );
}

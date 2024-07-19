"use client";

import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      themes={["system", "dark", "light"]}
      enableSystem
      disableTransitionOnChange
    >
      {children}
      <Toaster duration={4000} position="bottom-center" />
    </ThemeProvider>
  );
}

"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}

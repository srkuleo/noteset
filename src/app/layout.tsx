import "./globals.css";
import type { Metadata } from "next";
import { Providers } from "../components/providers";

export const metadata: Metadata = {
  title: "Noteset",
  description: "Workout tracking app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

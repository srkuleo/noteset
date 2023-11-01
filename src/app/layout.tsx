import "@/styles/global.css";
import type { Metadata } from "next";
import { Providers } from "../components/Providers";
import { nunito } from "@/styles/fonts";

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
      <body className={`${nunito.className} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

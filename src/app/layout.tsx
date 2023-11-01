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
    <html
      lang="en"
      className={`${nunito.className} antialiased`}
      suppressHydrationWarning
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

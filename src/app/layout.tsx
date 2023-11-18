import { nunito } from "../styles/fonts";
import "../styles/global.css";
import { Providers } from "../context/Providers";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s - Noteset",
    default: "Noteset",
  },
  description:
    "A minimalistic workout tracking PWA aimed to replace conventional usage of a notebook in the gym.",
  metadataBase: new URL("https://noteset.vercel.app"),
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
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

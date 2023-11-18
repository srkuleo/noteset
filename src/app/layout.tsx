import { nunito } from "../styles/fonts";
import "../styles/global.css";
import { Providers } from "../context/Providers";
import type { Metadata } from "next";
import Head from "next/head";

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
          <Head>
            <meta
              name="theme-color"
              media="(prefers-color-scheme: light)"
              content="#cbd5e1"
              key="light"
            />
            <meta
              name="theme-color"
              media="(prefers-color-scheme: dark)"
              content="#020617"
              key="dark"
            />
          </Head>

          {children}
        </Providers>
      </body>
    </html>
  );
}

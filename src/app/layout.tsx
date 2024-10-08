import "@/styles/globals.css";
import { manrope, nunito } from "@/styles/fonts";
import { Providers } from "@/context/Providers";
import { Analytics } from "@vercel/analytics/react";

import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  userScalable: false,
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: {
    template: "%s - Noteset",
    default: "Noteset",
  },
  description:
    "A minimalistic workout tracking PWA aimed to replace conventional usage of a notebook in the gym.",
  metadataBase: new URL("https://noteset.srdjanmilicevic.com"),
  other: { ["mobile-web-app-capable"]: "yes" },
  appleWebApp: {
    title: "Noteset - workout app",
    capable: true,
    statusBarStyle: "black-translucent",
    startupImage: [
      {
        url: "/apple-splash-1170-2532.jpg",
        media:
          "(prefers-color-scheme: light) and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
      },
      {
        url: "/apple-splash-dark-1170-2532.jpg",
        media:
          "(prefers-color-scheme: dark) and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
      },
      {
        url: "/apple-splash-1290-2796.jpg",
        media:
          "(prefers-color-scheme: light) and (device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
      },
      {
        url: "/apple-splash-dark-1290-2796.jpg",
        media:
          "(prefers-color-scheme: dark) and (device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${nunito.variable} ${manrope.variable} overscroll-none scroll-smooth antialiased`}
      suppressHydrationWarning
    >
      <body className="select-none overscroll-none bg-white font-nunito text-slate-500 dark:bg-slate-900 dark:text-white">
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}

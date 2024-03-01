import "@/styles/globals.css";
import type { Metadata, Viewport } from "next";
import { manrope, nunito } from "@/styles/fonts";
import { Providers } from "@/context/Providers";

export const viewport: Viewport = {
  userScalable: false,
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#020617" },
    { media: "(prefers-color-scheme: light)", color: "#e2e8f0" },
  ],
};

export const metadata: Metadata = {
  title: {
    template: "%s - Noteset",
    default: "Noteset",
  },
  description:
    "A minimalistic workout tracking PWA aimed to replace conventional usage of a notebook in the gym.",
  metadataBase: new URL("https://noteset.vercel.app"),
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
      className={`${nunito.variable} ${manrope.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-svh scroll-smooth bg-slate-200 flex font-nunito dark:bg-slate-950">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

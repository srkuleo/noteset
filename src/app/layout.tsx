import "@/styles/global.css";
import type { Metadata, Viewport } from "next";
import { nunito } from "@/styles/fonts";
import { Providers } from "@/context/Providers";

export const viewport: Viewport = {
  userScalable: false,
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#cbd5e1" },
    { media: "(prefers-color-scheme: dark)", color: "#020617" },
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
  icons: {
    icon: "/favicon.ico",
    shortcut: "/shortcut-icon.png",
    apple: "apple-icon.png",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/apple-icon.png",
    },
  },
  openGraph: {
    title: "Noteset - workout app",
    description: "A minimalistic workout tracking PWA",
    url: "https://noteset.vercel.app/",
    siteName: "Noteset",
    images: [
      {
        url: "/noteset-og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    statusBarStyle: "black-translucent",
    capable: true,
    startupImage: [
      {
        url: "/apple-splash-1170-2532.jpeg",
        media:
          "(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
      },
      {
        url: "/apple-splash-dark-1170-2532.jpg",
        media:
          "(prefers-color-scheme: dark) and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
      },
      {
        url: "/apple-splash-1290-2796.jpeg",
        media:
          "(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
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
      className={`${nunito.className} antialiased`}
      suppressHydrationWarning
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

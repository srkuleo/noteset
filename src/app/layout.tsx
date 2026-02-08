import "@/styles/globals.css"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import type { Metadata, Viewport } from "next"
import { Providers } from "@/context/Providers"
import { manrope, nunito } from "@/styles/fonts"
import { generateStartupImages } from "@/util/utils"

export const viewport: Viewport = {
  userScalable: false,
  initialScale: 1,
  viewportFit: "cover",
}

export const metadata: Metadata = {
  title: {
    template: "%s - Noteset",
    default: "Noteset",
  },
  description:
    "A minimalistic workout tracking PWA aimed to replace conventional usage of a notebook in the gym.",
  metadataBase: new URL("https://noteset.srdjanmilicevic.com"),
  other: { "apple-mobile-web-app-capable": "yes" },
  appleWebApp: {
    title: "Noteset - workout app",
    capable: true,
    statusBarStyle: "black-translucent",
    startupImage: generateStartupImages(),
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      data-scroll-behavior="smooth"
      className={`${nunito.variable} ${manrope.variable} overscroll-none scroll-smooth antialiased`}
    >
      <body className="select-none overscroll-none bg-white font-nunito text-slate-500 dark:bg-slate-900 dark:text-white">
        <Providers>{children}</Providers>
        <Analytics debug={false} />
        <SpeedInsights debug={false} />
      </body>
    </html>
  )
}

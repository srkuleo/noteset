import { Inter, Noto_Sans, Nunito, Manrope } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  // variable: "--font-inter"
});

export const noto_sans = Noto_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  // variable: "--font-noto-sans"
});

export const nunito = Nunito({
  subsets: ["latin"],
  display: "swap",
  // variable: "--font-nunito"
});

export const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  // variable: "--font-manrope"
});

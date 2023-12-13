import { LandingPageHeader } from "@/components/navbars/LandingPageHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Landing",
  description: "Landing page for a minimalistic workout tracking PWA",
};

export default function LandingPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen flex-col">
      <LandingPageHeader />
      {children}
    </main>
  );
}

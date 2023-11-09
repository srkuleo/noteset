import { LandingPageHeader } from "@/components/global/LandingPageHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Noteset - login",
  description: "Workout tracking app",
};

export default function LandingPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex h-screen flex-col p-4">
      <LandingPageHeader />
      {children}
    </main>
  );
}

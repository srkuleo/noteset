import { LandingPageHeader } from "@/components/navbars/LandingPageHeader";

export default function LandingPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen flex-col">
      <LandingPageHeader />
      <div className="pt-2 hidden md:block">
        <p className="bg-red-500">Important!</p>
      </div>
      {children}
    </main>
  );
}

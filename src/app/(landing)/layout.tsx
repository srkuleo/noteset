import { LandingPageHeader } from "@/components/navbars/LandingPageHeader";

export default function LandingPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen flex-col overscroll-none">
      <LandingPageHeader />
      <div className="pt bg-red-500">
        <p>Important!</p>
      </div>
      {children}
    </main>
  );
}

import { LandingPageHeader } from "@/components/navbars/LandingPageHeader";

export default function FeedbackPagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen select-none flex-col">
      <LandingPageHeader />
      <div className="flex grow flex-col items-center justify-center gap-12 pt-safe-top">
        {children}
      </div>
    </main>
  );
}

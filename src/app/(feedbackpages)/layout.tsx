import { LandingPageHeader } from "@/components/navbars/LandingPageHeader";

export default function FeedbackPagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen select-none flex-col">
      <LandingPageHeader />
      {children}
    </main>
  );
}

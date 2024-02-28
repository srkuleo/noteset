import { LandingPageBar } from "@/components/landing/LandingPageBar";

export default function FeedbackPagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen touch-none select-none flex-col">
      <LandingPageBar />
      <div className="flex grow flex-col items-center justify-center gap-12 pt-safe-top">
        {children}
      </div>
    </main>
  );
}

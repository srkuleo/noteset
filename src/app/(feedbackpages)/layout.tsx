import { LandingPageBar } from "@/components/landing/LandingPageBar";

export default function FeedbackPagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen touch-none select-none flex-col pt-safe-top">
      <LandingPageBar />
      <div className="flex flex-col items-center gap-12 pt-32">{children}</div>
    </main>
  );
}

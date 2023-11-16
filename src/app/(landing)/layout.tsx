import { LandingPageHeader } from "../../components/global/LandingPageHeader";

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

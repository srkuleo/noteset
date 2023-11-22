import { LandingPageHeader } from "../../components/navbars/LandingPageHeader"; 

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

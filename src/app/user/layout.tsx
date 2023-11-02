import { HeaderBar } from "@/components/HeaderBar";
import { Navbar } from "@/components/Navbar";

export default function UserPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex h-screen flex-col p-4">
      <HeaderBar />
      <Navbar />
      {children}
    </main>
  );
}

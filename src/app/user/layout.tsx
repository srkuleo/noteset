import { HeaderBar } from "@/components/HeaderBar";
import { Navbar } from "@/components/Navbar";

export default function UserNavLayout({
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

import { HeaderBar } from "@/components/HeaderBar";
import { Navbar } from "@/components/Navbar";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <HeaderBar />
      {children}
      <Navbar />
    </main>
  );
}

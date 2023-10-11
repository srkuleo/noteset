import { HeaderBar } from "@/components/headerbar";
import { Navbar } from "@/components/navbar";

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

import { HeaderBar } from "@/components/headerbar";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <HeaderBar />
      {children}
    </main>
  );
}

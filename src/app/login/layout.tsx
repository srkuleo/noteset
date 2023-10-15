import { HeaderBar } from "@/components/HeaderBar";

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

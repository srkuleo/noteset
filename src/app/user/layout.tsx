import { UserPageHeader } from "@/components/UserPageHeader";

export default function UserPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex h-screen flex-col p-4">
      <UserPageHeader />
      {children}
    </main>
  );
}

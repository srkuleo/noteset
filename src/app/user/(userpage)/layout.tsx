import { UserPageHeader } from "@/components/user/UserPageHeader";

export default function UserPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen flex-col">
      <UserPageHeader />
      {children}
    </main>
  );
}

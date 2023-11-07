import { UserPageHeader } from "@/components/user/UserPageHeader";

export default function UserPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex h-screen flex-col px-4 pt-4 pb-8 gap-4">
      <UserPageHeader />
      {children}
    </main>
  );
}

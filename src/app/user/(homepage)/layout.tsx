import { UserPageHeader } from "../../../components/user/UserPageHeader";

export default function UserPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex h-screen flex-col gap-4 px-4 pb-8 pt-4">
      <UserPageHeader />
      {children}
    </main>
  );
}

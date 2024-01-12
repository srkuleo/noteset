import { UserPageHeader } from "@/components/user/UserPageHeader";

export default function UserPagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen flex-col">
      <UserPageHeader />
      <div className="mt-40 flex flex-col px-6 pb-8 pt-safe-top">
        {children}
      </div>
    </main>
  );
}

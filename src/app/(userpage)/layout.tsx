import { UserPageHeader } from "@/components/user/UserPageHeader";

export default function UserPagesLayout({
  children,
}: {
  children: React.ReactNode;
  params: { username: string };
}) {
  return (
    <main vaul-drawer-wrapper="true" className="flex min-h-screen flex-col">
      <UserPageHeader />
      <div className="mt-40 flex flex-col px-6 pb-4 pt-safe-top">
        {children}
      </div>
    </main>
  );
}

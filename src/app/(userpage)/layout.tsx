import { LinkButtons } from "@/components/user/LinkButtons";
import { LogoutButton } from "@/components/user/LogoutButton";
import { UserPageHeader } from "@/components/user/UserPageHeader";

export default function UserPagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-svh select-none flex-col">
      <UserPageHeader />
      <div className="mb-20 px-6 pb-safe-bottom">{children}</div>
      <div className="fixed inset-x-0 bottom-0 border-t border-slate-400/20 bg-slate-300/60 px-3 pb-safe-bottom pt-3 backdrop-blur-lg dark:border-slate-800/80 dark:bg-slate-950/60">
        <div className="mb-3 flex gap-2">
          <LinkButtons />
          <LogoutButton />
        </div>
      </div>
    </main>
  );
}

import { Logo } from "@/components/icons/landing/logo";
import { ThemeButton } from "@/components/landing/ThemeButton";
import { GitHubButton } from "@/components/landing/GitHubButton";
import { LinkButtons } from "@/components/user/LinkButtons";
import { LogoutButton } from "@/components/user/LogoutButton";

export default function UserPagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex grow select-none flex-col pt-safe-top">
      <UserPageHeader />
      <div className="mb-20 px-6 pb-safe-bottom">{children}</div>
      <UserPageNavBar />
    </main>
  );
}

const UserPageHeader = () => {
  return (
    <div className="px-4 pb-4 pt-2">
      <div className="flex justify-between rounded-[28px] bg-white px-4 py-2 shadow-md dark:bg-slate-800">
        <Logo />
        <div className="flex items-center gap-4">
          <ThemeButton />
          <GitHubButton />
        </div>
      </div>
    </div>
  );
};

const UserPageNavBar = () => {
  return (
    <div className="fixed inset-x-0 bottom-0 border-t border-slate-300/60 bg-slate-200/55 px-4 pb-safe-bottom pt-3 backdrop-blur-lg dark:border-slate-800/80 dark:bg-slate-950/55">
      <div className="flex gap-3 pb-3">
        <LinkButtons />
        <LogoutButton />
      </div>
    </div>
  );
};

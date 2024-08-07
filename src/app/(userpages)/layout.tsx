import { redirect } from "next/navigation";
import { getAuth } from "@/util/actions/auth";
import { Logo } from "@/components/icons/logo";
import { ThemeButton } from "@/components/ThemeButton";
import { GitHubButton } from "@/components/GitHubButton";
import { UserPagesNavBar } from "@/components/user/UserPagesNavBar";

export default async function UserPagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await getAuth();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex h-full flex-col pt-safe-top">
      <UserPagesHeader />
      {children}
      <UserPagesNavBar />
    </div>
  );
}

const UserPagesHeader = () => {
  return (
    <header className="px-4 pt-2">
      <div className="relative flex items-center gap-4 rounded-[28px] bg-white px-4 py-2 shadow-md ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700 [&>*:nth-child(1)]:mr-auto">
        {Logo}

        <ThemeButton />
        <GitHubButton />
      </div>
    </header>
  );
};

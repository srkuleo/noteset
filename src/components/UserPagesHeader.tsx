import { Logo } from "./icons/logo";
import { ThemeButton } from "./ThemeButton";
import { GitHubButton } from "./GitHubButton";

export const UserPagesHeader = () => {
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

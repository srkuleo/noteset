import { ThemeButton } from "./ClientButtons";
import { Logo } from "./Icons";
import { GitHubButton } from "./ServerButtons";

export const HeaderBar = () => {
  return (
    <div className="flex justify-between rounded-[28px] bg-white shadow-md px-4 py-2 dark:bg-slate-800 mb-4">
      <Logo />
      <div className="flex items-center gap-4">
        <ThemeButton />
        <GitHubButton />
      </div>
    </div>
  );
};

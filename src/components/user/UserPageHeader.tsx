import { Logo } from "@/icons/navbars/logo";
import { GitHubButton } from "../navbars/GitHubButton";
import { ThemeButton } from "../navbars/ThemeButton";

export const UserPageHeader = () => {
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

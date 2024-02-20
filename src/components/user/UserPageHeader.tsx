import { Logo } from "@/icons/navbars/logo";
import { GitHubButton } from "../navbars/GitHubButton";
import { ThemeButton } from "../navbars/ThemeButton";
import { LinkButtons } from "./LinkButtons";
import { LogoutButton } from "./LogoutButton";

export const UserPageHeader = () => {
  return (
    <div className="fixed w-full bg-slate-300/50 pt-safe-top backdrop-blur-lg dark:bg-slate-950/50">
      <div className="space-y-4 px-4 pb-3 pt-2">
        <div className="flex justify-between rounded-[28px] bg-white px-4 py-2 shadow-md dark:bg-slate-800">
          <Logo />
          <div className="flex items-center gap-4">
            <ThemeButton />
            <GitHubButton />
          </div>
        </div>

        <div className="flex gap-2">
          <LinkButtons />
          <LogoutButton />
        </div>
      </div>
    </div>
  );
};

import { Logo } from "@/icons/navbars/logo";
import { GitHubButton } from "../navbars/GitHubButton";
import { ThemeButton } from "../navbars/ThemeButton";
import { LinkButtons } from "./LinkButtons";
import { LogoutButton } from "./LogoutButton";

export const UserPageHeader = ({ username }: { username: string }) => {
  return (
    <div className="fixed w-full border-b border-slate-300 bg-slate-300/50 pt-safe-top backdrop-blur-xl dark:border-slate-950 dark:bg-slate-950/50">
      <div className="space-y-4 px-4 pb-2 pt-2">
        <div className="flex justify-between rounded-[28px] bg-white px-4 py-2 shadow-md dark:bg-slate-800">
          <Logo />
          <div className="flex items-center gap-4">
            <ThemeButton />
            <GitHubButton />
          </div>
        </div>

        <div className="flex gap-2">
          <LinkButtons username={username} />
          <LogoutButton />
        </div>
      </div>
    </div>
  );
};

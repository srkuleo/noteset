import { Logo } from "../../icons/logo";
import { GitHubButton } from "../global/GitHubButton";
import { ThemeButton } from "../global/ThemeButton";
import { LinkButtons } from "./LinkButtons";
import { LogoutButton } from "./LogoutButton";

export const UserPageHeader = () => {
  return (
    <div className="fixed inset-x-0 bg-slate-300/50 pt-safe-top backdrop-blur-sm dark:bg-slate-950/50">
      <div className="space-y-4 px-4 pt-4 py-2">
        <HeaderBar />
        <Navbar />
      </div>
    </div>
  );
};

const HeaderBar = () => {
  return (
    <div className="flex justify-between rounded-[28px] bg-white px-4 py-2 shadow-md dark:bg-slate-800">
      <Logo />
      <div className="flex items-center gap-4">
        <ThemeButton />
        <GitHubButton />
      </div>
    </div>
  );
};

const Navbar = () => {
  return (
    <div className="flex gap-1">
      <LinkButtons />
      <LogoutButton />
    </div>
  );
};

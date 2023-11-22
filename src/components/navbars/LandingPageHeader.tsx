import Link from "next/link";
import { Logo } from "../../icons/navbars/logo";
import { ThemeButton } from "./ThemeButton";
import { GitHubButton } from "./GitHubButton";

export const LandingPageHeader = () => {
  return (
    <div className="fixed w-full bg-slate-300/80 px-4 pt-safe-top backdrop-blur-sm dark:bg-slate-950/90">
      <div className="flex justify-between border-b border-slate-400/60 pt-4 pb-2 dark:border-slate-800">
        <LandingPageButton />
        <div className="flex items-center gap-4">
          <ThemeButton />
          <GitHubButton />
        </div>
      </div>
    </div>
  );
};

const LandingPageButton = () => {
  return (
    <Link href="/">
      <Logo />
    </Link>
  );
};

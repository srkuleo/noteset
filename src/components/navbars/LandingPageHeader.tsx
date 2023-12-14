import Link from "next/link";
import { Logo } from "@/icons/navbars/logo";
import { ThemeButton } from "./ThemeButton";
import { GitHubButton } from "./GitHubButton";

export const LandingPageHeader = () => {
  return (
    <div className="fixed w-full border-b border-slate-400/50 bg-slate-300/60 px-4 pt-safe-top backdrop-blur-xl dark:border-slate-800/70 dark:bg-slate-950/60">
      <div className="flex justify-between py-2">
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

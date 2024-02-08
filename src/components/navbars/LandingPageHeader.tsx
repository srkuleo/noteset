import Link from "next/link";
import { Logo } from "@/icons/navbars/logo";
import { ThemeButton } from "./ThemeButton";
import { GitHubButton } from "./GitHubButton";

export const LandingPageHeader = () => {
  return (
    <div className="border-b border-slate-400/50 px-4 pt-safe-top dark:border-slate-800/70">
      <div className="flex justify-between py-2">
        <Link href="/">
          <Logo />
        </Link>
        <div className="flex items-center gap-4">
          <ThemeButton />
          <GitHubButton />
        </div>
      </div>
    </div>
  );
};

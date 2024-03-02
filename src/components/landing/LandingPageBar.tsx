import Link from "next/link";
import { Logo } from "../icons/landing/logo";
import { ThemeButton } from "./ThemeButton";
import { GitHubButton } from "./GitHubButton";

export const LandingPageBar = () => {
  return (
    <div className="fixed inset-x-0 top-0 border-b border-slate-300 bg-slate-200/60 px-4 backdrop-blur-md pt-safe-top dark:border-slate-800/90 dark:bg-slate-950/65">
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

import Link from "next/link";
import { Logo } from "../icons/landing/logo";
import { ThemeButton } from "./ThemeButton";
import { GitHubButton } from "./GitHubButton";

export const LandingPageBar = () => {
  return (
    <div className="border-b border-slate-300 px-4 dark:border-slate-800/90">
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

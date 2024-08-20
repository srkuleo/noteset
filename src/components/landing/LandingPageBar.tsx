import Link from "next/link";
import { Logo } from "../icons/logo";
import { ThemeButton } from "../ThemeButton";
import { GitHubButton } from "../GitHubButton";

export const LandingPageBar = () => {
  return (
    <header className="border-b border-slate-400/40 px-4 shadow-xl dark:border-slate-800/90">
      <div className="flex items-center gap-4 py-2 [&>*:nth-child(1)]:mr-auto">
        <Link href="/">{Logo}</Link>

        <ThemeButton />
        <GitHubButton />
      </div>
    </header>
  );
};

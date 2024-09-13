import Link from "next/link";
import { Logo } from "../icons/logo";
import { GitHubButton } from "../GitHubButton";

export const LandingPageBar = () => {
  return (
    <header className="border-b border-slate-400/40 bg-white px-6 py-2 dark:border-slate-800/90 dark:bg-slate-950">
      <div className="flex items-center justify-between">
        <Link href="/">{Logo}</Link>

        <GitHubButton />
      </div>
    </header>
  );
};

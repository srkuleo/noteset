import Link from "next/link";
import { Logo } from "../icons/logo";
import { ThemeButtonDevMode } from "../ThemeButtonDevMode";
import { GitHubButton } from "../GitHubButton";

export const LandingPageBar = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  return (
    <header className="border-b border-slate-400/40 px-6 py-2 dark:border-slate-800/90 md:border-b-0">
      <div className="flex items-center justify-between">
        <Link href="/">{Logo}</Link>

        <div className="flex items-center gap-4">
          {children}

          {process.env.NODE_ENV === "development" && <ThemeButtonDevMode />}

          <GitHubButton />
        </div>
      </div>
    </header>
  );
};

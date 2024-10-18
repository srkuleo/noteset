import Link from "next/link";
import { Suspense } from "react";
import { Logo } from "../icons/logo";
import { LoadingLoginButtonSkeleton } from "../Loading";
import { ProfileButton } from "../user/profile/ProfileButton";
import { GitHubButton } from "../GitHubButton";

export const LandingPageBar = () => {
  return (
    <header className="border-b border-slate-400/40 px-6 py-2 dark:border-slate-800/90 md:border-b-0">
      <div className="flex items-center justify-between">
        <Link href="/">{Logo}</Link>

        <div className="flex items-center gap-4">
          <Suspense fallback={<LoadingLoginButtonSkeleton />}>
            <ProfileButton />
          </Suspense>

          <GitHubButton />
        </div>
      </div>
    </header>
  );
};

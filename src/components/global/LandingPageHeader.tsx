import { LandingPageButton } from "./LandingPageButton";
import { ThemeButton } from "./ThemeButton";
import { GitHubButton } from "./GitHubButton";

export const LandingPageHeader = () => {
  return (
    <div className="sticky top-4 flex justify-between border-b border-slate-400/60 pb-2 dark:border-slate-700">
      <LandingPageButton />
      <div className="flex items-center gap-4">
        <ThemeButton />
        <GitHubButton />
      </div>
    </div>
  );
};

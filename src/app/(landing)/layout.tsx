import { LandingPageButton } from "@/components/ServerButtons";
import { ThemeButton } from "@/components/ClientButtons";
import { GitHubButton } from "@/components/ServerButtons";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex h-screen flex-col p-4">
      <div className="flex justify-between border-b border-slate-400/60 pb-2 dark:border-slate-700">
        <LandingPageButton />
        <div className="flex items-center gap-4">
          <ThemeButton />
          <GitHubButton />
        </div>
      </div>

      {children}
    </main>
  );
}

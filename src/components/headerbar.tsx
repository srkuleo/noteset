import { ModeButton } from "./ClientButtons";
import { GitHubButton } from "./ServerButtons";
import Link from "next/link";

export const HeaderBar = () => {
  return (
    <div className="sticky top-0">
      <nav className="flex justify-between bg-green-600 px-4 py-2 shadow-sm dark:bg-green-800">
        <Label />
        <div className="flex items-center gap-2">
          <ModeButton />
          <GitHubButton />
        </div>
      </nav>
    </div>
  );
};

const Label = () => {
  return (
    <Link href="/">
      <p className="text-2xl font-bold text-slate-50 dark:text-green-400">
        Note
        <span className="font-semibold text-slate-300 dark:text-slate-50">
          Set
        </span>
      </p>
    </Link>
  );
};

import Link from "next/link";
import { LandingPageBar } from "@/components/landing/LandingPageBar";
import { SadIcon } from "@/components/icons/user/warning";

export default function NotFound() {
  return (
    <main className="flex min-h-screen touch-none select-none flex-col pt-safe-top">
      <LandingPageBar />
      <div className="flex grow flex-col items-center justify-center gap-8 px-4 pb-8">
        <div className="text-slate-400/60 dark:text-slate-700/80">
          {SadIcon}
        </div>

        <div className="space-y-2 text-center">
          <h2 className="text-xl font-semibold dark:text-slate-300">
            404 Page could not be found
          </h2>
          <p className="text-sm text-slate-400 dark:text-slate-500">
            Invalid URL
          </p>
        </div>

        <Link
          href="/"
          className="rounded-xl bg-violet-500 px-3 py-2 font-semibold text-white shadow-sm dark:bg-violet-600"
        >
          Go back
        </Link>
      </div>
    </main>
  );
}

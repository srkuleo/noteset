"use client";

import Link from "next/link";
import { useEffect } from "react";
import { LandingPageBar } from "@/components/landing/LandingPageBar";
import { SadIcon } from "@/components/icons/user/warning";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen touch-none select-none flex-col pt-safe-top">
      <LandingPageBar />
      <div className="flex grow flex-col items-center justify-center gap-8 px-4 pb-8">
        <div className="text-slate-400/60 dark:text-slate-700/80">
          {SadIcon}
        </div>

        <div className="space-y-2 text-center">
          <h2 className="text-xl font-semibold dark:text-slate-300">
            Sorry, something went wrong!
          </h2>
          <p className="text-sm text-slate-400 dark:text-slate-500">
            {error.message}
          </p>
        </div>

        <div className="flex flex-col items-center gap-2">
          <Link
            href="/"
            className="rounded-xl bg-violet-500 px-8 py-2 font-semibold text-white shadow-sm dark:bg-violet-600"
          >
            Go back
          </Link>
          <button
            className="w-fit rounded-xl px-4 py-2 text-sm font-semibold active:bg-slate-200 dark:text-slate-300 active:dark:bg-slate-800"
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => reset()
            }
          >
            Try again!
          </button>
        </div>
      </div>
    </main>
  );
}

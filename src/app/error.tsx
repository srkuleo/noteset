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
    <div className="flex h-full flex-col pt-safe-top">
      <LandingPageBar />

      <main className="flex flex-col items-center justify-center gap-6 pb-16">
        <div className="text-slate-400/70 dark:text-slate-700">{SadIcon}</div>

        <h3 className="pb-8 font-manrope text-slate-600">
          Sorry, something went wrong...
        </h3>

        <div className="flex flex-col items-center gap-4">
          <Link
            href="/workouts"
            className="rounded-xl bg-violet-500 px-8 py-2 font-semibold text-white shadow-sm active:scale-95 dark:bg-violet-600"
          >
            Back to homepage
          </Link>

          <button
            className="rounded-xl px-4 py-2 text-sm font-semibold active:bg-slate-200 dark:text-slate-300 active:dark:bg-slate-800"
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => reset()
            }
          >
            Try again!
          </button>
        </div>
      </main>
    </div>
  );
}

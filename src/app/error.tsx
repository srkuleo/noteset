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
    <>
      <div className="fixed inset-x-0 top-0 bg-white pt-safe-top dark:bg-slate-900">
        <LandingPageBar />
      </div>

      <main className="mt-safe-top flex px-8 py-20">
        <div className="flex grow flex-col items-center justify-center gap-6">
          <div className="text-slate-400/70 dark:text-slate-700">{SadIcon}</div>

          <h3 className="pb-8 font-manrope text-slate-600">
            Sorry, something went wrong...
          </h3>

          <div className="flex flex-col items-center gap-4">
            <Link
              href="/home"
              className="rounded-xl bg-violet-500 px-4 py-2 font-semibold text-white shadow-sm transition active:scale-90 active:bg-violet-400 dark:bg-violet-600 dark:active:bg-violet-800"
            >
              Go to Home page
            </Link>

            <button
              className="rounded-xl px-4 py-2 text-sm font-semibold active:bg-slate-300 dark:text-slate-300 active:dark:bg-slate-800"
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
    </>
  );
}

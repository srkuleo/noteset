"use client";

import { useTransition } from "react";
import { LandingPageBar } from "@/components/landing/LandingPageBar";
import { SadIcon } from "@/components/icons/user/warning";
import { useRouter } from "next/navigation";

export default function Error({ reset }: { reset: () => void }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
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

          <button
            disabled={isPending}
            onClick={() => {
              startTransition(() => {
                router.refresh();
                reset();
              });
            }}
            className="rounded-lg bg-violet-500 px-5 py-2 font-semibold text-white shadow-sm transition active:scale-90 active:bg-violet-400 disabled:pointer-events-none disabled:opacity-50 dark:bg-violet-600 dark:active:bg-violet-800"
          >
            {isPending ? "Recovering..." : "Try again"}
          </button>
        </div>
      </main>
    </>
  );
}

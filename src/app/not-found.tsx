import Link from "next/link";
import { LandingPageBar } from "@/components/landing/LandingPageBar";
import { SadIcon } from "@/components/icons/user/warning";

export default function NotFound() {
  return (
    <>
      <div className="fixed inset-x-0 top-0 bg-white pt-safe-top dark:bg-slate-900">
        <LandingPageBar />
      </div>

      <main className="mt-safe-top flex px-8 py-20">
        <div className="flex grow flex-col items-center justify-center gap-6">
          <div className="text-slate-400/70 dark:text-slate-700">{SadIcon}</div>

          <div className="space-y-2 pb-2 text-center">
            <h3 className="font-manrope text-slate-600">
              404 Page could not be found
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Invalid URL
            </p>
          </div>

          <Link
            href="/home?q=current"
            className="rounded-lg bg-violet-500 px-4 py-2 font-semibold text-white shadow-sm transition active:scale-90 active:bg-violet-400 dark:bg-violet-600 dark:active:bg-violet-800"
          >
            Go to Home page
          </Link>
        </div>
      </main>
    </>
  );
}

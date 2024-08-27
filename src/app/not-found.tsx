import Link from "next/link";
import { LandingPageBar } from "@/components/landing/LandingPageBar";
import { SadIcon } from "@/components/icons/user/warning";

export default function NotFound() {
  return (
    <div className="flex h-full flex-col pt-safe-top">
      <LandingPageBar />

      <main className="flex flex-col items-center justify-center gap-6 pb-16">
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
          href="/home"
          className="rounded-xl bg-violet-500 px-3 py-2 font-semibold text-white shadow-sm dark:bg-violet-600"
        >
          Go to Home page
        </Link>
      </main>
    </div>
  );
}

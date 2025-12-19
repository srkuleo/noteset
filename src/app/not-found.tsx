import Link from "next/link"
import { SadIcon } from "@/components/icons/user/warning"
import { LandingPageBar } from "@/components/landing/LandingPageBar"

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
            <h3 className="font-manrope text-slate-600">404 - Page not found</h3>
            <p className="text-slate-500 text-sm dark:text-slate-400">Invalid URL</p>
          </div>

          <Link
            href="/home"
            className="rounded-lg bg-violet-500 px-4 py-2 font-semibold text-white shadow-sm transition active:scale-90 active:bg-violet-400 dark:bg-violet-600 dark:active:bg-violet-800"
          >
            Go to Home page
          </Link>
        </div>
      </main>
    </>
  )
}

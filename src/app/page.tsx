import Link from "next/link"
import { ArrowRightIcon } from "@/components/icons/arrows"
import { LandingPageBar } from "@/components/landing/LandingPageBar"
import { UIMessage } from "@/components/landing/UIMessage"
import { LandingPageTooltip } from "@/components/Tooltips"

export default async function LandingPage() {
  return (
    <>
      <div className="fixed inset-x-0 top-0 bg-white pt-safe-top dark:bg-slate-900">
        <LandingPageBar>
          <Link
            href="/login"
            className="rounded-lg bg-gradient-to-r from-violet-400 to-violet-500 px-3 py-1 font-semibold text-white shadow-md transition active:scale-95 active:from-violet-300 active:to-violet-400 dark:from-violet-500 dark:to-violet-600 dark:active:from-violet-700 dark:active:to-violet-800"
          >
            Login
            <p className="sr-only">Login button</p>
          </Link>
        </LandingPageBar>

        <UIMessage />
      </div>

      <main className="mt-safe-top flex px-8 pt-[81px] md:pt-[125px]">
        <div className="flex grow flex-col items-center justify-center pb-28 md:pb-36">
          <h1 className="bg-gradient-to-r from-green-400 to-violet-500 bg-clip-text pb-6 font-extrabold text-7xl text-transparent dark:to-violet-600">
            Note<span className="font-bold">Set</span>
          </h1>

          <h2 className="text-pretty pb-12 text-center font-semibold text-lg text-slate-500/90 leading-snug md:text-balance dark:text-slate-400">
            A personalized and minimalistic PWA designed to replace a notebook in the gym
          </h2>

          <div className="flex justify-center gap-4">
            <LandingPageTooltip />

            <div className="w-[1px] bg-slate-300/60 dark:bg-slate-800" />

            <Link
              href="/sign-up"
              className="flex items-center gap-1 rounded-full border-slate-300/70 border-l px-4 py-2 font-manrope font-semibold text-slate-600 active:scale-95 active:bg-slate-50 dark:border-slate-800 dark:text-slate-300 active:dark:bg-slate-800"
            >
              Join {ArrowRightIcon}
              <p className="sr-only">Sign-up button</p>
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}

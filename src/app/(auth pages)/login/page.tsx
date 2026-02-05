import type { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"
import { LoginForm } from "@/components/auth/LoginForm"
import { PWATooltip } from "@/components/Tooltips"
import { getAuthSession } from "@/util/session"

export const metadata: Metadata = {
  title: "Login",
}

export default async function LoginPage() {
  const { user } = await getAuthSession()

  if (user) {
    redirect("/current")
  }

  return (
    <>
      <h1 className="bg-gradient-to-r from-0% from-green-200 via-25% via-green-400 to-100% to-violet-600 bg-clip-text text-center font-extrabold text-[60px] text-transparent leading-none dark:from-green-300 dark:via-green-500 dark:to-violet-600">
        Note<span className="font-bold">Set</span>
      </h1>

      <h2 className="text-center font-semibold text-slate-500/90 dark:text-slate-400">
        Your personal replacement for a notebook in the gym
      </h2>

      <div className="mb-8 flex justify-center gap-4 border-b border-b-slate-300/60 py-8 dark:border-b-slate-800">
        <PWATooltip />

        <div className="w-[1px] bg-slate-300/60 dark:bg-slate-800" />

        <Link
          href="/sign-up"
          className="rounded-full px-4 py-2 font-bold font-manrope text-green-500 active:scale-95 active:bg-white active:shadow-md dark:text-green-400 dark:active:bg-slate-800 dark:active:shadow-slate-700"
        >
          Join now
          <p className="sr-only">Sign-up button</p>
        </Link>
      </div>

      <LoginForm />

      <div className="flex gap-2 pt-4 text-sm">
        <p>Forgot password?</p>
        <Link href="/" className="font-semibold text-green-500 italic dark:text-green-400">
          Reset here.
        </Link>
      </div>
    </>
  )
}

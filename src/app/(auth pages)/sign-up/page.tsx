import type { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"
import { SignUpForm } from "@/components/auth/SignUpForm"
import { getAuthSession } from "@/util/session"

export const metadata: Metadata = {
  title: "Sign Up",
}

export default async function SignUpPage() {
  const { user } = await getAuthSession()

  if (user) {
    redirect("/current")
  }

  return (
    <>
      <h2 className="pb-8 font-semibold text-[26px] leading-none">Create an account</h2>

      <SignUpForm />

      <div className="flex gap-2 pt-4 text-sm">
        <p>Already have an account?</p>
        <Link href="/login" className="font-semibold text-green-500 italic dark:text-green-400">
          Login here.
        </Link>
      </div>
    </>
  )
}

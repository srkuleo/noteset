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
    redirect("/home")
  }

  return (
    <div className="w-full space-y-6 px-7 pt-[84px] sm:px-[150px] md:px-[200px] lg:px-[300px] xl:px-[450px] 2xl:px-[500px]">
      <h2 className="font-semibold text-[26px]">Create an account</h2>

      <SignUpForm />

      <div className="flex gap-2 text-sm">
        <p>Already have an account?</p>
        <Link href="/login" className="font-semibold text-green-500 italic dark:text-green-400">
          Login here.
        </Link>
      </div>
    </div>
  )
}

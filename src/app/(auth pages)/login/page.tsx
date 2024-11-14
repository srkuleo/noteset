import Link from "next/link";
import { redirect } from "next/navigation";
import { getAuthSession } from "@/util/session";
import { LoginForm } from "@/components/auth/LoginForm";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};

export default async function LoginPage() {
  const { user } = await getAuthSession();

  if (user) {
    redirect("/home?q=current");
  }

  return (
    <div className="w-full space-y-6 px-7 pt-[84px] sm:px-[150px] md:px-[200px] lg:px-[300px] xl:px-[450px] 2xl:px-[550px]">
      <h2 className="text-[26px] font-semibold">Hey, welcome back!</h2>

      <LoginForm />

      <div className="space-y-2">
        <div className="flex gap-2 text-sm">
          <p>Forgot password?</p>
          <Link
            href="/"
            className="font-semibold italic text-green-500 dark:text-green-400"
          >
            Reset here.
          </Link>
        </div>

        <div className="flex gap-2 text-sm">
          <p>New to Noteset?</p>
          <Link
            href="/sign-up"
            className="font-semibold italic text-green-500 dark:text-green-400"
          >
            Sign up here.
          </Link>
        </div>
      </div>
    </div>
  );
}

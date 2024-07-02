import Link from "next/link";
import { SignUpForm } from "@/components/auth/SignUpForm";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default async function RegisterPage() {
  return (
    <div className="space-y-6 px-7 sm:px-[150px] md:px-[200px] lg:px-[300px] xl:px-[450px] 2xl:px-[500px]">
      <h2 className="text-[26px] font-semibold">Create an account</h2>

      <SignUpForm />

      <div className="flex gap-2 text-sm">
        <p>Already have an account?</p>
        <Link
          href="/login"
          className="font-semibold italic text-green-500 dark:text-green-400"
        >
          Login here.
        </Link>
      </div>
    </div>
  );
}

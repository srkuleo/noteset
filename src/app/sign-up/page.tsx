import { OAuth } from "@/components/oauth";
import { Separator } from "@/components/separator";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="px-12 pt-32">
      <p className="mb-8 text-lg font-bold italic text-slate-500 dark:text-slate-300/90">
        Sign up, start your journey today!
      </p>

      <OAuth />

      <Separator />

      <form action="" className="flex flex-col gap-2">
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Username"
          required
          className="input-field"
        />
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          autoFocus
          required
          className="input-field"
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          required
          className="input-field"
        />
        <input
          type="password"
          name="cpassword"
          id="cpassowrd"
          placeholder="Confirm password"
          required
          className="input-field"
        />
        <div className="mb-4"></div>
        <button
          type="submit"
          className="mb-4 rounded-3xl bg-green-500 p-3 text-center font-semibold text-slate-50 shadow-md dark:bg-green-700 dark:ring-2 dark:ring-inset dark:ring-green-500"
        >
          Sign up
        </button>
      </form>

      <p className="pb-4 text-xs text-slate-500 dark:text-slate-300/90">
        Already have an account? Login{" "}
        <Link
          href="/login"
          className="border-b border-green-500 text-sm font-semibold text-green-500"
        >
          here.
        </Link>
      </p>
    </div>
  );
}

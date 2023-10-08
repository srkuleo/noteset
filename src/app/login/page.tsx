import { SubmitFormBtn } from "@/components/form-button";
import { OAuth } from "@/components/oauth";
import { Separator } from "@/components/separator";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="px-12 pt-32">
      <p className="mb-8 text-lg font-bold italic text-slate-500 dark:text-slate-300/90">
        Login, set new records!
      </p>

      <OAuth />

      <Separator />

      <form action="" className="flex flex-col gap-2">
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
        <div className="flex items-center gap-2 py-4">
          <input
            type="checkbox"
            id="remember-me"
            name="remember-me"
            className="h-5 w-5 accent-green-500 dark:accent-green-600"
          />
          <label
            htmlFor="remember-me"
            className="text-xs text-slate-600 dark:text-slate-300"
          >
            Stay logged in
          </label>
        </div>
        <SubmitFormBtn>Login</SubmitFormBtn>
      </form>

      <div className="space-y-2 pb-4 text-xs text-slate-500 dark:text-slate-300/90">
        <p>
          Forgot your{" "}
          <Link
            href="/"
            className="border-b border-green-500 text-sm font-semibold text-green-500"
          >
            password?
          </Link>
        </p>
        <p>
          New to Noteset? Sign up{" "}
          <Link
            href="/sign-up"
            className="border-b border-green-500 text-sm font-semibold text-green-500"
          >
            here.
          </Link>
        </p>
      </div>
    </div>
  );
}

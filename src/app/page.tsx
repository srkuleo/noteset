import { ModeButton } from "@/components/client-buttons";
import { GitHubButton } from "@/components/server-buttons";
import Link from "next/link";

export default function Home() {
  return (
    <main className="p-4">
      <div className="mb-56 flex justify-end gap-4 border-b border-slate-400/60 pb-4 dark:border-slate-700">
        <ModeButton />
        <GitHubButton />
      </div>

      <h1 className="mb-8 pl-8 text-5xl font-bold text-green-500 dark:text-green-600">
        Note<span className="font-semibold text-slate-500">Set</span>
      </h1>
      <h2 className="mb-12 pl-4 font-semibold text-slate-400 dark:text-slate-500/90">
        Application aimed to replace conventional use of a notebook in a gym.
      </h2>

      <div className="mb-8 flex justify-evenly">
        <Link
          href="/login"
          className="rounded-3xl bg-gradient-to-r from-white to-slate-100 px-6  py-2 font-semibold text-slate-600 shadow-md ring-1 ring-inset ring-slate-400/60"
        >
          Login
        </Link>
        <Link
          href="/sign-up"
          className="rounded-3xl bg-gradient-to-r from-green-500 to-green-600 px-6 py-2 text-slate-50 shadow-md dark:from-green-600 dark:to-green-700"
        >
          Sign Up
        </Link>
      </div>
    </main>
  );
}

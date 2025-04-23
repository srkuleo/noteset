import Link from "next/link";
import { LandingPageBar } from "@/components/landing/LandingPageBar";
import { ErrorTriangleIcon } from "@/components/icons/user/warning";

export default function UnauthorizedPage() {
  return (
    <>
      <div className="fixed inset-x-0 top-0 bg-white pt-safe-top dark:bg-slate-900">
        <LandingPageBar />
      </div>

      <main className="mt-safe-top flex px-8 py-20">
        <div className="flex grow flex-col items-center justify-center gap-6">
          <div className="text-slate-400/70 dark:text-slate-700">
            <ErrorTriangleIcon strokeWidth={1.5} className="size-14" />
          </div>

          <div className="space-y-2 pb-2 text-center">
            <h3 className="font-manrope text-slate-600">401 - Unauthorized</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              You are not logged in
            </p>
          </div>

          <Link
            href="/login"
            className="rounded-lg bg-violet-500 px-6 py-1.5 font-semibold text-white shadow-sm transition active:scale-90 active:bg-violet-400 dark:bg-violet-600 dark:active:bg-violet-800"
          >
            Login
          </Link>
        </div>
      </main>
    </>
  );
}

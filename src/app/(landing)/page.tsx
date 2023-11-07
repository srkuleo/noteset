import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex grow flex-col justify-center">
      <div className="mb-16 pl-4">
        <h1 className="mb-8 pl-4 text-5xl font-extrabold text-green-500 dark:text-green-600">
          Note<span className="font-semibold italic text-slate-500">Set</span>
        </h1>
        <h2 className="font-semibold text-slate-400 dark:text-slate-500">
          Application aimed to replace conventional use of a notebook in a gym.
        </h2>
      </div>

      <div className="mb-8 flex justify-center gap-12">
        <Link
          href="/login"
          className="rounded-3xl bg-gradient-to-r from-white to-slate-100 px-6  py-2 font-semibold text-slate-600 shadow-md ring-1 ring-inset ring-slate-400/60"
        >
          Login
        </Link>
        <Link
          href="/register"
          className="rounded-3xl bg-gradient-to-r from-green-500 to-green-600 px-6 py-2 text-slate-50 shadow-md dark:from-green-600 dark:to-green-700"
        >
          Register
        </Link>
      </div>
    </div>
  );
}

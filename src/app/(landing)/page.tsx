import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex grow flex-col justify-center px-4 pb-8 pt-20">
      <div className="space-y-8 pb-16 pl-4">
        <h1 className="pl-2 text-5xl font-extrabold text-green-500 dark:text-green-600">
          Note<span className="font-semibold italic text-slate-500">Set</span>
        </h1>
        <h2 className="font-semibold dark:text-slate-400">
          Personalized workout tracking PWA, aimed to replace conventional use
          of a notebook in a gym. Made by someone who used to bring one to the
          gym.
        </h2>
      </div>

      <div className="flex flex-col items-center justify-center gap-2 text-center">
        <Link
          href="/login"
          className="w-[120px] rounded-2xl bg-gradient-to-r from-white to-slate-50 py-2 font-semibold text-slate-600 shadow-md ring-1 ring-inset ring-slate-400/80 transition active:scale-95"
        >
          Login
        </Link>
        <p className="text-sm font-bold italic text-slate-500/70 dark:text-slate-400/70">
          or
        </p>
        <Link
          href="/register"
          className="w-[120px] rounded-2xl bg-gradient-to-r from-green-500 to-green-600 py-2 text-white shadow-md transition active:scale-95 dark:from-green-600 dark:to-green-700"
        >
          Register
        </Link>
      </div>
    </div>
  );
}

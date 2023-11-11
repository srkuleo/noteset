import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex grow flex-col justify-center">
      <div className="mb-16 pl-4">
        <h1 className="mb-8 pl-4 text-5xl font-extrabold text-green-500 dark:text-green-600">
          Note<span className="font-semibold italic text-slate-500">Set</span>
        </h1>
        <h2 className="font-semibold text-slate-400 dark:text-slate-500">
          Personalized workout tracking PWA, aimed to replace conventional use of a notebook in a gym. Made by someone who used to bring one to the gym. 
        </h2>
      </div>

      <div className="mb-8 flex flex-col items-center justify-center gap-2 text-center">
        <Link
          href="/login"
          className="w-[120px] rounded-2xl bg-gradient-to-r from-white to-slate-100 px-6 py-2 font-semibold text-slate-600 shadow-md ring-1 ring-inset ring-slate-400/60 transition active:scale-95"
        >
          Login
        </Link>
        <p className="text-sm italic text-slate-400/70 dark:text-slate-500/90">
          or
        </p>
        <Link
          href="/register"
          className="w-[120px] rounded-2xl bg-gradient-to-r from-green-500 to-green-600 px-6 py-2 text-slate-50 shadow-md transition active:scale-95 dark:from-green-600 dark:to-green-700"
        >
          Register
        </Link>
      </div>
    </div>
  );
}

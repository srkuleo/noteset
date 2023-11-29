import Link from "next/link";
import { manrope } from "@/styles/fonts";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function LandingPage() {
  const session = await auth();

  if (session?.user) {
    redirect("/user/home");
  }

  return (
    <div className="pt-18 flex grow flex-col justify-center px-4 pb-8">
      <div className="space-y-8 pb-16 pl-4">
        <h1 className="w-fit bg-gradient-to-r from-green-400 to-violet-500 bg-clip-text pl-2 text-6xl font-extrabold text-transparent dark:from-green-500 dark:to-violet-600">
          Note<span className="font-bold">Set</span>
        </h1>
        <h2
          className={`${manrope.className} font-semibold dark:text-slate-400`}
        >
          Personalized workout tracking PWA, aimed to replace conventional use
          of a notebook in a gym. Made by someone who used to bring one to the
          gym.
        </h2>
      </div>

      <div className="flex flex-col items-center justify-center gap-2 text-center">
        <Link
          href="/api/auth/signin"
          className="w-[120px] rounded-2xl bg-violet-500/90 py-2 font-semibold text-white shadow-md transition active:scale-95"
        >
          Login
        </Link>
        <p className="text-sm font-bold italic text-slate-500/70 dark:text-slate-400/70">
          or
        </p>
        <Link
          href="/register"
          className="w-[120px] rounded-2xl bg-green-500 py-2 font-semibold text-white shadow-md transition active:scale-95 dark:bg-green-600"
        >
          Register
        </Link>
      </div>
    </div>
  );
}

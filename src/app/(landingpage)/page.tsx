import Link from "next/link";
import { redirect } from "next/navigation";
import { getAuth } from "@/util/actions/auth";
import { TooltipDrawer } from "@/components/landing/TooltipDrawer";
import { ArrowIcon } from "@/components/icons/landing/arrow";

export default async function LandingPage() {
  const { user } = await getAuth();

  if (user) {
    redirect("/workouts");
  }

  return (
    <>
      <h1 className="mx-auto bg-gradient-to-r from-green-400 to-violet-500 bg-clip-text pb-6 text-7xl font-extrabold text-transparent dark:to-violet-600">
        Note<span className="font-bold">Set</span>
      </h1>

      <h2 className="text-pretty pb-12 text-center text-lg font-semibold leading-snug dark:text-slate-400 md:text-balance">
        Personalized workout tracking PWA, aimed to replace a notebook in the
        gym.
      </h2>

      <div className="flex justify-center gap-4">
        <TooltipDrawer />

        <div className="w-[1px] bg-slate-300/50 dark:bg-slate-700/80" />

        <Link
          href="/login"
          className="flex items-center gap-1 rounded-full px-4 py-2 font-manrope font-semibold text-slate-600 active:bg-slate-200 dark:text-slate-300 active:dark:bg-slate-800"
        >
          Join {ArrowIcon}
        </Link>
      </div>
    </>
  );
}

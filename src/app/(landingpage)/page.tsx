import { redirect } from "next/navigation";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { TooltipDrawer } from "@/components/landing/TooltipDrawer";
import { ArrowIcon } from "@/components/icons/landing/arrow";

export default async function LandingPage() {
  const { isAuthenticated } = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();

  isLoggedIn && redirect("/workouts");

  return (
    <div className="pt-40 flex flex-col px-8 pb-8">
      <h1 className="mx-auto w-fit bg-gradient-to-r from-green-400 to-violet-500 bg-clip-text pb-8 text-7xl font-extrabold text-transparent dark:to-violet-600">
        Note<span className="font-bold">Set</span>
      </h1>

      <h2 className="pb-16 text-center font-semibold leading-snug dark:text-slate-400 md:text-balance">
        Personalized workout tracking PWA, aimed to replace a notebook in the
        gym.
      </h2>

      <div className="flex justify-center gap-4">
        <TooltipDrawer />

        <div className="w-[1px] bg-slate-300/50 dark:bg-slate-700/80" />

        <LoginLink className="flex items-center gap-1 rounded-full px-4 py-2 font-manrope text-slate-600 active:bg-slate-200 dark:text-slate-300 active:dark:bg-slate-800">
          Login {ArrowIcon}
        </LoginLink>
      </div>
    </div>
  );
}

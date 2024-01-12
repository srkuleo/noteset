import { manrope } from "@/styles/fonts";
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function LandingPage() {
  const { isAuthenticated } = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();

  isLoggedIn && redirect("/workouts");

  return (
    <div className="flex grow select-none flex-col justify-center px-4 pb-8">
      <div className="space-y-8 pb-16 pl-4">
        <h1 className="w-fit select-none bg-gradient-to-r from-green-400 to-violet-500 bg-clip-text pl-2 text-6xl font-extrabold text-transparent dark:from-green-500 dark:to-violet-600">
          Note<span className="font-bold">Set</span>
        </h1>
        <h2
          className={`${manrope.className} select-none font-semibold dark:text-slate-400`}
        >
          Personalized workout tracking PWA, aimed to replace conventional use
          of a notebook in a gym. Made by someone who used to bring one to the
          gym.
        </h2>
      </div>

      <div className="flex flex-col items-center justify-center gap-2 text-center">
        <LoginLink className="w-[120px] select-none rounded-2xl bg-violet-500/90 py-2 font-semibold text-white shadow-md transition active:scale-95">
          Login
        </LoginLink>
        <p className="text-sm italic dark:text-slate-400">or</p>
        <RegisterLink className="w-[120px] select-none rounded-2xl bg-green-500 py-2 font-semibold text-white shadow-md transition active:scale-95 dark:bg-green-600">
          Register
        </RegisterLink>
      </div>
    </div>
  );
}

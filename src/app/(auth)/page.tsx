import { LoginForm } from "@/components/login/LoginForm";
import { manrope } from "@/styles/fonts";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const { isAuthenticated } = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();

  isLoggedIn && redirect("/workouts");

  return (
    <div className="flex grow flex-col px-8 pb-8 pt-16">
      <HeroText />
      <LoginForm />
    </div>
  );
}

const HeroText = () => {
  return (
    <div className="space-y-5 pb-16 text-center">
      <h1 className="mx-auto w-fit bg-gradient-to-r from-green-500 to-violet-500 bg-clip-text text-6xl font-extrabold text-transparent dark:to-violet-600">
        Note<span className="font-bold">Set</span>
      </h1>
      <h2
        className={`${manrope.className} font-semibold dark:text-slate-400 md:text-balance`}
      >
        Personalized workout tracking PWA, aimed to replace conventional use of
        a notebook in a gym.
      </h2>
    </div>
  );
};

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { HeroSubtitle } from "@/components/login/HeroSubtitle";
import { LoginForm } from "@/components/login/LoginForm";

export default async function LoginPage() {
  const { isAuthenticated } = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();

  isLoggedIn && redirect("/workouts");

  return (
    <>
      <HeroSubtitle content="Personalized workout tracking PWA, aimed to replace a notebook in the gym." />
      <LoginForm />
    </>
  );
}

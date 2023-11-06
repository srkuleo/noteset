import { GoogleAuthButton } from "@/components/login/GoogleAuthButton";
import { Separator } from "@/components/login/Separator";
import { RegisterForm } from "@/components/register/RegisterForm";
import { RegisterLink } from "@/components/register/RegisterLink";

export default function RegisterPage() {
  return (
    <div className="px-12 pt-40">
      <GoogleAuthButton />
      <Separator />
      <RegisterForm />
      <RegisterLink />
    </div>
  );
}

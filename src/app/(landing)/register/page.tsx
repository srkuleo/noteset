import { GoogleAuthButton } from "@/components/ClientButtons";
import { Separator } from "@/components/Separator";
import { RegisterForm } from "@/components/RegisterForm";
import { RegisterLink } from "@/components/RegisterLink";

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

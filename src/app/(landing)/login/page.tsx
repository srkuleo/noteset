import { GoogleAuthButton } from "@/components/login/GoogleAuthButton";
import { Separator } from "@/components/login/Separator";
import { LoginForm } from "@/components/login/LoginForm";
import { LoginLinks } from "@/components/login/LoginLinks";

export default function LoginPage() {
  return (
    <div className="px-12 pt-48">
      <GoogleAuthButton />
      <Separator />
      <LoginForm />
      <LoginLinks />
    </div>
  );
}

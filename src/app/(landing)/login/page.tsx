import { GoogleAuthButton } from "@/components/ClientButtons";
import { Separator } from "@/components/Separator";
import { LoginForm } from "@/components/LoginForm";
import { LoginLinks } from "@/components/LoginLinks";

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

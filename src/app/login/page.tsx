import { LoginForm } from "@/components/login-form";
import { GoogleAuth } from "@/components/oauth";
import { Separator } from "@/components/separator";
import { LoginLinks } from "@/components/login-links";

export default function LoginPage() {
  return (
    <div className="px-12 pt-48">
      <GoogleAuth />
      <Separator />
      <LoginForm />
      <LoginLinks />
    </div>
  );
}

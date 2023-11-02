import { GoogleAuth } from "@/components/GoogleAuth";
import { Separator } from "@/components/Separator";
import { LoginForm } from "@/components/LoginForm";
import { LoginLinks } from "@/components/LoginLinks";

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

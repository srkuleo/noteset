import { GoogleAuth } from "@/components/GoogleAuth";
import { Separator } from "@/components/Separator";
import { RegisterForm } from "@/components/RegisterForm";
import { RegisterLink } from "@/components/RegisterLink";

export default function RegisterPage() {
  return (
    <div className="px-12 pt-40">
      <GoogleAuth />
      <Separator />
      <RegisterForm />
      <RegisterLink />
    </div>
  );
}

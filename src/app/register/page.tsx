import { GoogleAuth } from "@/components/oauth";
import { Separator } from "@/components/separator";
import { SignUpForm } from "@/components/signup-form";
import { SignUpLink } from "@/components/signup-link";

export default function SignUpPage() {
  return (
    <div className="px-12 pt-40">
      <GoogleAuth />
      <Separator />
      <SignUpForm />
      <SignUpLink />
    </div>
  );
}

import { PageWrapper } from "../../../components/login/PageWrapper";
import { GoogleAuthButton } from "../../../components/login/GoogleAuthButton";
import { Separator } from "../../../components/login/Separator";
import { LoginForm } from "../../../components/login/LoginForm";
import { LoginLinks } from "../../../components/login/LoginLinks";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};

export default function LoginPage() {
  return (
    <PageWrapper>
      <GoogleAuthButton />
      <Separator />
      <LoginForm />
      <LoginLinks />
    </PageWrapper>
  );
}

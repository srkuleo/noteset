import { PageWrapper } from "../../../components/auth/PageWrapper";
import { GoogleAuthButton } from "../../../components/auth/GoogleAuthButton";
import { Separator } from "../../../components/auth/Separator";
import { LoginForm } from "../../../components/auth/login/LoginForm";
import { LoginLinks } from "../../../components/auth/login/LoginLinks";
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

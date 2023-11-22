import { PageWrapper } from "../../../components/auth/PageWrapper";
import { GoogleAuthButton } from "../../../components/auth/GoogleAuthButton";
import { Separator } from "../../../components/auth/Separator";
import { RegisterForm } from "../../../components/auth/register/RegisterForm";
import { RegisterLink } from "../../../components/auth/register/RegisterLink";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
};

export default function RegisterPage() {
  return (
    <PageWrapper>
      <GoogleAuthButton />
      <Separator />
      <RegisterForm />
      <RegisterLink />
    </PageWrapper>
  );
}

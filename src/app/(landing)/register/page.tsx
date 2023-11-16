import { PageWrapper } from "../../../components/login/PageWrapper";
import { GoogleAuthButton } from "../../../components/login/GoogleAuthButton";
import { Separator } from "../../../components/login/Separator";
import { RegisterForm } from "../../../components/register/RegisterForm";
import { RegisterLink } from "../../../components/register/RegisterLink";
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

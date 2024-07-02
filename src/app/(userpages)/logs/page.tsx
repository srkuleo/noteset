import { redirect } from "next/navigation";
import { getAuth } from "@/util/actions/auth";
import { UserPagesHeadingText } from "@/components/user/UserPagesHeadingText";
import { UserPagesWrapper } from "@/components/user/UserPagesWrapper";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Logs",
};

export default async function LogsPage() {
  const { user } = await getAuth();

  if (!user) {
    redirect("/login");
  }

  return (
    <UserPagesWrapper>
      <UserPagesHeadingText label="Logs" />
    </UserPagesWrapper>
  );
}

import { UserPagesHeadingText } from "@/components/user/UserPagesHeadingText";
import { UserPagesWrapper } from "@/components/user/UserPagesWrapper";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Logs",
};

export default function LogsPage() {
  return (
    <UserPagesWrapper>
      <UserPagesHeadingText label="Logs" />
    </UserPagesWrapper>
  );
}

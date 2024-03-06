import type { Metadata } from "next";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { UserPagesWrapper } from "@/components/user/UserPagesWrapper";
import { UserPagesHeadingText } from "@/components/user/UserPagesHeadingText";

export const metadata: Metadata = {
  title: "Profile",
};

export default async function ProfilePage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <UserPagesWrapper>
      <UserPagesHeadingText label="Profile page" />
      <p className="">
        Full name: {user?.given_name} {user?.family_name}
      </p>
    </UserPagesWrapper>
  );
}

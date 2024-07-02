import { redirect } from "next/navigation";
import { getAuth } from "@/util/actions/auth";
import { UserPagesWrapper } from "@/components/user/UserPagesWrapper";
import { UserPagesHeadingText } from "@/components/user/UserPagesHeadingText";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
};

export default async function ProfilePage() {
  const { user } = await getAuth();

  if (!user) {
    redirect("/login");
  }

  const userJoined = user.createdAt.substring(0, 10);

  return (
    <UserPagesWrapper>
      <UserPagesHeadingText label="Profile page" />
      <p className="">Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>Verified: {user.isVerifiedEmail ? "Yes" : "No"}</p>
      <p>Joined: {userJoined}</p>
    </UserPagesWrapper>
  );
}

import { redirect } from "next/navigation";
import { getAuth } from "@/util/actions/auth";
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
    <>
      <div className="border-b border-slate-300/80 px-6 py-4 dark:border-slate-800">
        <UserPagesHeadingText label="Profile page" />
      </div>

      <main className="space-y-4 px-6 py-2">
        <p className="">Username: {user.username}</p>
        <p>Email: {user.email}</p>
        <p>Verified: {user.isVerified ? "Yes" : "No"}</p>
        <p>Joined: {userJoined}</p>
      </main>
    </>
  );
}

import { redirect } from "next/navigation";
import { getAuth } from "@/util/actions/auth";
import { UserPagesHeadingText } from "@/components/user/UserPagesHeadingText";
import { ProfileDropDownMenu } from "@/components/user/profile/ProfileDropDownMenu";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
};

export default async function ProfilePage() {
  const { user } = await getAuth();

  if (!user) {
    redirect("/login");
  }

  return (
    <>
      <div className="flex justify-between border-b border-slate-300/80 px-6 py-4 dark:border-slate-800">
        <UserPagesHeadingText label="Profile page" />

        <ProfileDropDownMenu preferences={user.preferences} />
      </div>

      <main className="space-y-4">
        {!user.isVerified && (
          <div className="flex justify-center gap-2 bg-amber-400 py-2 dark:bg-amber-600">
            <p className="text-lg text-white">You are not verified.</p>
            <button className="text-sm text-violet-500 dark:text-violet-800">
              Send verification email
            </button>
          </div>
        )}

        <div className="space-y-8 px-6 pb-4">
          <div>
            <p className="font-manrope text-3xl font-semibold">
              {user.username}
            </p>
            <p className="italic">{user.email}</p>
          </div>

          <div className="flex gap-2">
            <p className="font-semibold dark:text-slate-300">Member since:</p>
            <p className="font-bold">
              {user.createdAt
                .toLocaleDateString()
                .replaceAll(". ", "-")
                .replace(".", "")}
            </p>
          </div>
        </div>
      </main>
    </>
  );
}

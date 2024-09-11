import { redirect } from "next/navigation";
import { getAuth } from "@/util/actions/auth";
import {
  UserPagesSubHeadingWrapper,
  UserPagesSubHeadingText,
} from "@/components/user/UserPagesHeader";
import { ProfileDropDownMenu } from "@/components/user/profile/ProfileDropDownMenu";
import { FormatDate } from "@/components/Formatting";

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
      <UserPagesSubHeadingWrapper>
        <UserPagesSubHeadingText label="Profile page" />

        <ProfileDropDownMenu preferences={user.preferences} />
      </UserPagesSubHeadingWrapper>

      <main className="mt-safe-top space-y-4 pb-[91px] pt-36">
        {user.isVerified ? (
          <p className="bg-green-500 py-2 text-center text-lg font-semibold text-white dark:bg-green-600">
            Account verified
          </p>
        ) : (
          <div className="flex justify-center gap-2 bg-amber-400 py-2 dark:bg-amber-600">
            <p className="text-lg font-semibold text-white">
              You are not verified.
            </p>
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
            <FormatDate date={user.createdAt} className="font-bold" />
          </div>
        </div>
      </main>
    </>
  );
}

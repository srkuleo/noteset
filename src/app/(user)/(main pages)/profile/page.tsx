import { redirect } from "next/navigation";
import { getAuth } from "@/util/actions/auth";
import {
  UserPagesSubHeadingWrapper,
  UserPagesSubHeadingText,
} from "@/components/user/UserPagesHeader";
import { FormatDate } from "@/components/Formatting";
import { Theme } from "@/components/user/profile/Theme";
import { TimeFormat } from "@/components/user/profile/TimeFormat";
import { Logout } from "@/components/user/profile/LogOut";

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
      <UserPagesSubHeadingWrapper className="pb-[17px]">
        <UserPagesSubHeadingText label="Profile page" />
      </UserPagesSubHeadingWrapper>

      <main className="mt-safe-top space-y-8 pb-[91px] pt-[142px]">
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

        <div className="space-y-8 px-6">
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

        <div className="mx-6 space-y-4 border-y border-slate-300 py-8 dark:border-slate-700">
          <Theme />
          <TimeFormat selected={user.preferences.timeFormat} />
        </div>

        <Logout />
      </main>
    </>
  );
}

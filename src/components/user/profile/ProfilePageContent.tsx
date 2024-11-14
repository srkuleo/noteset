import { redirect } from "next/navigation";
import { getAuthSession } from "@/util/session";
import { FormatDate } from "@/components/Formatting";
import { Theme } from "./Theme";
import { TimeFormat } from "./TimeFormat";

export const ProfilePageContent = async () => {
  const { user } = await getAuthSession();

  if (user === null) {
    redirect("/login");
  }

  return (
    <main className="mt-safe-top space-y-8 pb-[100px] pt-[142px]">
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
          <p className="font-manrope text-3xl font-semibold">{user.username}</p>
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
    </main>
  );
};

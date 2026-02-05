import { redirect } from "next/navigation"
import { FormatDate } from "@/components/user/Formatting"
import { getAuthSession } from "@/util/session"
import { Theme } from "./Theme"
import { TimeFormat } from "./TimeFormat"

export const ProfilePageContent = async () => {
  const { user } = await getAuthSession()

  if (user === null) {
    redirect("/login")
  }

  return (
    <main className="mt-safe-top space-y-8 pt-[142px] pb-[97px]">
      {user.isVerified ? (
        <p className="bg-green-500 py-2 text-center font-semibold text-lg text-white dark:bg-green-600">
          Account verified
        </p>
      ) : (
        <div className="flex justify-center gap-2 bg-amber-400 py-2 dark:bg-amber-600">
          <p className="font-semibold text-lg text-white">You are not verified.</p>
          <button type="button" className="text-sm text-violet-500 dark:text-violet-800">
            Send verification email
          </button>
        </div>
      )}

      <div className="space-y-8 px-6">
        <div>
          <p className="font-manrope font-semibold text-3xl">{user.username}</p>
          <p className="italic">{user.email}</p>
        </div>

        <div className="flex gap-2">
          <p className="font-semibold dark:text-slate-300">Member since:</p>
          <FormatDate date={user.createdAt} className="font-bold" />
        </div>
      </div>

      <div className="mx-6 space-y-4 border-slate-300 border-y py-8 dark:border-slate-700">
        <Theme />
        <TimeFormat selected={user.preferences.timeFormat} />
      </div>
    </main>
  )
}

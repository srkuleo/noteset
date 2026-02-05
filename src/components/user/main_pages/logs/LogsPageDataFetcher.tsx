import { redirect } from "next/navigation"
import { getUserDoneWorkouts } from "@/db/query"
import { getAuthSession } from "@/util/session"
import type { LogsPageSearchParams } from "@/util/types"
import { LogsPageContent } from "./LogsPageContent"
import { LogsPageNavBar } from "./LogsPageNavBar"

export const LogsPageDataFetcher = async ({ searchQuery, strictMode }: LogsPageSearchParams) => {
  const { user } = await getAuthSession()

  if (user === null) {
    redirect("/login")
  }

  const doneWorkouts = await getUserDoneWorkouts(
    searchQuery,
    strictMode,
    user.preferences.logsOrder
  )

  return (
    <>
      {(doneWorkouts.length > 0 || searchQuery) && (
        <LogsPageNavBar
          searchQuery={searchQuery}
          strictMode={strictMode}
          logsOrderPreference={user.preferences.logsOrder}
        />
      )}

      <LogsPageContent
        doneWorkouts={doneWorkouts}
        timeFormatPreference={user.preferences.timeFormat}
        searchQuery={searchQuery}
      />
    </>
  )
}

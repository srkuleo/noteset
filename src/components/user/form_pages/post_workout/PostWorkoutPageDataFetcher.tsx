import { notFound, redirect } from "next/navigation"
import { getPostWorkoutPageWorkouts } from "@/db/query"
import { getAuthSession } from "@/util/session"
import { PostWorkoutPageContent } from "./PostWorkoutPageContent"

export const PostWorkoutPageDataFetcher = async ({ title }: { title: string }) => {
  const { user } = await getAuthSession()

  if (user === null) {
    redirect("/login")
  }

  const { lastDoneWorkout, currentWorkout } = await getPostWorkoutPageWorkouts(title)

  if (!lastDoneWorkout || !currentWorkout) {
    notFound()
  }

  return (
    <PostWorkoutPageContent
      doneWorkout={lastDoneWorkout}
      currentWorkout={currentWorkout}
      timeFormatPreference={user.preferences.timeFormat}
    />
  )
}

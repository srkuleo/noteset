import { redirect } from "next/navigation"
import { getUserCurrentWorkouts } from "@/db/query"
import { getAuthSession } from "@/util/session"
import { CurrentWorkoutsList } from "./CurrentWorkoutsList"

export const CurrentWorkoutPageDataFetcher = async () => {
  const { user } = await getAuthSession()

  if (user === null) {
    redirect("/login")
  }

  const workouts = await getUserCurrentWorkouts()

  return <CurrentWorkoutsList workouts={workouts} />
}

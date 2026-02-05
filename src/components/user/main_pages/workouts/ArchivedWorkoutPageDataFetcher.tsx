import { redirect } from "next/navigation"
import { getUserArchivedWorkouts } from "@/db/query"
import { getAuthSession } from "@/util/session"
import { ArchivedWorkoutsList } from "./ArchivedWorkoutsList"

export const ArchivedWorkoutPageDataFetcher = async () => {
  const { user } = await getAuthSession()

  if (user === null) {
    redirect("/login")
  }

  const archivedWorkouts = await getUserArchivedWorkouts()

  return <ArchivedWorkoutsList archivedWorkouts={archivedWorkouts} />
}

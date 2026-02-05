import { notFound, redirect } from "next/navigation"
import { getCurrentWorkoutById } from "@/db/query"
import { getAuthSession } from "@/util/session"
import { WorkoutToDoForm } from "./WorkoutToDoForm"

export const WorkoutToDoDataFetcher = async ({ workoutId }: { workoutId: number }) => {
  const { user } = await getAuthSession()

  if (user === null) {
    redirect("/login")
  }

  const workoutToDo = await getCurrentWorkoutById(workoutId)

  if (!workoutToDo) notFound()

  return <WorkoutToDoForm workoutToDo={workoutToDo} />
}

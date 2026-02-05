import type { Metadata } from "next"
import { notFound, redirect } from "next/navigation"
import { EditWorkoutForm } from "@/components/user/form_pages/EditWorkoutForm"
import { getCurrentWorkoutById } from "@/db/query"
import { getAuthSession } from "@/util/session"

export const metadata: Metadata = {
  title: "Edit",
}

type SearchParams = Promise<{ id: string }>

export default async function EditWorkoutPage({ searchParams }: { searchParams: SearchParams }) {
  const { user } = await getAuthSession()

  if (user === null) {
    redirect("/login")
  }

  const { id } = await searchParams

  const workoutToEditId = Number(id)
  const workoutToEdit = await getCurrentWorkoutById(workoutToEditId)

  if (!workoutToEdit) notFound()

  return <EditWorkoutForm workoutToEdit={workoutToEdit} workoutToEditId={workoutToEditId} />
}

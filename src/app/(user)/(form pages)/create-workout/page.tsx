import { redirect } from "next/navigation"
import { CreateWorkoutForm } from "@/components/user/form_pages/CreateWorkoutForm"
import { getAuthSession } from "@/util/session"

export default async function CreateWorkoutPage() {
  const { user } = await getAuthSession()

  if (user === null) {
    redirect("/login")
  }

  return <CreateWorkoutForm />
}

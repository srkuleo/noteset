import { redirect } from "next/navigation"
import { getAuthSession } from "@/util/session"
import { ProfileButtonModal } from "./ProfileButtonModal"

export const ProfileButton = async () => {
  const { user } = await getAuthSession()

  if (user === null) {
    redirect("/login")
  }

  const userInitial = user.username.substring(0, 1).toUpperCase()

  return <ProfileButtonModal username={user.username} userInitial={userInitial} />
}

import { Suspense } from "react"
import { ProfileButtonSkeleton } from "@/components/Loading"
import { ProfileButton } from "@/components/user/profile/ProfileButton"
import { UserPagesHeader } from "@/components/user/UserPagesHeader"

export default async function UserPagesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <UserPagesHeader>
        <Suspense fallback={<ProfileButtonSkeleton />}>
          <ProfileButton />
        </Suspense>
      </UserPagesHeader>
      {children}
    </>
  )
}

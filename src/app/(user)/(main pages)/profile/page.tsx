import type { Metadata } from "next"
import { Suspense } from "react"
import { ProfilePageSkeleton } from "@/components/Loading"
import { ProfilePageContent } from "@/components/user/profile/ProfilePageContent"
import {
  UserPagesSubHeadingText,
  UserPagesSubHeadingWrapper,
} from "@/components/user/UserPagesHeader"

export const metadata: Metadata = {
  title: "Profile",
}

export default async function ProfilePage() {
  return (
    <>
      <UserPagesSubHeadingWrapper className="pb-[17px]">
        <UserPagesSubHeadingText label="Profile page" />
      </UserPagesSubHeadingWrapper>

      <Suspense fallback={<ProfilePageSkeleton />}>
        <ProfilePageContent />
      </Suspense>
    </>
  )
}

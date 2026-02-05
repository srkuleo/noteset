import { Suspense } from "react"
import { ProfileButtonSkeleton } from "@/components/Loading"
import { MainPagesFooter } from "@/components/user/main_pages/MainPagesFooter"
import { ProfileButton } from "@/components/user/main_pages/profile/ProfileButton"

export default async function MainPagesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}

      <MainPagesFooter>
        <Suspense fallback={<ProfileButtonSkeleton />}>
          <ProfileButton />
        </Suspense>
      </MainPagesFooter>
    </>
  )
}

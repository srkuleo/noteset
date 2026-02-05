import { WorkoutsPageTooltip } from "@/components/Tooltips"
import { WorkoutsNavBar } from "@/components/user/main_pages/workouts/WorkoutsNavBar"
import { UserPagesSubHeadingWrapper } from "@/components/user/UserPagesHeader"

export default async function WorkoutsPagesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <UserPagesSubHeadingWrapper>
        <WorkoutsNavBar />
        <WorkoutsPageTooltip />
      </UserPagesSubHeadingWrapper>

      {children}
    </>
  )
}

import { Suspense } from "react"
import { WorkoutsPageSkeleton } from "@/components/Loading"
import { CurrentWorkoutPageDataFetcher } from "@/components/user/main_pages/workouts/CurrentWorkoutPageDataFetcher"

export default async function CurrentWorkoutsPage() {
  return (
    <Suspense fallback={<WorkoutsPageSkeleton />}>
      <CurrentWorkoutPageDataFetcher />
    </Suspense>
  )
}

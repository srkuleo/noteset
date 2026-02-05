import { Suspense } from "react"
import { WorkoutsPageSkeleton } from "@/components/Loading"
import { ArchivedWorkoutPageDataFetcher } from "@/components/user/main_pages/workouts/ArchivedWorkoutPageDataFetcher"

export default async function ArchivedWorkoutsPage() {
  return (
    <Suspense fallback={<WorkoutsPageSkeleton />}>
      <ArchivedWorkoutPageDataFetcher />
    </Suspense>
  )
}

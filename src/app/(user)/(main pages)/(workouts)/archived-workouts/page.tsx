import { Suspense } from "react"
import { HomePageSkeleton } from "@/components/Loading"
import { ArchivedWorkoutPageDataFetcher } from "@/components/user/home/ArchivedWorkoutPageDataFetcher"

export default async function ArchivedWorkoutsPage() {
  return (
    <Suspense fallback={<HomePageSkeleton />}>
      <ArchivedWorkoutPageDataFetcher />
    </Suspense>
  )
}

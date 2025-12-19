import { Suspense } from "react"
import { HomePageSkeleton } from "@/components/Loading"
import { CurrentWorkoutPageDataFetcher } from "@/components/user/home/CurrentWorkoutPageDataFetcher"

export default async function HomePage() {
  return (
    <Suspense fallback={<HomePageSkeleton />}>
      <CurrentWorkoutPageDataFetcher />
    </Suspense>
  )
}

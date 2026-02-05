import { Suspense } from "react"
import { LandingPageBar } from "@/components/auth/layout/LandingPageBar"
import { UIMessage } from "@/components/auth/layout/UIMessage"
import { DataLoadingSpinner } from "@/components/Loading"

export default async function AuthPagesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="fixed inset-x-0 top-0 bg-white pt-safe-top dark:bg-slate-900">
        <LandingPageBar />

        <UIMessage />
      </div>

      <main className="mt-safe-top flex flex-col px-16 pt-32 sm:px-[150px] md:px-[200px] md:pt-48 lg:px-[300px] xl:px-[450px] 2xl:px-[550px]">
        <div className="w-full">
          <Suspense fallback={<DataLoadingSpinner message="Verifying session... Please wait" />}>
            {children}
          </Suspense>
        </div>
      </main>
    </>
  )
}

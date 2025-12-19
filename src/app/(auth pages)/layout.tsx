import { Suspense } from "react"
import { LoadingDataSpinner } from "@/components/Loading"
import { LandingPageBar } from "@/components/landing/LandingPageBar"
import { UIMessage } from "@/components/landing/UIMessage"

export const dynamic = "force-dynamic"

export default async function AuthPagesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="fixed inset-x-0 top-0 bg-white pt-safe-top dark:bg-slate-900">
        <LandingPageBar />

        <UIMessage />
      </div>

      <main className="mt-safe-top flex px-8 pt-[81px] md:pt-[125px]">
        <Suspense fallback={<LoadingDataSpinner message="Verifying session... Please wait" />}>
          {children}
        </Suspense>
      </main>
    </>
  )
}

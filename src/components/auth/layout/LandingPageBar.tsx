import Link from "next/link"
import { GitHubButton } from "@/components/GitHubButton"
import { Logo } from "@/components/icons/logo"
import { ThemeButtonDevMode } from "@/components/ThemeButtonDevMode"

export const LandingPageBar = ({ children }: { children?: React.ReactNode }) => {
  return (
    <header className="border-slate-400/40 border-b px-6 py-2 md:border-b-0 dark:border-slate-800/90">
      <div className="flex items-center justify-between">
        <Link href="/">{Logo}</Link>

        <div className="flex items-center gap-4">
          {children}

          {process.env.NODE_ENV === "development" && <ThemeButtonDevMode />}

          <GitHubButton />
        </div>
      </div>
    </header>
  )
}

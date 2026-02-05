"use client"

import { motion } from "framer-motion"
import type { Route } from "next"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { twMerge } from "tailwind-merge"

const workoutRoutes: { href: Route; label: string }[] = [
  { href: "/current", label: "Current" },
  { href: "/archived", label: "Archived" },
]

export const WorkoutsNavBar = () => {
  const activePage = usePathname()

  return (
    <div className="flex gap-1">
      {workoutRoutes.map((routes) => (
        <Link
          key={routes.label}
          href={routes.href}
          className={twMerge(
            "relative rounded-full px-6 py-2 font-bold font-manrope",
            routes.href === "/current" && "text-blue-500 dark:text-blue-400",
            routes.href === "/archived" && "text-slate-500 dark:text-slate-400"
          )}
        >
          {routes.href === activePage && (
            <motion.div
              layoutId="active-route"
              style={{ borderRadius: 9999 }}
              transition={{ type: "spring", duration: 0.6 }}
              className="absolute inset-0 bg-white shadow-md ring-1 ring-slate-300/80 ring-inset dark:bg-slate-800 dark:shadow-slate-950/65 dark:ring-slate-700"
            />
          )}
          <span className="relative z-10">{routes.label}</span>
        </Link>
      ))}
    </div>
  )
}

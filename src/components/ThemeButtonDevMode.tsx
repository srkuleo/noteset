"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export const ThemeButtonDevMode = () => {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="font-bold text-xs uppercase"
    >
      {resolvedTheme === "dark" ? "Light" : "Dark"}
    </button>
  )
}

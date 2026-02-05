"use client"

import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { twMerge } from "tailwind-merge"
import { Drawer } from "vaul"
import { MoonIcon, SunIcon, SystemIcon, ThemeIcon } from "@/components/icons/theme"
import { BUTTON_TIMEOUT, timeout } from "@/util/utils"

const themeOptions = ["system", "dark", "light"] as const
type ThemeOptionsType = (typeof themeOptions)[number]

export const Theme = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  function chooseTheme(option: ThemeOptionsType) {
    setTheme(option)
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <p className="font-bold font-manrope text-xl">Theme</p>
        {ThemeIcon}
      </div>

      {mounted ? (
        <div className="flex items-center justify-between">
          <p className="font-semibold text-lg text-slate-400 italic dark:text-slate-500">{theme}</p>
          <ChangeThemeModal theme={theme} chooseTheme={chooseTheme} />
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <div className="h-6 w-20 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800/80" />

          <div className="px-3 py-1.5 font-semibold text-sm text-violet-500 active:scale-95 active:text-violet-300 dark:text-violet-400 dark:active:text-violet-600">
            Change
          </div>
        </div>
      )}
    </div>
  )
}

const ChangeThemeModal = ({
  theme,
  chooseTheme,
}: {
  theme: string | undefined
  chooseTheme: (option: ThemeOptionsType) => void
}) => {
  const [open, setOpen] = useState(false)

  return (
    <Drawer.Root open={open} onOpenChange={setOpen} noBodyStyles disablePreventScroll>
      <button
        type="button"
        onClick={async () => {
          await timeout(BUTTON_TIMEOUT)

          setOpen(true)
        }}
        className="px-3 py-1.5 font-semibold text-sm text-violet-500 active:scale-95 active:text-violet-300 dark:text-violet-400 dark:active:text-violet-600"
      >
        Change
        <p className="sr-only">Change theme</p>
      </button>

      <Drawer.Portal>
        <Drawer.Overlay
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[9999] bg-slate-700/45 backdrop-blur-sm dark:bg-slate-950/45"
        />

        <Drawer.Content
          aria-describedby={undefined}
          data-vaul-no-drag
          className="fixed inset-x-0 bottom-0 z-[9999] select-none space-y-4 px-4 pb-12 focus:outline-none"
        >
          <VisuallyHidden asChild>
            <Drawer.Title>Choose a theme</Drawer.Title>
          </VisuallyHidden>

          <div className="flex flex-col divide-y divide-slate-400/40 rounded-lg+ bg-white/90 text-center dark:divide-slate-600 dark:bg-slate-700/70">
            {themeOptions.map((value) => (
              <button
                key={value}
                type="button"
                onClick={async () => {
                  await timeout(BUTTON_TIMEOUT)

                  chooseTheme(value)

                  setOpen(false)
                }}
                className={twMerge(
                  "flex items-center justify-center gap-6 p-3 font-manrope font-semibold text-blue-500 text-lg first:rounded-t-lg+ last:rounded-b-lg+ active:bg-slate-200 dark:border-slate-600 dark:text-blue-400 active:dark:bg-slate-600/90",
                  value === theme &&
                    "bg-white text-green-500 dark:bg-slate-900/50 dark:text-green-500"
                )}
              >
                {value}
                {value === "system" ? SystemIcon : value === "dark" ? MoonIcon : SunIcon}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={async () => {
              await timeout(BUTTON_TIMEOUT)

              setOpen(false)
            }}
            className="w-full rounded-lg+ bg-white p-3 font-bold text-xl focus:outline-none active:bg-slate-200 dark:bg-slate-700 dark:active:bg-slate-600/90"
          >
            Cancel
          </button>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}

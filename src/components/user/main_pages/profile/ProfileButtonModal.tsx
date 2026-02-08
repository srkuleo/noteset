"use client"

import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { useMutation } from "@tanstack/react-query"
import type { Route } from "next"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import { twMerge } from "tailwind-merge"
import { Drawer } from "vaul"
import { XButton } from "@/components/CustomButtons"
import { logout } from "@/util/actions/auth"
import { BUTTON_TIMEOUT, timeout } from "@/util/utils"

export const ProfileButtonModal = ({
  username,
  userInitial,
}: {
  username: string
  userInitial: string
}) => {
  const path = usePathname() as Route
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const { mutate: serverAction, isPending } = useMutation({
    mutationFn: logout,
  })

  return (
    <Drawer.Root open={open} onOpenChange={setOpen} noBodyStyles disablePreventScroll>
      <button
        type="button"
        onClick={async () => {
          await timeout(BUTTON_TIMEOUT)

          setOpen(true)
        }}
        className="flex size-12 flex-col items-center justify-evenly rounded-full active:scale-95 active:bg-slate-200 dark:active:bg-slate-700"
      >
        <div
          className={twMerge(
            "flex size-7 items-center justify-center rounded-full bg-white shadow-md active:scale-95 dark:bg-slate-700",
            path === "/profile"
              ? "ring-2 ring-green-500 dark:ring-green-500"
              : "ring-1 ring-slate-300 dark:ring-slate-500"
          )}
        >
          <span className="font-bold">{userInitial}</span>
        </div>

        <p
          className={twMerge(
            "text-center font-extrabold font-nunito text-[8px]",
            path === "/profile"
              ? "text-green-500 uppercase dark:text-green-500"
              : "text-slate-400 normal-case dark:text-slate-500"
          )}
        >
          You
        </p>

        <p className="sr-only">Open profile modal</p>
      </button>

      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-[9999] bg-slate-900/40 backdrop-blur-sm dark:bg-slate-950/70" />

        <Drawer.Content
          aria-describedby={undefined}
          data-vaul-no-drag
          className="fixed inset-x-0 bottom-0 z-[9999] select-none space-y-6 px-4 pb-12 focus:outline-none"
        >
          <VisuallyHidden asChild>
            <Drawer.Title>User profile modal</Drawer.Title>
          </VisuallyHidden>

          <div className="flex flex-col gap-2 rounded-lg+ bg-white/85 p-4 dark:bg-slate-700/70">
            <div className="flex items-center gap-2 pb-2">
              <div className="flex size-10 items-center justify-center rounded-full bg-white ring-1 ring-slate-300 dark:bg-slate-600 dark:ring-slate-500">
                <span className="font-bold text-[16px] leading-4">{userInitial}</span>
              </div>

              <p className="font-bold text-xl">{username}</p>

              <XButton
                srOnlyDescription="Close profile modal"
                strokeWidth={3}
                svgSize="size-4"
                onClick={async () => {
                  await timeout(BUTTON_TIMEOUT)
                  setOpen(false)
                }}
                className="ml-auto rounded-full bg-white p-2 shadow-md ring-1 ring-slate-300 ring-inset active:scale-95 active:bg-slate-200 dark:bg-slate-600 dark:shadow-slate-900/75 dark:ring-slate-500 dark:active:bg-slate-800"
              />
            </div>

            <button
              type="button"
              disabled={isPending}
              onClick={async () => {
                await timeout(BUTTON_TIMEOUT)

                router.push("/profile")
                setOpen(false)
              }}
              className="rounded-lg+ bg-white py-2 text-center font-semibold text-blue-500 text-lg shadow-md ring-1 ring-slate-300 focus:outline-none active:bg-slate-200 disabled:pointer-events-none dark:bg-slate-700 dark:text-blue-400 dark:shadow-slate-900/75 dark:ring-slate-600 dark:active:bg-slate-600/90"
            >
              Settings
            </button>

            <button
              type="button"
              disabled={isPending}
              onClick={async () => {
                await timeout(BUTTON_TIMEOUT)

                router.push("/profile")
                setOpen(false)
              }}
              className="rounded-lg+ bg-white py-2 text-center font-semibold text-blue-500 text-lg shadow-md ring-1 ring-slate-300 focus:outline-none active:bg-slate-200 disabled:pointer-events-none dark:bg-slate-700 dark:text-blue-400 dark:shadow-slate-900/75 dark:ring-slate-600 dark:active:bg-slate-600/90"
            >
              View profile
            </button>
          </div>

          <form action={() => serverAction()} className="w-full">
            <button
              type="submit"
              disabled={isPending}
              className="w-full rounded-lg+ bg-white py-3 font-bold text-green-500 text-xl focus:outline-none active:bg-slate-200 disabled:pointer-events-none disabled:bg-slate-200 disabled:text-green-400 dark:bg-slate-700 dark:text-green-600 dark:disabled:bg-slate-800/80 dark:disabled:text-green-700 dark:active:bg-slate-600/90"
            >
              {isPending ? "Logging out..." : "Log Out"}
            </button>
          </form>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}

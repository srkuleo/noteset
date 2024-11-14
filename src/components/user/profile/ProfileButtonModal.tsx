"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { Drawer } from "vaul";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { timeout, BUTTON_TIMEOUT } from "@/util/utils";
import { logout } from "@/util/actions/auth";

export const ProfileButtonModal = ({
  username,
  userInitial,
}: {
  username: string;
  userInitial: string;
}) => {
  const { mutate: serverAction, isPending } = useMutation({
    mutationFn: logout,
  });
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <Drawer.Root
      open={open}
      onOpenChange={setOpen}
      noBodyStyles
      disablePreventScroll
    >
      <button
        type="button"
        onClick={async () => {
          await timeout(BUTTON_TIMEOUT);

          setOpen(true);
        }}
        className="pr-1"
      >
        <div className="flex size-9 items-center justify-center rounded-full bg-slate-100 ring-1 ring-slate-300 active:scale-95 active:bg-slate-300/50 dark:bg-slate-600 dark:ring-slate-500 dark:active:bg-slate-700">
          <span className="text-[16px] font-bold">{userInitial}</span>
        </div>

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

          <div className="flex flex-col gap-2 rounded-modal bg-white/85 p-4 dark:bg-slate-700/70">
            <div className="flex items-center gap-4 pb-2">
              <div className="flex size-9 items-center justify-center rounded-full bg-slate-100 ring-1 ring-slate-300 dark:bg-slate-600 dark:ring-slate-500">
                <span className="text-[16px] font-bold">{userInitial}</span>
              </div>

              <p className="text-xl font-bold">{username}</p>

              <button
                type="button"
                onClick={async () => {
                  await timeout(BUTTON_TIMEOUT);

                  setOpen(false);
                }}
                className="ml-auto size-6 rounded-full bg-slate-100 ring-1 ring-slate-300 active:scale-95 active:bg-slate-300/50 dark:bg-slate-600 dark:ring-slate-500 dark:active:bg-slate-700"
              >
                &times;
                <p className="sr-only">Close modal</p>
              </button>
            </div>

            <button
              type="button"
              disabled={isPending}
              onClick={async () => {
                await timeout(BUTTON_TIMEOUT);

                router.push("/profile");
                setOpen(false);
              }}
              className="rounded-modal bg-white py-2 text-center text-lg font-semibold text-blue-500 ring-1 ring-slate-300 focus:outline-none active:bg-slate-200 disabled:pointer-events-none dark:bg-slate-700 dark:text-blue-400 dark:ring-slate-600 dark:active:bg-slate-600/90"
            >
              Settings
            </button>

            <button
              type="button"
              disabled={isPending}
              onClick={async () => {
                await timeout(BUTTON_TIMEOUT);

                router.push("/profile");
                setOpen(false);
              }}
              className="rounded-modal bg-white py-2 text-center text-lg font-semibold text-blue-500 ring-1 ring-slate-300 focus:outline-none active:bg-slate-200 disabled:pointer-events-none dark:bg-slate-700 dark:text-blue-400 dark:ring-slate-600 dark:active:bg-slate-600/90"
            >
              View profile
            </button>
          </div>

          <form action={() => serverAction()} className="w-full">
            <button
              type="submit"
              disabled={isPending}
              className="w-full rounded-modal bg-white py-3 text-xl font-bold text-green-500 focus:outline-none active:bg-slate-200 disabled:pointer-events-none disabled:bg-slate-200 disabled:text-green-400 dark:bg-slate-700 dark:text-green-600 dark:active:bg-slate-600/90 dark:disabled:bg-slate-800/80 dark:disabled:text-green-700"
            >
              {isPending ? "Logging out..." : "Log Out"}
            </button>
          </form>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

"use client";

import { useState } from "react";
import { Drawer } from "vaul";
import { logout } from "@/util/actions/auth";
import { LogoutIcon } from "../icons/user/logout";
import { ConfirmLogOutButton } from "./FormButtons";

export const LogoutButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <Drawer.Root open={open} onOpenChange={setOpen}>
      <Drawer.Trigger className="flex flex-col items-center justify-center px-5">
        {LogoutIcon}
        <span className="font-manrope text-[10px]">Log out</span>
        <p className="sr-only">Logout button</p>
      </Drawer.Trigger>

      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm dark:bg-slate-950/70" />

        <Drawer.Content
          aria-describedby={undefined}
          data-vaul-no-drag
          className="fixed inset-x-0 bottom-0 select-none space-y-4 px-4 pb-12 focus:outline-none"
        >
          <div className="flex flex-col items-center gap-3 rounded-modal bg-slate-50/90 pt-5 dark:bg-slate-700/70">
            <Drawer.Title className="px-2 text-center font-nunito leading-snug text-slate-600 dark:text-slate-400">
              Are you sure you want to log out?
            </Drawer.Title>

            <form action={logout} className="w-full">
              <ConfirmLogOutButton />
            </form>
          </div>

          <button
            onClick={async () => {
              await new Promise((resolve) => setTimeout(resolve, 100));
              setOpen(false);
            }}
            className="w-full rounded-modal bg-white p-3 text-xl font-bold text-violet-500 focus:outline-none active:bg-slate-200 dark:bg-slate-700 dark:text-violet-400 active:dark:bg-slate-600/90"
          >
            Cancel
          </button>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

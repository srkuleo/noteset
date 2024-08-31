"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useState } from "react";
import { ProfileDropDownMenuIcon } from "@/components/icons/user/profile/dropdown-menu-icon";
import { TimeFormat } from "./TimeFormat";
import { Logout } from "./LogOut";

import { type UserPreferences } from "@/util/types";

export const ProfileDropDownMenu = ({
  preferences,
}: {
  preferences: UserPreferences;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <button
        type="button"
        onClick={async () => {
          await new Promise((resolve) => setTimeout(resolve, 100));
          setOpen(true);
        }}
        className={`relative rounded-full p-1.5 active:scale-95 active:bg-slate-200 dark:active:bg-slate-700 ${open && "z-30 scale-125 text-white transition-all"}`}
      >
        {ProfileDropDownMenuIcon}

        <p className="sr-only">Profile dropdown menu button</p>
      </button>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-20 bg-slate-700/45 backdrop-blur-sm data-[state=closed]:animate-overlay-hide data-[state=open]:animate-overlay-show dark:bg-slate-950/45" />

        <Dialog.Content className="fixed right-8 top-32 z-20 w-[60%] pt-safe-top data-[state=closed]:animate-dropdown-menu-scale-down data-[state=open]:animate-dropdown-menu-scale-up sm:max-w-sm">
          <div className="flex flex-col gap-4 rounded-modal bg-white/75 ring-1 ring-slate-400/80 dark:bg-slate-800/85 dark:text-slate-400 dark:ring-slate-800">
            <VisuallyHidden asChild>
              <Dialog.Title>Profile dropdown menu</Dialog.Title>
            </VisuallyHidden>

            <div className="rounded-t-modal bg-white font-manrope font-semibold dark:bg-slate-900 sm:text-base">
              <TimeFormat
                selected={preferences.timeFormat}
                closeProfileDropDownMenu={() => setOpen(false)}
              />
            </div>

            <div className="rounded-b-modal bg-white font-manrope font-semibold dark:bg-slate-900 sm:text-base">
              <Logout />
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

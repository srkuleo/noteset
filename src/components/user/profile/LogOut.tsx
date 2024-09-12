import { useState } from "react";
import { Drawer } from "vaul";
import { logout } from "@/util/actions/auth";
import { LogoutIcon } from "@/components/icons/user/profile/logout";
import { ConfirmLogOutButton } from "@/components/SubmitButtons";

export const Logout = () => {
  const [open, setOpen] = useState(false);

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
          await new Promise((resolve) => setTimeout(resolve, 100));
          setOpen(true);
        }}
        className="flex w-full items-center justify-between rounded-b-modal px-4 py-2 focus:outline-none active:bg-slate-200 dark:active:bg-slate-700"
      >
        <p>Log Out</p>

        {LogoutIcon}

        <p className="sr-only">Logout button</p>
      </button>

      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-[9999] bg-slate-900/40 backdrop-blur-sm dark:bg-slate-950/70" />

        <Drawer.Content
          aria-describedby={undefined}
          data-vaul-no-drag
          className="fixed inset-x-0 bottom-0 z-[9999] select-none space-y-4 px-4 pb-12 focus:outline-none"
        >
          <div className="flex flex-col gap-3 rounded-modal bg-white/90 text-center dark:bg-slate-700/70">
            <Drawer.Title className="px-2 pb-2 pt-5 font-bold">
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

"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Drawer } from "vaul";
import { twJoin } from "tailwind-merge";
import { logout } from "@/util/actions/auth";
import {
  HomeIcon,
  ProfileIcon,
  LogsIcon,
  LogoutIcon,
} from "@/components/icons/user/navbar";
import { ConfirmLogOutButton } from "../SubmitButtons";

type NavBarLinkType = {
  href: "/workouts" | "/profile" | "/logs";
  icon: React.ReactNode;
  label: "Home" | "Logs" | "Profile";
};

const navBarLinks: NavBarLinkType[] = [
  { href: "/workouts", icon: HomeIcon, label: "Home" },
  { href: "/profile", icon: ProfileIcon, label: "Profile" },
  { href: "/logs", icon: LogsIcon, label: "Logs" },
];

export const UserPagesNavBar = () => {
  const path = usePathname();

  return (
    <nav className="flex justify-center gap-6 border-t border-slate-300/80 pb-7 text-slate-400 dark:border-slate-800 dark:text-slate-500">
      {navBarLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={twJoin(
            "relative px-2 py-2 active:rounded-full active:bg-slate-200 dark:active:bg-slate-700",
            path.includes(link.href) && "text-green-500 dark:text-white",
          )}
        >
          {link.icon}

          {path.includes(link.href) && (
            <motion.div
              layoutId="active-page"
              className="absolute bottom-0 h-[3px] w-8 rounded-full bg-green-500"
            />
          )}

          <p className="sr-only">{link.label} button</p>
        </Link>
      ))}

      <LogoutButton />
    </nav>
  );
};

export const LogoutButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <Drawer.Root open={open} onOpenChange={setOpen} noBodyStyles>
      <Drawer.Trigger className="px-2 py-2 active:rounded-full active:bg-slate-200 dark:active:bg-slate-700">
        {LogoutIcon}

        <p className="sr-only">Logout button</p>
      </Drawer.Trigger>

      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-[9999] bg-slate-900/40 backdrop-blur-sm dark:bg-slate-950/70" />

        <Drawer.Content
          aria-describedby={undefined}
          data-vaul-no-drag
          className="fixed inset-x-0 bottom-0 z-[9999] select-none space-y-4 px-4 pb-12 focus:outline-none"
        >
          <div className="flex flex-col items-center gap-3 rounded-modal bg-slate-50/90 dark:bg-slate-700/70">
            <Drawer.Title className="px-2 pb-2 pt-5 text-center font-bold">
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

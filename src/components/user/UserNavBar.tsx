"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
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

export const UserPageNavBar = () => {
  const path = usePathname();

  return (
    <nav className="flex justify-center gap-4 border-t border-slate-300/80 pb-7 pt-2 text-slate-400 transition dark:border-slate-800 dark:text-slate-500">
      {navBarLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={twJoin(
            "flex flex-col items-center justify-center gap-0.5 px-2 transition",
            path.includes(link.href) && "text-green-500",
          )}
        >
          {link.icon}

          <p className="font-manrope text-[10px] font-extrabold uppercase">
            {link.label}
          </p>

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
      <Drawer.Trigger className="flex flex-col items-center justify-center gap-0.5 transition">
        {LogoutIcon}
        <span className="font-manrope text-[10px] font-extrabold uppercase">
          Log out
        </span>
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

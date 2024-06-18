"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { HomeIcon, ProfileIcon, LogsIcon } from "../icons/user/links";

import { type PageLink } from "@/util/types";

const pageLinks: PageLink[] = [
  { href: "/workouts", icon: HomeIcon, button: "Home" },
  { href: "/profile", icon: ProfileIcon, button: "Profile" },
  { href: "/logs", icon: LogsIcon, button: "Logs" },
];

export const LinkButtons = () => {
  const path = usePathname();

  return (
    <>
      {pageLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={twMerge(
            "relative flex grow items-center justify-center rounded-xl bg-white shadow-md transition active:scale-95 dark:bg-slate-800",
            path.includes(link.href) &&
              "bg-green-500 text-white dark:bg-green-600",
          )}
        >
          {link.icon}
          {path.includes(link.href) && (
            <div className="absolute bottom-1.5 h-[1px] w-5 bg-white" />
          )}
          <p className="sr-only">{link.button} button</p>
        </Link>
      ))}
    </>
  );
};

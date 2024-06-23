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
            "relative flex grow items-center justify-center rounded-xl shadow-md transition active:scale-95",
            path.includes(link.href)
              ? "bg-green-500 p-0.5 text-white ring-1 ring-white dark:bg-green-600"
              : "bg-white dark:bg-slate-800 dark:ring-1 dark:ring-inset dark:ring-slate-700/80",
          )}
        >
          {link.icon}
          <p className="sr-only">{link.button} button</p>
        </Link>
      ))}
    </>
  );
};

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { usePathname } from "next/navigation";
import { HomeIcon, ProfileIcon, LogsIcon } from "../icons/user/links";

export type PageLink = {
  href: string;
  icon: JSX.Element;
  button: "Home" | "Logs" | "Profile";
};

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
          className="relative flex grow items-center justify-center rounded-full py-2.5"
        >
          {path.includes(link.href) && (
            <motion.div
              layoutId="current-page"
              className="absolute inset-0 rounded-full bg-green-500 dark:bg-green-600"
              transition={{ type: "spring", duration: 0.6 }}
            />
          )}
          <span
            className={twMerge(
              "relative z-10",
              path.includes(link.href) && "text-white",
            )}
          >
            {link.icon}
          </span>
          <p className="sr-only">{link.button} button</p>
        </Link>
      ))}
    </>
  );
};

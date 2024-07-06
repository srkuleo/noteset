"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { twJoin } from "tailwind-merge";
import { usePathname } from "next/navigation";
import { HomeIcon, ProfileIcon, LogsIcon } from "../icons/user/links";

export type PageLink = {
  href: "/workouts" | "/profile" | "/logs";
  icon: JSX.Element;
  label: "Home" | "Logs" | "Profile";
};

const pageLinks: PageLink[] = [
  { href: "/workouts", icon: HomeIcon, label: "Home" },
  { href: "/profile", icon: ProfileIcon, label: "Profile" },
  { href: "/logs", icon: LogsIcon, label: "Logs" },
];

export const LinkButtons = () => {
  const path = usePathname();

  return (
    <>
      {pageLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="relative flex grow flex-col items-center justify-center rounded-full py-1"
        >
          {path.includes(link.href) && (
            <motion.div
              layoutId="current-page"
              className="absolute inset-0 rounded-full bg-green-500 dark:bg-green-600"
              transition={{ type: "spring", duration: 0.6 }}
            />
          )}
          <span
            className={twJoin(
              "relative z-10",
              path.includes(link.href) && "text-white",
            )}
          >
            {link.icon}
          </span>
          <span
            className={twJoin(
              "relative z-10 font-manrope text-[10px]",
              path.includes(link.href) && "text-white",
            )}
          >
            {link.label}
          </span>
          <p className="sr-only">{link.label} button</p>
        </Link>
      ))}
    </>
  );
};

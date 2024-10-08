"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { twJoin } from "tailwind-merge";
import {
  HomeIcon,
  ProfileIcon,
  LogsIcon,
} from "@/components/icons/user/navbar";

type NavBarLinkType = {
  href: "/home" | "/profile" | "/logs";
  icon: React.ReactNode;
  label: "Home" | "Logs" | "Profile";
};

const navBarLinks: NavBarLinkType[] = [
  {
    href: "/home",
    icon: <HomeIcon strokeWidth={1.8} className="size-[30px]" />,
    label: "Home",
  },
  { href: "/profile", icon: ProfileIcon, label: "Profile" },
  { href: "/logs", icon: LogsIcon, label: "Logs" },
];

export const MainPagesFooter = () => {
  const path = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 flex justify-center gap-6 border-t border-slate-300/80 bg-white pb-7 text-slate-400 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-500">
      {navBarLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href === "/home" ? "/home?q=current" : link.href}
          className={twJoin(
            "relative rounded-full px-2 py-2 active:bg-slate-200 dark:active:bg-slate-700",
            path === link.href && "text-green-500 dark:text-white",
          )}
        >
          {link.icon}

          {path === link.href && (
            <motion.div
              layoutId="active-page"
              className="absolute bottom-0 h-[3px] w-8 rounded-full bg-green-500"
            />
          )}

          <p className="sr-only">{link.label} button</p>
        </Link>
      ))}
    </nav>
  );
};

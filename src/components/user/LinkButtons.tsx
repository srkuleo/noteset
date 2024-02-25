"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type PageLink } from "@/util/types";
import { HomeIcon, ProfileIcon, LogsIcon } from "@/icons/user/links";

const pageLinks: PageLink[] = [
  { href: "/workouts", icon: HomeIcon },
  { href: "/profile", icon: ProfileIcon },
  { href: "/logs", icon: LogsIcon },
];

export const LinkButtons = () => {
  const path = usePathname();

  return (
    <>
      {pageLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`relative flex grow items-center justify-center rounded-xl shadow-md transition active:scale-95 ${
            path.includes(link.href) ? "active-page" : "idle-page"
          }`}
        >
          {link.icon}
          {path.includes(link.href) && (
            <div className="absolute bottom-1.5 h-[1px] w-5 bg-white" />
          )}
        </Link>
      ))}
    </>
  );
};

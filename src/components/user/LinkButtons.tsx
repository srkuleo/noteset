"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HomeIcon, ProfileIcon, LogsIcon } from "@/icons/user/links";

type Link = {
  href: string;
  icon: JSX.Element;
};
const links: Link[] = [
  { href: "/workouts", icon: HomeIcon },
  { href: "/profile", icon: ProfileIcon },
  { href: "/logs", icon: LogsIcon },
];

export const LinkButtons = () => {
  const path = usePathname();

  return (
    <>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`relative flex grow select-none items-center justify-center rounded-xl shadow-md transition active:scale-95 ${
            link.href === path ? "active-page" : "idle-page"
          }`}
        >
          {link.icon}
          {link.href === path && (
            <div className="absolute bottom-1.5 h-[1px] w-5 bg-white" />
          )}
        </Link>
      ))}
    </>
  );
};

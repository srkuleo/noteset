"use client";

import { HomeIcon, ProfileIcon, LogsIcon } from "../../icons/user/link-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

export type Links = {
  href: string;
  icon: JSX.Element;
}[];

const links: Links = [
  { href: "/user", icon: HomeIcon },
  { href: "/user/profile", icon: ProfileIcon },
  { href: "/user/logs", icon: LogsIcon },
];

const highlightPath = (
  <div className="absolute bottom-[5px] h-[1px] w-5 bg-white" />
);

export const LinkButtons = () => {
  const path = usePathname();

  return (
    <>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`relative flex grow items-center justify-center rounded-xl shadow-md transition active:scale-95 ${
            link.href === path ? "active-page" : "idle-page"
          }`}
        >
          {link.icon}
          {link.href === path && highlightPath}
        </Link>
      ))}
    </>
  );
};

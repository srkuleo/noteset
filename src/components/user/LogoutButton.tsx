import { LogoutIcon } from "@/icons/user/logout";
import Link from "next/link";

export const LogoutButton = () => {
  return (
    <Link
      href="/login"
      className="flex items-center rounded-xl bg-white p-2 shadow-md dark:bg-slate-800"
    >
      <LogoutIcon />
    </Link>
  );
};

import { LogoutIcon } from "../../icons/user/logout";
import Link from "next/link";

export const LogoutButton = () => {
  return (
    <Link
      href="/login"
      className="flex items-center rounded-xl bg-white px-3 py-2 shadow-md active:scale-95 dark:bg-slate-800"
    >
      {LogoutIcon}
    </Link>
  );
};

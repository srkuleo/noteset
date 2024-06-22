import { LogoutIcon } from "../icons/user/logout";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";

export const LogoutButton = () => {
  return (
    <LogoutLink className="flex items-center rounded-xl bg-white px-4 py-2 shadow-md dark:ring-1 dark:ring-inset dark:ring-slate-700/80 active:scale-95 dark:bg-slate-800">
      {LogoutIcon}
      <p className="sr-only">Logout button</p>
    </LogoutLink>
  );
};

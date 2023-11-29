import { signOut } from "@/auth";
import { LogoutIcon } from "../../icons/user/logout";

export const LogoutButton = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button className="flex items-center rounded-xl bg-white px-3 py-2 shadow-md active:scale-95 dark:bg-slate-800">
        {LogoutIcon}
      </button>
    </form>
  );
};

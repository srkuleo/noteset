import Link from "next/link";
import {
  HomeIcon,
  ProfileIcon,
  LogsIcon,
  EditIcon,
  LogoutIcon,
} from "@/components/Svgs";

export const Navbar = () => {
  return (
    <div className="fixed inset-x-0 bottom-0 flex justify-between bg-green-600 px-4 pb-6 pt-2 dark:bg-green-800">
      <button className="flex flex-col items-center text-icon uppercase text-white">
        {HomeIcon}
        home
      </button>
      <button className="flex flex-col items-center text-icon uppercase text-white">
        {ProfileIcon}
        profile
      </button>
      <button className="flex flex-col items-center text-icon uppercase text-white">
        {LogsIcon}
        logs
      </button>
      <button className="flex flex-col items-center text-icon uppercase text-white">
        {EditIcon}
        edit
      </button>
      <Link
        href="/login"
        className="flex flex-col items-center text-icon uppercase text-white"
      >
        {LogoutIcon}
        logout
      </Link>
    </div>
  );
};

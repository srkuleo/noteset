import Link from "next/link";
import {
  HomeIcon,
  ProfileIcon,
  LogsIcon,
  EditIcon,
  LogoutIcon,
} from "@/components/svgs";

export const Navbar = () => {
  return (
    <div className="fixed inset-x-0 bottom-0 flex justify-between bg-green-600 px-4 pb-6 pt-2 dark:bg-green-800">
      <button className="text-icon flex flex-col items-center uppercase text-white">
        {HomeIcon}
        home
      </button>
      <button className="text-icon flex flex-col items-center uppercase text-white">
        {ProfileIcon}
        profile
      </button>
      <button className="text-icon flex flex-col items-center uppercase text-white">
        {LogsIcon}
        logs
      </button>
      <button className="text-icon flex flex-col items-center uppercase text-white">
        {EditIcon}
        edit
      </button>
      <Link
        href="/login"
        className="text-icon flex flex-col items-center uppercase text-white"
      >
        {LogoutIcon}
        logout
      </Link>
    </div>
  );
};

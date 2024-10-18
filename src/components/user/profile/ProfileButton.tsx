import Link from "next/link";
import { getAuth } from "@/util/actions/auth";
import { ProfileButtonModal } from "./ProfileButtonModal";

export const ProfileButton = async () => {
  const { user } = await getAuth();

  if (!user) {
    return (
      <Link
        href="/login"
        className="rounded-lg bg-gradient-to-r from-violet-400 to-violet-500 px-3 py-1 font-semibold text-white shadow-md transition active:scale-95 active:from-violet-300 active:to-violet-400 dark:from-violet-500 dark:to-violet-600 dark:active:from-violet-700 dark:active:to-violet-800"
      >
        Login
        <p className="sr-only">Login button</p>
      </Link>
    );
  }

  const userInitial = user.username.substring(0, 1).toUpperCase();

  return (
    <ProfileButtonModal username={user.username} userInitial={userInitial} />
  );
};

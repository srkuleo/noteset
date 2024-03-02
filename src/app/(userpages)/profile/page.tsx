import type { Metadata } from "next";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const metadata: Metadata = {
  title: "Profile",
};

export default async function ProfilePage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <>
      <h2 className="text-2xl font-extrabold text-slate-600 dark:text-white pt-2 pb-6">
        Profile page
      </h2>
      <p className="">
        Full name: {user?.given_name} {user?.family_name}
      </p>
    </>
  );
}

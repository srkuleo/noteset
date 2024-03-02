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
      <p className="text-center text-lg font-semibold">Profile page</p>
      <p className="pt-10">
        Full name: {user?.given_name} {user?.family_name}
      </p>
    </>
  );
}

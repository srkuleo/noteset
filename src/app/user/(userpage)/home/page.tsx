import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

export default async function UserHomePage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  console.log({ user });

  return (
    <div className="flex grow flex-col items-center px-4 pb-8 pt-48 text-center text-lg font-semibold">
      {user && <p>{user.given_name}</p>}
      <p>Welcome to your Homepage</p>
    </div>
  );
}

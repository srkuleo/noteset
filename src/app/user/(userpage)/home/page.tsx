import type { Metadata } from "next";
import { auth } from "@/auth";
import { db } from "@/db";

export const metadata: Metadata = {
  title: "Home",
};

export default async function UserHomePage() {
  const session = await auth();

  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.id, session!.user.id),
  });

  return (
    <div className="flex grow flex-col items-center px-4 pb-8 pt-48 text-lg font-semibold">
      {user?.username ? (
        <p>Welcome {user.username} to your Homepage.</p>
      ) : (
        <p>Welcome {user?.name} to your Homepage.</p>
      )}
    </div>
  );
}

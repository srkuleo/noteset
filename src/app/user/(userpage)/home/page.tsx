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
    <div className="mx-4 mb-8 mt-40 grow bg-slate-500">
      {user?.username ? (
        <p>Welcome {user.username} to your Homepage.</p>
      ) : (
        <p>Welcome {user?.name} to your Homepage.</p>
      )}
    </div>
  );
}

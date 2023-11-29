import type { Metadata } from "next";
import { auth } from "@/auth";
import { db } from "@/db";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Home",
};

export default async function UserHomePage() {
  const session = await auth();

  if (!session?.user.id) {
    redirect("/api/auth/signin");
  }

  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.id, session.user.id),
  });

  return (
    <div className="grow px-4 pt-40">
      <p>Welcome {user?.username} to your Homepage.</p>
    </div>
  );
}

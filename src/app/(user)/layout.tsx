import { redirect } from "next/navigation";
import { getAuth } from "@/util/actions/auth";
import { UserPagesHeader } from "@/components/user/UserPagesHeader";

export default async function UserPagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await getAuth();

  if (!user) {
    redirect("/login");
  }

  return (
    <>
      <UserPagesHeader />
      {children}
    </>
  );
}

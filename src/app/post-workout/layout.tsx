import { redirect } from "next/navigation";
import { getAuth } from "@/util/actions/auth";
import { UserPagesHeader } from "@/components/UserPagesHeader";

export default async function PostWorkoutPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await getAuth();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex h-full flex-col pt-safe-top">
      <UserPagesHeader />
      {children}
    </div>
  );
}

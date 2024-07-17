import { redirect } from "next/navigation";
import { getAuth } from "@/util/actions/auth";
import { UserPagesHeadingText } from "@/components/user/UserPagesHeadingText";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Logs",
};

export default async function LogsPage() {
  const { user } = await getAuth();

  if (!user) {
    redirect("/login");
  }

  return (
    <>
      <div className="border-b border-slate-300/80 px-6 py-4 dark:border-slate-800">
        <UserPagesHeadingText label="Logs" />
      </div>

      <main className="px-6 py-2"></main>
    </>
  );
}

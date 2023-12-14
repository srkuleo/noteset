import type { Metadata } from "next";
import { getUserWorkouts } from "@/db/query";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { notFound } from "next/navigation";
import { EmptyPage } from "@/components/user/EmptyPage";
import { Workouts } from "@/components/user/Workouts";

export const metadata: Metadata = {
  title: "Home",
};

export default async function HomePage({
  params,
}: {
  params: { username: string };
}) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user.given_name?.toLowerCase() !== params.username) notFound();

  const workouts = await getUserWorkouts(user.id);

  if (workouts.length < 1) {
    return <EmptyPage username={params.username} />;
  }

  return <Workouts username={params.username} workouts={workouts} />;
}

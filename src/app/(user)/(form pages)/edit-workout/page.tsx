import { notFound, redirect } from "next/navigation";
import { getAuthSession } from "@/util/session";
import { getWorkoutById } from "@/db/query";
import { EditWorkoutForm } from "@/components/user/EditWorkoutForm";

import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit",
};

type SearchParams = Promise<{ id: string }>;

export default async function EditWorkoutPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { user } = await getAuthSession();

  if (user === null) {
    redirect("/login");
  }

  const { id } = await searchParams;

  const coercedWorkoutId = Number(id);
  const workoutToEdit = await getWorkoutById(coercedWorkoutId);

  if (!workoutToEdit) notFound();

  return <EditWorkoutForm workoutToEdit={workoutToEdit} />;
}

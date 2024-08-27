import { notFound } from "next/navigation";
import { getWorkoutById } from "@/db/query";
import { EditWorkoutForm } from "@/components/user/EditWorkoutForm";

import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit",
};

export default async function EditWorkoutPage({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  const coercedWorkoutId = Number(searchParams.id);
  const workoutToEdit = await getWorkoutById(coercedWorkoutId);

  if (!workoutToEdit) notFound();

  return <EditWorkoutForm workoutToEdit={workoutToEdit} />;
}

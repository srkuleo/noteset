import { getWorkoutById } from "@/db/query";
import { notFound } from "next/navigation";
import { type Breadcrumb, Breadcrumbs } from "@/components/user/Breadcrumbs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit",
};

export default async function EditWorkoutPage({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  const coercedId = Number(searchParams.id);
  const workout = await getWorkoutById(coercedId);

  if (!workout) notFound();

  const breadcrumbs: Breadcrumb[] = [
    {
      label: "workouts",
      href: "/workouts",
    },
    {
      label: workout.title,
      href: `/workouts/edit?id=${searchParams.id}`,
      active: true,
    },
  ];

  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      This is the Edit page for {workout.title} workout
    </>
  );
}

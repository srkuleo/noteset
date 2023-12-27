import { getWorkoutByTitle } from "@/db/query";
import { notFound } from "next/navigation";
import { type Breadcrumb, Breadcrumbs } from "@/components/user/Breadcrumb";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit",
};

export default async function EditWorkoutPage({
  params,
}: {
  params: { title: string };
}) {
  const convertedTitleParam = decodeURI(params.title);
  const workout = await getWorkoutByTitle(convertedTitleParam);

  if (!workout) notFound();

  const breadcrumbs: Breadcrumb[] = [
    {
      label: "workouts",
      href: "/workouts",
    },
    {
      label: convertedTitleParam,
      href: `/workouts/edit/${params.title}`,
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

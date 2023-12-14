import { getWorkoutByTitle } from "@/db/query";
import { notFound } from "next/navigation";
import { type Breadcrumb, Breadcrumbs } from "@/components/user/Breadcrumb";

export default async function EditWorkoutPage({
  params,
}: {
  params: { username: string; title: string };
}) {
  const convertedTitleParam = decodeURI(params.title);
  const workout = await getWorkoutByTitle(convertedTitleParam);

  if (!workout) notFound();

  const breadcrumbsArr: Breadcrumb[] = [
    {
      label: params.username,
      href: `/${params.username}`,
    },
    {
      label: convertedTitleParam,
      href: `/${params.username}/edit/${params.title}`,
      active: true,
    },
  ];

  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbsArr} />
      This is the Edit page for {workout.title} workout
    </>
  );
}

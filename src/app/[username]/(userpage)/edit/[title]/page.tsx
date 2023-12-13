import { getWorkoutByTitle } from "@/db/query";
import type { Breadcrumb } from "@/util/types";
import Link from "next/link";
import { notFound } from "next/navigation";

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
    <div className="flex flex-col gap-4 px-6 pb-8 pt-48">
      <Breadcrumbs breadcrumbs={breadcrumbsArr} />
      This is the Edit page for {workout.title} workout
    </div>
  );
}

const Breadcrumbs = ({ breadcrumbs }: { breadcrumbs: Breadcrumb[] }) => {
  return (
    <ul className="flex items-end">
      {breadcrumbs.map((bc, index) => (
        <li key={bc.href} aria-current={bc.active}>
          <Link
            href={bc.href}
            className={`${
              bc.active
                ? "font-semibold uppercase"
                : "text-lg text-slate-400/80 dark:text-slate-600"
            }`}
          >
            {bc.label}
          </Link>
          {index < breadcrumbs.length - 1 && (
            <span className="px-4 text-xl text-slate-400/80 dark:text-slate-600">
              /
            </span>
          )}
        </li>
      ))}
    </ul>
  );
};

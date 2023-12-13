import type { Breadcrumb } from "@/util/types";
import Link from "next/link";

export default async function EditWorkoutPage({
  params,
}: {
  params: { username: string };
}) {
  const breadcrumbsArr: Breadcrumb[] = [
    {
      label: params.username,
      href: `/${params.username}`,
    },
    {
      label: "a new workout",
      href: `/${params.username}/create`,
      active: true,
    },
  ];

  return (
    <div className="flex flex-col gap-4 px-6 pb-8 pt-48">
      <Breadcrumbs breadcrumbs={breadcrumbsArr} />
      <p>On this page, you can add a new workout</p>
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

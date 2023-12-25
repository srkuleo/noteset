import { type Breadcrumb, Breadcrumbs } from "@/components/user/Breadcrumb";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function EditWorkoutPage({
  params,
}: {
  params: { username: string };
}) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if ((user && user.given_name?.toLowerCase()) !== params.username) notFound();

  const breadcrumbsArr: Breadcrumb[] = [
    {
      label: params.username,
      href: `/${params.username}`,
    },
    {
      label: "create",
      href: `/${params.username}/create`,
      active: true,
    },
  ];

  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbsArr} />
      <div className="rounded-lg bg-white p-4 shadow-md ring-1 ring-slate-400/30 dark:bg-slate-800">
        <p className="pb-6 text-lg font-semibold">Create a new workout</p>
        <form action="" className="space-y-4">
          <label className="flex flex-col gap-1">
            <span className="pl-1 text-sm font-semibold uppercase text-slate-400 dark:text-slate-300">
              Title
            </span>
            <input
              type="text"
              name="title"
              placeholder="e.g. Upper 1"
              className="input-field"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="pl-1 text-sm font-semibold uppercase text-slate-400 dark:text-slate-300">
              Description
            </span>
            <input
              type="text"
              name="description"
              placeholder="e.g. Upper body focused workout"
              className="input-field"
            />
          </label>
          <div className="flex justify-end gap-4 pt-4">
            <Link
              href={`/${params.username}`}
              className="rounded-lg bg-slate-50 px-3 py-2 text-slate-600 ring-1 ring-inset ring-slate-300 active:scale-95"
            >
              Cancel
            </Link>
            <button className="rounded-lg bg-green-500 px-3 py-2 text-white active:scale-95 dark:bg-green-600">
              Create workout
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

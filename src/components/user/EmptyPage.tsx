import { EmptyIcon } from "@/icons/user/error";
import Link from "next/link";

export const EmptyPage = ({ username }: { username: string }) => {
  return (
    <div className="flex grow flex-col items-center justify-center gap-8 px-4 pb-8">
      <div className=" text-slate-400/60 dark:text-slate-700/80">
        {EmptyIcon}
      </div>
      <div className="space-y-2 text-center">
        <h2 className="text-xl font-semibold dark:text-slate-300">
          Seems like you don&apos;t have any workouts available
        </h2>
        <p className="text-sm text-slate-400 dark:text-slate-500">
          Go to create page and start adding new ones
        </p>
      </div>
      <Link
        href={`/${username}/create`}
        className="rounded-xl bg-violet-500 px-3 py-2 font-semibold text-white shadow-sm dark:bg-violet-600"
      >
        Create page
      </Link>
    </div>
  );
};
import { PreviewIcon } from "@/icons/user/preview";
import { AddIcon, EditIcon, DeleteIcon } from "@/icons/user/modify";
import Link from "next/link";

type Workout = {
  id: number;
  title: string | null;
  description: string | null;
};

export const Workouts = async ({
  username,
  workouts,
}: {
  username: string;
  workouts: Workout[];
}) => {
  return (
    <div className="flex grow flex-col gap-2 px-6 pb-8 pt-52">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Your current workouts</h1>
        <Link
          className="rounded-lg bg-white p-2 shadow-sm active:scale-95 dark:bg-slate-800"
          href={`/${username}/create`}
        >
          {AddIcon}
        </Link>
      </div>
      {workouts.map((workout) => (
        <div
          key={workout.id}
          className="flex w-full flex-col gap-4 rounded-xl bg-white/90 p-3 shadow-sm dark:bg-slate-800/90"
        >
          <div className="space-y-1 border-b border-slate-200 pb-4 pl-1 dark:border-slate-700">
            <p className="font-bold dark:text-slate-300">{workout.title}</p>
            <p className="text-sm italic text-slate-400/70 dark:text-slate-500">
              {workout.description}
            </p>
          </div>
          <div className="flex justify-between">
            <div className="flex gap-2">
              <button className="rounded-lg px-2 py-1 shadow-md ring-1 ring-inset ring-slate-300 dark:ring-slate-500">
                {PreviewIcon}
              </button>
              <button className="rounded-lg bg-gradient-to-r from-violet-400 to-violet-500 px-3 py-1 text-white shadow-md dark:from-violet-500 dark:to-violet-600">
                Start
              </button>
            </div>
            <div className="flex gap-2">
              <Link
                href={`/${username}/edit/${workout.title?.toLowerCase()}`}
                className="flex items-center rounded-full bg-green-300 px-2 active:scale-95 dark:bg-green-600"
              >
                {EditIcon}
              </Link>
              <button className="rounded-full bg-red-500/90 px-2 text-white active:scale-95 dark:bg-red-600">
                {DeleteIcon}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

import { Suspense } from "react";
import { BackButtonModal } from "@/components/BackButtonModal";
import { WorkoutToDoTitle } from "@/components/workout-to-do/WorkoutToDoTitle";
import { WorkoutToDoTooltip } from "@/components/Tooltips";
import { WorkoutToDoSkeleton } from "@/components/Loading";
import { WorkoutToDoDataFetcher } from "@/components/workout-to-do/WorkoutToDoDataFetcher";

export default async function WorkoutToDoPage({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  const workoutId = Number(searchParams.id);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-20 bg-gradient-to-r from-green-600 from-20% to-violet-600 pt-safe-top dark:from-green-700 dark:to-violet-700">
        <div className="flex justify-between px-4 py-2">
          <div className="flex items-center gap-4">
            <BackButtonModal className="rounded-full p-1.5 text-white active:bg-slate-300/60 dark:active:bg-slate-300/50" />

            <Suspense
              fallback={
                <div className="mr-auto h-7 w-24 animate-pulse rounded-xl bg-white/20" />
              }
            >
              <WorkoutToDoTitle workoutId={workoutId} />
            </Suspense>
          </div>

          <WorkoutToDoTooltip />
        </div>
      </header>

      <Suspense fallback={<WorkoutToDoSkeleton />}>
        <WorkoutToDoDataFetcher workoutId={workoutId} />
      </Suspense>
    </>
  );
}

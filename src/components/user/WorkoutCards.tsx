"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { showToast } from "./Toasts";
import { EmptyPage } from "./EmptyPage";
import { EditSection } from "./EditSection";
import { RemoveWorkoutModal } from "./RemoveWorkoutModal";
import { PreviewWorkoutButton } from "./PreviewWorkoutButton";

import type { Workout } from "@/db/schema";

export const WorkoutCards = ({ workouts }: { workouts: Workout[] }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [openRemoveModal, setOpenRemoveModal] = useState(false);
  const [workoutToRemove, setWorkoutToRemove] = useState({ title: "", id: 0 });

  const message = searchParams.get("message");

  useEffect(() => {
    if (message) {
      //Shows toast if searchParam is provided
      showToast(message, "success");

      /* Replaces the URL with original /workouts route, preventing toast 
      from re-rendering on subsequent reloads */
      router.replace("/workouts");
    }
  });

  return (
    <>
      <RemoveWorkoutModal
        open={openRemoveModal}
        setOpen={setOpenRemoveModal}
        workoutToRemove={workoutToRemove}
      />

      {workouts.length < 1 ? (
        <EmptyPage />
      ) : (
        <div className="space-y-4">
          {workouts.map((workout) => (
            <div
              key={workout.id}
              className="flex w-full flex-col gap-4 rounded-xl border border-slate-300/60 bg-white px-4 py-6 shadow-md dark:border-slate-700/50 dark:bg-slate-800/90"
            >
              <div className="space-y-1.5 px-1">
                <p className="text-pretty font-manrope text-lg font-bold uppercase dark:text-slate-300">
                  {workout.title}
                </p>
                <p className="text-pretty text-sm font-semibold italic leading-none text-slate-400/80 dark:text-slate-400/60">
                  {workout.description}
                </p>
              </div>

              <div className="h-[1px] bg-green-200 dark:bg-green-900/70" />

              <div className="flex justify-between px-1">
                <div className="flex gap-2">
                  <PreviewWorkoutButton workout={workout} />
                  <Link
                    href={`/workout?id=${workout.id}`}
                    className="flex items-center rounded-lg bg-gradient-to-r from-violet-400 to-violet-500 px-4 py-1 font-manrope text-xs text-white shadow-md transition active:scale-95 dark:from-violet-500 dark:to-violet-600"
                  >
                    Go to Workout
                    <p className="sr-only">Start this workout</p>
                  </Link>
                </div>

                <EditSection
                  workout={workout}
                  setOpenRemoveModal={setOpenRemoveModal}
                  setWorkoutToRemove={setWorkoutToRemove}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

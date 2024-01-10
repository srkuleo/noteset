"use client";

import Link from "next/link";
import { manrope } from "@/styles/fonts";
import { useState } from "react";
import { EditSection } from "./EditSection";
import { PreviewWorkoutButton } from "./PreviewWorkoutButton";
import { EditWorkoutButton } from "./EditWorkoutButton";
import { RemoveWorkoutButton } from "./RemoveWorkoutButton";

export type Workout = {
  id: number;
  title: string;
  description: string;
};

export const Workouts = ({ workouts }: { workouts: Workout[] }) => {
  const [editMode, setEditMode] = useState(false);

  function toggleEditMode() {
    setEditMode(!editMode);
  }

  return (
    <>
      <EditSection toggleEditMode={toggleEditMode} />
      <div className="space-y-4">
        {workouts.map((workout) => (
          <div
            key={workout.id}
            className="flex w-full flex-col gap-2 rounded-xl bg-white px-3 py-3 shadow-md dark:bg-slate-800/90"
          >
            <div className="flex items-center justify-between border-b border-green-200 px-1 pb-2 dark:border-green-900/80">
              <div className="space-y-1">
                <p className="text-lg font-bold dark:text-slate-300">
                  {workout.title}
                </p>
                <p className="text-balance text-sm italic text-slate-400/80 dark:text-slate-400/60">
                  {workout.description}
                </p>
              </div>
              <EditWorkoutButton editMode={editMode} workout={workout} />
            </div>
            <div className="flex justify-between px-1 py-2">
              <div className="flex gap-2">
                <PreviewWorkoutButton workout={workout} />
                <Link
                  href={`/workout?id=${workout.id}`}
                  className={`rounded-lg bg-gradient-to-r from-violet-400 to-violet-500 px-4 py-1 font-semibold text-white shadow-md transition active:scale-95 dark:from-violet-500 dark:to-violet-600 ${manrope.className}`}
                >
                  Start
                </Link>
              </div>
              <RemoveWorkoutButton editMode={editMode} workout={workout} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

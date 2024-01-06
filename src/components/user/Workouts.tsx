"use client";

import { PreviewIcon } from "@/icons/user/preview";
import { AddWorkoutIcon, EditIcon } from "@/icons/user/modify";
import Link from "next/link";
import { useState } from "react";
import { manrope } from "@/styles/fonts";
import { EditWorkoutButton } from "./EditWorkoutButton";
// import { RemoveWorkoutButton } from "./RemoveWorkoutButton";
import { AltRemoveModal } from "./AltRemoveModal";

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
                <p className="text-balance text-xs italic text-slate-400/80">
                  {workout.description}
                </p>
              </div>
              <EditWorkoutButton editMode={editMode} workout={workout} />
            </div>
            <div className="flex justify-between px-1 py-2">
              <div className="flex gap-2">
                <button className="rounded-lg px-2 py-1 shadow-md ring-1 ring-inset ring-slate-300 transition active:scale-95 dark:shadow-slate-900 dark:ring-slate-600">
                  {PreviewIcon}
                </button>
                <Link
                  href={`/workout?id=${workout.id}`}
                  className={`rounded-lg bg-gradient-to-r from-violet-400 to-violet-500 px-4 py-1 font-semibold text-white shadow-md transition active:scale-95 dark:from-violet-500 dark:to-violet-600 ${manrope.className}`}
                >
                  Start
                </Link>
              </div>
              {/* <RemoveWorkoutButton editMode={editMode} workout={workout} /> */}
              <AltRemoveModal editMode={editMode} workout={workout} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

const EditSection = ({ toggleEditMode }: { toggleEditMode: () => void }) => {
  return (
    <div className="flex items-center justify-between pb-4">
      <h1
        className={`text-xl font-bold text-slate-600 dark:text-white ${manrope.className}`}
      >
        Your current workouts
      </h1>
      <div className="flex gap-2">
        <Link
          href="/workouts/create"
          className="rounded-xl bg-white p-2 shadow-sm transition active:scale-95 dark:bg-slate-800 dark:ring-1 dark:ring-slate-700"
        >
          {AddWorkoutIcon}
        </Link>
        <button
          onClick={toggleEditMode}
          className="rounded-xl bg-green-500 p-2 text-white shadow-sm transition active:scale-95 dark:bg-green-600"
        >
          {EditIcon}
        </button>
      </div>
    </div>
  );
};

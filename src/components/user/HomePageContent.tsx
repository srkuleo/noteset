"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { unarchiveWorkout } from "@/util/actions/workout";
import { showToast } from "../Toasts";
import {
  BUTTON_TIMEOUT,
  SWIPE_AND_DRAWER_TIMEOUT,
  timeout,
} from "@/util/utils";
import { EmptyIcon } from "../icons/user/warning";
import { RemoveWorkoutModal } from "./RemoveWorkoutModal";
import { SwipeAction } from "../swipe/SwipeAction";
import { StatusIndicator } from "../StatusIndicator";
import { ShowIcon, SolidShowIcon } from "../icons/user/preview";
import {
  SolidEditIcon,
  SolidTrashBinIcon,
  TrashBinIcon,
} from "../icons/user/modify";
import { PreviewWorkoutDrawer } from "./PreviewWorkoutDrawer";

import type { PartialWorkoutType } from "@/db/schema";
import type { WorkoutStatusType } from "@/util/types";

const initWorkoutToRemove: {
  title: string;
  id: number;
  status: WorkoutStatusType;
} = {
  title: "",
  id: 0,
  status: "current",
};

const initWorkoutToPreview: PartialWorkoutType = {
  id: 0,
  title: "",
  description: "",
  exercises: [],
  status: "current",
};

type WorkoutSwipeActions = {
  openPreviewDrawer: () => void;
  openRemoveModal: () => void;
  workoutToEditId: number;
  workoutToPreview: () => void;
  workoutToRemove: () => void;
};

export const HomePageContent = ({
  workouts,
  status,
}: {
  workouts: PartialWorkoutType[];
  status: WorkoutStatusType;
}) => {
  const [openRemoveModal, setOpenRemoveModal] = useState(false);
  const [openPreviewModal, setOpenPreviewModal] = useState(false);
  const [workoutToRemove, setWorkoutToRemove] = useState(initWorkoutToRemove);
  const [workoutToPreview, setWorkoutToPreview] =
    useState(initWorkoutToPreview);

  return (
    <>
      <RemoveWorkoutModal
        open={openRemoveModal}
        setOpen={setOpenRemoveModal}
        workoutToRemove={workoutToRemove}
      />

      <PreviewWorkoutDrawer
        workout={workoutToPreview}
        open={openPreviewModal}
        setOpen={setOpenPreviewModal}
      />

      {workouts.length === 0 ? (
        <main className="mt-safe-top flex flex-col justify-center px-6 pb-[100px] pt-[157px]">
          <EmptyPage status={status} />
        </main>
      ) : (
        <main className="mt-safe-top space-y-4 px-6 pb-[100px] pt-[157px]">
          {workouts.map((workout) => (
            <SwipeAction.Root key={workout.id}>
              <SwipeAction.Trigger className="flex items-center justify-between rounded-xl border border-slate-300/80 bg-white p-6 shadow-md dark:border-slate-700 dark:bg-slate-800">
                <div className="w-3/5 space-y-1">
                  <p className="text-pretty font-manrope text-lg font-bold uppercase dark:text-slate-300">
                    {workout.title}
                  </p>

                  <p className="text-pretty text-sm font-semibold italic leading-none text-slate-400/80 dark:text-slate-400/60">
                    {workout.description
                      ? workout.description
                      : "Description not provided"}
                  </p>
                </div>

                <div className="flex flex-col items-center gap-4">
                  <StatusIndicator
                    status={workout.status}
                    className="px-3 py-2 ring-slate-300/80 dark:bg-slate-900 dark:ring-slate-700"
                  />

                  {workout.status === "current" ? (
                    //Start button on current workouts
                    <Link
                      href={`/workout-to-do?id=${workout.id}`}
                      scroll={false}
                      className="flex rounded-lg bg-gradient-to-r from-violet-400 to-violet-500 px-4 py-1 font-bold text-white shadow-md transition active:scale-90 active:from-violet-300 active:to-violet-400 dark:from-violet-500 dark:to-violet-600 dark:active:from-violet-700 dark:active:to-violet-800"
                    >
                      Start
                      <p className="sr-only">Start this workout</p>
                    </Link>
                  ) : (
                    //Button to unarchive an archived workout
                    <form
                      action={async () => {
                        const res = await unarchiveWorkout(
                          workout.id,
                          workout.title,
                        );

                        if (res.status === "success-redirect") {
                          showToast(
                            res.message,
                            "/home?q=current",
                            "See current",
                          );
                        } else {
                          showToast(res.message);
                        }
                      }}
                    >
                      <button
                        type="submit"
                        className="flex rounded-lg bg-gradient-to-r from-blue-400 to-blue-500 px-3 py-1.5 text-sm font-bold text-white shadow-md transition active:scale-90 active:from-blue-300 active:to-blue-400 dark:from-blue-500 dark:to-blue-600 dark:active:from-blue-700 dark:active:to-blue-800"
                      >
                        Unarchive
                      </button>
                    </form>
                  )}
                </div>
              </SwipeAction.Trigger>

              {workout.status === "current" && (
                //Current workouts swipe actions - flex row design
                <CurrentWorkoutsSwipeActions
                  openPreviewDrawer={() => setOpenPreviewModal(true)}
                  openRemoveModal={() => setOpenRemoveModal(true)}
                  workoutToEditId={workout.id}
                  workoutToPreview={() => setWorkoutToPreview(workout)}
                  workoutToRemove={() =>
                    setWorkoutToRemove({
                      id: workout.id,
                      title: workout.title,
                      status: workout.status,
                    })
                  }
                />
              )}

              {workout.status === "archived" && (
                //Archived workouts swipe actions - flex column design
                <ArchivedWorkoutsSwipeActions
                  openPreviewDrawer={() => setOpenPreviewModal(true)}
                  openRemoveModal={() => setOpenRemoveModal(true)}
                  workoutToPreview={() => setWorkoutToPreview(workout)}
                  workoutToRemove={() =>
                    setWorkoutToRemove({
                      id: workout.id,
                      title: workout.title,
                      status: workout.status,
                    })
                  }
                />
              )}
            </SwipeAction.Root>
          ))}
        </main>
      )}
    </>
  );
};

const EmptyPage = ({ status }: { status: WorkoutStatusType }) => {
  return (
    <div className="flex flex-col items-center gap-8 pb-18">
      <div className="text-slate-400/60 dark:text-slate-700/80">
        {EmptyIcon}
      </div>

      {status === "archived" ? (
        <div className="max-w-[80%] space-y-4 text-center">
          <h3>Nothing in archive</h3>
          <p className="font-semibold italic text-slate-400/85">
            Tap the{" "}
            <span className="font-bold uppercase text-slate-500 dark:text-white">
              C
            </span>{" "}
            button to load current workouts
          </p>
        </div>
      ) : (
        <div className="max-w-[90%] space-y-4 text-center">
          <h3>Seems like you haven&apos;t created any workout yet</h3>
          <p className="font-semibold italic text-slate-400/85">
            Tap the{" "}
            <span className="font-bold uppercase text-slate-500 dark:text-white">
              plus
            </span>{" "}
            button to create one
          </p>
        </div>
      )}
    </div>
  );
};

const CurrentWorkoutsSwipeActions = ({
  openPreviewDrawer,
  openRemoveModal,
  workoutToEditId,
  workoutToPreview,
  workoutToRemove,
}: WorkoutSwipeActions) => {
  const router = useRouter();

  return (
    <SwipeAction.Actions
      wrapperClassName="bg-red-200 dark:bg-red-600 rounded-xl"
      className="w-2/3"
    >
      <SwipeAction.Action
        onClick={async () => {
          await timeout(SWIPE_AND_DRAWER_TIMEOUT);

          workoutToRemove();
          openRemoveModal();
        }}
        className="flex w-1/3 flex-col items-center justify-center gap-1 bg-red-200 text-red-600 dark:bg-red-600 dark:text-white"
      >
        <SolidTrashBinIcon
          fill="currentColor"
          stroke="transparent"
          strokeWidth={0}
          className="size-7"
        />
        <p className="text-[11px] font-semibold uppercase">Remove</p>
        <span className="sr-only">Remove workout</span>
      </SwipeAction.Action>

      <SwipeAction.Action
        onClick={async () => {
          await timeout(SWIPE_AND_DRAWER_TIMEOUT);

          router.push(`/edit-workout?id=${workoutToEditId}`);
        }}
        className="flex w-1/3 flex-col items-center justify-center gap-1 bg-green-200 text-green-600 dark:bg-green-600 dark:text-white"
      >
        <SolidEditIcon
          fill="currentColor"
          stroke="transparent"
          strokeWidth={0}
          className="size-7"
        />
        <p className="text-[11px] font-semibold uppercase">Edit</p>
        <span className="sr-only">Edit workout</span>
      </SwipeAction.Action>

      <SwipeAction.Action
        onClick={async () => {
          await timeout(BUTTON_TIMEOUT);

          workoutToPreview();
          openPreviewDrawer();
        }}
        className="flex w-1/3 flex-col items-center justify-center gap-1 bg-violet-200 text-violet-600 dark:bg-violet-600 dark:text-white"
      >
        <SolidShowIcon
          fill="currentColor"
          stroke="transparent"
          strokeWidth={0}
          className="size-7"
        />
        <p className="text-[11px] font-semibold uppercase">Preview</p>
        <p className="sr-only">Preview workout</p>
      </SwipeAction.Action>
    </SwipeAction.Actions>
  );
};
const ArchivedWorkoutsSwipeActions = ({
  openPreviewDrawer,
  openRemoveModal,
  workoutToPreview,
  workoutToRemove,
}: Omit<WorkoutSwipeActions, "workoutToEditId">) => {
  return (
    <SwipeAction.Actions
      wrapperClassName="bg-violet-100 dark:bg-violet-500 rounded-xl"
      className="flex-col"
    >
      <SwipeAction.Action
        onClick={async () => {
          await timeout(BUTTON_TIMEOUT);

          workoutToPreview();
          openPreviewDrawer();
        }}
        className="flex grow items-center justify-center border-b border-violet-500 px-4 text-violet-500 dark:border-white dark:text-white"
      >
        <ShowIcon strokeWidth={1.5} className="size-7" />
        <p className="sr-only">Preview workout</p>
      </SwipeAction.Action>

      <SwipeAction.Action
        onClick={async () => {
          await timeout(SWIPE_AND_DRAWER_TIMEOUT);

          workoutToRemove();
          openRemoveModal();
        }}
        className="flex grow items-center justify-center px-4 text-red-500 dark:text-white"
      >
        <TrashBinIcon strokeWidth={1.5} className="size-7" />

        <span className="sr-only">Remove workout</span>
      </SwipeAction.Action>
    </SwipeAction.Actions>
  );
};

import { useEffect, useState } from "react";
import { Drawer } from "vaul";
import { twMerge } from "tailwind-merge";
import { BUTTON_TIMEOUT, timeout } from "@/util/utils";
import { HideIcon, ShowIcon } from "../icons/user/preview";
import { PreviewWorkoutTooltip } from "../Tooltips";
import { StatusIndicator } from "../StatusIndicator";

import type { PartialWorkoutType } from "@/db/schema";

export const PreviewWorkoutDrawerWithTrigger = ({
  workout,
  className,
  logMode,
}: {
  workout: PartialWorkoutType;
  className?: string;
  logMode?: boolean;
}) => {
  const [open, setOpen] = useState(false);

  function toggleDrawer() {
    setOpen(!open);
  }

  return (
    <>
      <button
        type="button"
        onClick={async () => {
          await timeout(BUTTON_TIMEOUT);
          setOpen(true);
        }}
        className={twMerge(
          "rounded-lg shadow-md ring-1 ring-inset active:scale-95",
          className,
        )}
      >
        <ShowIcon strokeWidth={1.3} className="size-6" />
        <p className="sr-only">Preview workout</p>
      </button>

      <PreviewWorkoutDrawer
        workout={workout}
        open={open}
        toggleDrawer={toggleDrawer}
        logMode={logMode}
      />
    </>
  );
};

export const PreviewWorkoutDrawer = ({
  workout,
  open,
  toggleDrawer,
  logMode,
}: {
  workout: PartialWorkoutType;
  open: boolean;
  toggleDrawer: () => void;
  logMode?: boolean;
}) => {
  const [exerciseNumber, setExerciseNumber] = useState("");
  const [workingSets, setWorkingSets] = useState("");

  useEffect(() => {
    const exerciseCount = logMode
      ? workout.exercises.filter((exercise) => exercise.sets.length >= 1).length
      : workout.exercises.length;

    const workingSetsCount = workout.exercises.reduce(
      (total, { sets, movementType }) => {
        const nonWarmupSets = sets.filter((set) => !set.warmup).length;

        return (
          total +
          (movementType === "unilateral" ? nonWarmupSets * 2 : nonWarmupSets)
        );
      },
      0,
    );

    setExerciseNumber(
      exerciseCount + (exerciseCount === 1 ? " exercise" : " exercises"),
    );
    setWorkingSets(
      workingSetsCount +
        " working " +
        (workingSetsCount === 1 ? "set" : "sets"),
    );
  }, [logMode, workout]);

  return (
    <Drawer.Root
      open={open}
      onOpenChange={toggleDrawer}
      noBodyStyles
      disablePreventScroll
    >
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-[9999] bg-slate-900/40 backdrop-blur-sm dark:bg-slate-950/70" />

        <Drawer.Content
          aria-describedby={undefined}
          className="fixed inset-x-0 bottom-0 z-[9999] mx-2 flex max-h-[80%] flex-col rounded-t-modal bg-white pb-8 ring-1 ring-slate-200 focus:outline-none dark:bg-slate-900 dark:ring-slate-700/70"
        >
          <div className="rounded-t-modal bg-slate-200/55 py-3 dark:bg-slate-800">
            <Drawer.Handle className="bg-slate-300 dark:bg-slate-600" />

            <div className="flex items-center justify-between px-4 pt-4">
              <div>
                <Drawer.Title className="flex items-center text-lg uppercase text-slate-800">
                  {workout.title}

                  <PreviewWorkoutTooltip />
                </Drawer.Title>

                <div
                  className={twMerge(
                    "divide flex divide-x font-manrope text-sm font-semibold leading-none text-green-500",
                    logMode
                      ? "divide-green-400 text-green-500 dark:divide-green-700"
                      : "divide-slate-300 text-slate-400 dark:divide-slate-500 dark:text-slate-400",
                  )}
                >
                  <p className="pr-1.5">{exerciseNumber}</p>

                  <p className="pl-1.5">{workingSets}</p>
                </div>
              </div>

              <StatusIndicator
                status={workout.status}
                className="bg-white px-4 py-2 ring-slate-300 dark:bg-slate-900 dark:ring-slate-700"
              />
            </div>
          </div>

          <ScrollableExerciseList workout={workout} logMode={logMode} />

          <button
            onClick={async () => {
              await timeout(BUTTON_TIMEOUT);

              toggleDrawer();
            }}
            className="mx-6 mb-8 mt-4 flex items-center justify-center gap-1 rounded-lg bg-slate-800 py-2 font-bold text-white outline-none active:bg-slate-600 dark:bg-white dark:font-extrabold dark:text-slate-800 active:dark:bg-slate-300"
          >
            Hide
            <HideIcon strokeWidth={1.5} className="size-[22px]" />
          </button>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

const ScrollableExerciseList = ({
  workout,
  logMode,
}: {
  workout: PartialWorkoutType;

  logMode?: boolean;
}) => {
  return (
    <div className="flex flex-1 flex-col gap-6 divide-y divide-slate-100 overflow-y-auto overscroll-y-contain border-t border-t-slate-300/50 px-6 pt-8 dark:divide-slate-700/70 dark:border-t-slate-700/70 md:justify-center">
      {workout.exercises.map(({ id, name, sets, note, movementType }) => {
        const isUnilateral = movementType === "unilateral";
        const workingSetsArr = sets.filter((set) => !set.warmup);

        return (
          <div key={id} className="flex flex-col pt-6 first:pt-0">
            <p
              className={twMerge(
                "text-center text-lg font-bold",
                logMode && "leading-none",
              )}
            >
              {name}
            </p>

            {!logMode && (
              <p
                className={twMerge(
                  "text-center text-sm italic",
                  movementType === "unilateral"
                    ? "text-orange-500"
                    : "text-green-500",
                )}
              >
                {(isUnilateral
                  ? workingSetsArr.length * 2
                  : workingSetsArr.length) +
                  " working " +
                  (workingSetsArr.length === 1 ? "set" : "sets")}
              </p>
            )}

            <div
              className={twMerge(
                "flex divide-x divide-slate-100 overflow-y-auto overscroll-contain px-3 py-6 dark:divide-slate-700/70",
                logMode && sets.length > 5
                  ? "justify-normal"
                  : "justify-center",
                !logMode && workingSetsArr.length > 5
                  ? "justify-normal"
                  : "justify-center",
              )}
            >
              {sets.length === 0 ? (
                <p className="italic text-slate-400">Skipped</p>
              ) : logMode ? (
                sets.map((set) => (
                  <div
                    key={set.id}
                    className="flex min-w-fit flex-col items-center gap-1 px-3 text-sm first:pl-0 last:pr-0"
                  >
                    <p
                      className={twMerge(
                        "font-bold text-slate-500 dark:text-white",
                        movementType === "unilateral" &&
                          !set.warmup &&
                          "dark:text-orange-500g text-orange-500",
                        movementType === "bilateral" &&
                          !set.warmup &&
                          "text-green-500 dark:text-green-500",
                      )}
                    >
                      {set.reps}
                    </p>

                    <p className="text-slate-400 dark:text-slate-200">
                      {set.weight}kg
                    </p>
                  </div>
                ))
              ) : (
                workingSetsArr.map((workingSet) => (
                  <div
                    key={workingSet.id}
                    className="flex min-w-fit flex-col items-center gap-1 px-3 text-sm first:pl-0 last:pr-0"
                  >
                    <p
                      className={twMerge(
                        "font-bold",
                        movementType === "unilateral"
                          ? "text-orange-500"
                          : "text-green-500",
                      )}
                    >
                      {workingSet.reps}
                    </p>

                    <p className="text-slate-400 dark:text-slate-200">
                      {workingSet.weight}kg
                    </p>
                  </div>
                ))
              )}
            </div>

            <p className="text-center text-sm italic">{note ?? "..."}</p>
          </div>
        );
      })}
    </div>
  );
};

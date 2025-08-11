import { useState } from "react";
import { Drawer } from "vaul";
import { twMerge } from "tailwind-merge";
import { useCalcExercisesAndWorkingSets } from "@/util/hooks/useCalcExercisesAndWorkingSets";
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
  const { totalExerciseNumber, totalWorkingSets } =
    useCalcExercisesAndWorkingSets(workout.exercises, logMode);

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
          className="fixed inset-x-0 bottom-0 z-[9999] mx-2 flex max-h-[80%] flex-col rounded-t-modal bg-white pb-6 ring-1 ring-slate-200 focus:outline-none dark:bg-slate-900 dark:ring-slate-700/70"
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
                    "divide flex divide-x font-manrope text-sm font-semibold italic leading-none text-green-500",
                    logMode
                      ? "divide-green-400 text-green-500 dark:divide-green-700"
                      : "divide-slate-300 text-slate-400 dark:divide-slate-500",
                  )}
                >
                  <p className="pr-1.5">{totalExerciseNumber}</p>

                  <p className="pl-1.5">{totalWorkingSets}</p>
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
            className="m-6 flex items-center justify-center gap-1 rounded-lg bg-slate-800 py-2 font-bold text-white outline-none active:bg-slate-600 dark:bg-white dark:font-extrabold dark:text-slate-800 active:dark:bg-slate-300"
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
    <div className="flex flex-1 flex-col divide-y divide-slate-100 overflow-y-auto overscroll-y-contain border-t border-t-slate-300/50 px-6 dark:divide-slate-700/70 dark:border-t-slate-700/70">
      {workout.exercises.map(({ id, name, sets, note, movementType }) => {
        const workingSets =
          sets.filter((set) => set.purpose === "working").length *
          (movementType === "unilateral" ? 2 : 1);

        return (
          <div key={id} className="flex flex-col py-8 last:pb-2">
            <p
              className={twMerge(
                "text-center text-lg font-bold leading-none",
                sets.length === 0 && "text-slate-300 dark:text-slate-500",
              )}
            >
              {name}
            </p>

            {!logMode && (
              <p
                className={twMerge(
                  "pt-1 text-center text-sm italic",
                  movementType === "unilateral"
                    ? "text-orange-500"
                    : "text-green-500",
                )}
              >
                {`${workingSets} working set${workingSets > 1 ? "s" : ""}`}
              </p>
            )}

            <div
              className={twMerge(
                "flex divide-x divide-slate-100 overflow-y-auto overscroll-contain px-3 py-6 dark:divide-slate-700/70 min-[500px]:justify-center",
                sets.length > 5 ? "justify-normal" : "justify-center",
              )}
            >
              {sets.length === 0 ? (
                <p className="italic text-slate-500 dark:text-slate-300">
                  Skipped
                </p>
              ) : (
                sets.map((set) => (
                  <div
                    key={set.id}
                    className="flex min-w-fit flex-col items-center gap-1 px-3 text-sm first:pl-0 last:pr-0"
                  >
                    <p
                      className={twMerge(
                        "font-bold text-slate-400 dark:text-slate-100",
                        movementType === "unilateral" &&
                          set.purpose === "working" &&
                          "dark:text-orange-500g text-orange-500",
                        movementType === "bilateral" &&
                          set.purpose === "working" &&
                          "text-green-500 dark:text-green-500",
                      )}
                    >
                      {set.reps}
                    </p>

                    <p
                      className={twMerge(
                        "text-slate-400/90 dark:text-slate-300/80",
                      )}
                    >
                      {set.weight}kg
                    </p>
                  </div>
                ))
              )}
            </div>

            <p
              className={twMerge(
                "text-center text-sm font-semibold italic leading-none",
                sets.length === 0 && "text-slate-300 dark:text-slate-500",
              )}
            >
              {!note || note === "" ? "..." : note}
            </p>
          </div>
        );
      })}
    </div>
  );
};

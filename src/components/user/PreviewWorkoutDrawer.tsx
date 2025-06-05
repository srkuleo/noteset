import { Fragment, useState } from "react";
import { Drawer } from "vaul";
import { BUTTON_TIMEOUT, timeout } from "@/util/utils";
import { HideIcon, ShowIcon } from "../icons/user/preview";
import { StatusIndicator } from "../StatusIndicator";

import type { PartialWorkoutType } from "@/db/schema";
import { twMerge } from "tailwind-merge";
import { PreviewWorkoutTooltip } from "../Tooltips";

export const PreviewWorkoutDrawer = ({
  workout,
  open,
  toggleDrawer,
}: {
  workout: PartialWorkoutType;
  open: boolean;
  toggleDrawer: () => void;
}) => {
  const workingSets = workout.exercises.reduce(
    (total, { sets, movementType }) => {
      const nonWarmupSets = sets.filter((set) => !set.warmup).length;

      return (
        total +
        (movementType === "unilateral" ? nonWarmupSets * 2 : nonWarmupSets)
      );
    },
    0,
  );

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
          className="fixed inset-x-0 bottom-0 z-[9999] mx-2 flex h-4/5 flex-col rounded-t-modal bg-white pb-8 ring-1 ring-slate-200 focus:outline-none dark:bg-slate-900 dark:ring-slate-700/70"
        >
          <div className="rounded-t-modal bg-slate-200/55 py-3 dark:bg-slate-800">
            <Drawer.Handle className="bg-slate-300 dark:bg-slate-600" />

            <div className="flex items-center justify-between px-4 pt-4">
              <div>
                <Drawer.Title className="flex items-center text-lg uppercase text-slate-800">
                  {workout.title}

                  <PreviewWorkoutTooltip />
                </Drawer.Title>

                <p className="text-sm font-semibold dark:text-slate-400">
                  {workout.exercises.length}{" "}
                  {workout.exercises.length > 1 ? "exercises" : "exercise"} /{" "}
                  {workingSets} working {workingSets === 1 ? "set" : "sets"}
                </p>
              </div>

              <StatusIndicator
                status={workout.status}
                className="bg-white px-4 py-2 ring-slate-300 dark:bg-slate-900 dark:ring-slate-700"
              />
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-6 divide-y divide-slate-100 overflow-y-auto overscroll-y-contain border-t border-t-slate-300/50 px-6 pt-8 dark:divide-slate-700/70 dark:border-t-slate-700/70 md:justify-center">
            {workout.exercises.map(({ id, name, sets, note, movementType }) => {
              const isUnilateral = movementType === "unilateral";
              const workingSetsArr = sets.filter((set) => !set.warmup);
              const workingSetsCount = isUnilateral
                ? workingSetsArr.length * 2
                : workingSetsArr.length;
              const movementTypeColour =
                movementType === "unilateral"
                  ? "text-orange-500"
                  : "text-green-500";

              return (
                <div key={id} className="flex flex-col pt-6 first:pt-0">
                  <div className="text-center">
                    <p className="text-lg font-bold">{name}</p>

                    <p
                      className={twMerge("text-sm italic", movementTypeColour)}
                    >
                      {workingSetsCount} working{" "}
                      {workingSetsCount === 1 ? "set" : "sets"}
                    </p>
                  </div>

                  <div
                    className={twMerge(
                      "flex divide-x divide-slate-100 overflow-y-auto overscroll-contain px-7 py-6 dark:divide-slate-700/70",
                      workingSetsArr.length >= 5
                        ? "justify-normal"
                        : "justify-center",
                    )}
                  >
                    {workingSetsArr.map((workingSet) => (
                      <div
                        key={workingSet.id}
                        className="flex min-w-fit flex-col items-center gap-1 px-3 text-sm first:pl-0 last:pr-0"
                      >
                        <p className={twMerge("font-bold", movementTypeColour)}>
                          {workingSet.reps}
                        </p>

                        <p className="text-slate-400 dark:text-slate-200">
                          {workingSet.weight}kg
                        </p>
                      </div>
                    ))}
                  </div>

                  <p className="text-center text-sm italic">{note ?? "..."}</p>
                </div>
              );
            })}
          </div>

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

export const PreviewWorkoutDrawerWithTrigger = ({
  workout,
  className,
}: {
  workout: PartialWorkoutType;
  className?: string;
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
      />
    </>
  );
};

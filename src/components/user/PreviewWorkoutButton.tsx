"use client";

import type { Workout } from "@/db/schema";
import { Drawer } from "vaul";
import { DrawerWrapper } from "./DrawerWrapper";
import { PreviewIcon } from "@/icons/user/preview";

export const PreviewWorkoutButton = ({ workout }: { workout: Workout }) => {
  return (
    <Drawer.Root>
      <Drawer.Trigger className="select-none rounded-lg px-2 py-1 shadow-md ring-1 ring-inset ring-slate-300 transition focus:outline-none active:scale-95 dark:shadow-slate-900 dark:ring-slate-600">
        {PreviewIcon}
      </Drawer.Trigger>

      <DrawerWrapper
        modalTitle="preview"
        closeButtonText="Done"
        workout={workout}
      >
        <p>You are previewing {workout.title} workout.</p>
        {workout.exercises.map((ex) => (
          <div key={ex.name}>{ex.name}</div>
        ))}
      </DrawerWrapper>
    </Drawer.Root>
  );
};

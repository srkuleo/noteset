import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { QuestionMarkIcon } from "../icons/user/question-mark";

export const FormTooltip = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <button
        type="button"
        onClick={async () => {
          await new Promise((resolve) => setTimeout(resolve, 100));
          setOpen(true);
        }}
        className={twMerge(
          "mr-1.5 rounded-full p-1.5 active:bg-slate-300/60 dark:active:bg-slate-300/50",
          open && "z-20",
        )}
      >
        <QuestionMarkIcon className="size-7 text-white" />
      </button>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-10 bg-slate-700/45 backdrop-blur-sm data-[state=closed]:animate-overlay-hide data-[state=open]:animate-overlay-show dark:bg-slate-950/45" />

        <Dialog.Content className="absolute right-8 top-[52px] z-10 max-w-[75%] pt-safe-top data-[state=closed]:animate-dropdown-menu-scale-down data-[state=open]:animate-dropdown-menu-scale-up sm:max-w-sm">
          <div className="flex flex-col gap-4 rounded-modal bg-white/75 p-6 ring-1 ring-slate-400/80 dark:bg-slate-800/85 dark:text-slate-400 dark:ring-slate-700">
            <Dialog.Title className="text-lg text-slate-800 dark:text-white sm:text-xl">
              Good to Know
            </Dialog.Title>

            <Dialog.Description asChild>
              <ul className="list-disc space-y-2 text-pretty pl-4 text-sm sm:text-base">
                <li>
                  Tap{" "}
                  <span className="font-bold uppercase text-green-500 dark:text-green-600">
                    plus
                  </span>{" "}
                  button to add a new exercise.
                </li>

                <li>
                  <span className="font-bold text-slate-800 dark:text-white">
                    You don&apos;t have to populate all the exercise fields
                  </span>
                  , only those that you have done.
                </li>

                <li>
                  <span className="font-bold uppercase text-slate-800 dark:text-white">
                    Add set
                  </span>{" "}
                  button allows you to add additional set for the selected
                  exercise.
                </li>

                <li>
                  <span className="font-bold uppercase text-slate-800 dark:text-white">
                    Add note
                  </span>{" "}
                  button lets you leave a note regarding selected exercise.
                </li>

                <li>
                  When done with working out, tap{" "}
                  <span className="font-bold uppercase text-green-500 dark:text-green-600">
                    Done
                  </span>{" "}
                  button to submit the form.
                </li>

                <li>
                  Workout duration is being{" "}
                  <span className="font-bold text-slate-800 dark:text-white">
                    tracked in the background.
                  </span>{" "}
                  You will be able to see the exact duration on the post-workout
                  page.
                </li>
              </ul>
            </Dialog.Description>

            <button
              type="button"
              onClick={async () => {
                await new Promise((resolve) => setTimeout(resolve, 100));
                setOpen(false);
              }}
              className="rounded-lg bg-slate-800 py-2 font-bold text-white outline-none active:bg-slate-600 dark:bg-white dark:font-extrabold dark:text-slate-800 active:dark:bg-slate-300"
            >
              Got it!
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
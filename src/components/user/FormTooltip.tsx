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
          "absolute right-11 top-[26px] rounded-full p-1 active:bg-white group-disabled:opacity-50 dark:active:bg-slate-700",
          open && "z-20",
        )}
      >
        <QuestionMarkIcon
          className={twMerge(
            "size-6 text-slate-400/80 dark:text-slate-500",
            open && "text-white dark:text-white",
          )}
        />
      </button>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-10 bg-slate-700/45 backdrop-blur-sm data-[state=closed]:animate-overlay-hide data-[state=open]:animate-overlay-show dark:bg-slate-950/45" />

        <Dialog.Content className="absolute right-[50px] top-[204px] z-10 max-w-[75%] pt-safe-top data-[state=closed]:animate-dropdown-menu-scale-down data-[state=open]:animate-dropdown-menu-scale-up sm:max-w-sm">
          <div className="flex flex-col gap-4 rounded-modal bg-white/75 p-6 ring-1 ring-slate-400/80 dark:bg-slate-800/85 dark:text-slate-400 dark:ring-slate-700">
            <Dialog.Title className="text-lg text-slate-800 dark:text-white sm:text-xl">
              Good to Know
            </Dialog.Title>

            <Dialog.Description asChild>
              <ul className="list-disc space-y-2 text-pretty pl-4 text-sm sm:text-base">
                <li>
                  Tap{" "}
                  <span className="font-bold uppercase text-violet-400 dark:text-violet-400">
                    plus
                  </span>{" "}
                  button to add a new exercise.
                </li>

                <li>
                  When done with adding or editing your workout, tap{" "}
                  <span className="font-bold uppercase text-green-500 dark:text-green-600">
                    check mark
                  </span>{" "}
                  button to submit the form.
                </li>

                <li>
                  Fields with &quot;e.g.&quot; or &quot;Rep 1, Weight 1&quot;
                  don&apos;t carry any value.{" "}
                  <span className="font-bold text-slate-800 dark:text-white">
                    Those must be provided with data.
                  </span>
                </li>

                <li>
                  You need to add{" "}
                  <span className="font-bold uppercase text-slate-800 dark:text-white">
                    at least one exercise
                  </span>{" "}
                  before submitting the form otherwise it will result in error.
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

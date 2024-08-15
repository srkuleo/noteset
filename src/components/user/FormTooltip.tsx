import * as Dialog from "@radix-ui/react-dialog";
import { QuestionMarkIcon } from "../icons/user/question-mark";

export const FormToolTip = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="absolute right-12 top-8 text-slate-400/80 focus:outline-none dark:text-slate-500">
        {QuestionMarkIcon}
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-10 bg-slate-700/45 backdrop-blur-sm data-[state=closed]:animate-overlay-hide data-[state=open]:animate-overlay-show dark:bg-slate-950/45" />

        <Dialog.Content className="absolute right-[50px] top-52 z-10 max-w-[75%] pt-safe-top data-[state=closed]:animate-dropdown-menu-scale-down data-[state=open]:animate-dropdown-menu-scale-up sm:max-w-sm">
          <div className="flex flex-col gap-4 rounded-modal bg-white/75 p-6 ring-1 ring-slate-400/80 dark:bg-slate-800/85 dark:text-slate-400 dark:ring-slate-700">
            <Dialog.Title className="text-lg text-slate-800 dark:text-white sm:text-xl">
              Form tips
            </Dialog.Title>

            <Dialog.Description asChild>
              <ul className="list-disc space-y-2 text-pretty pl-4 text-sm sm:text-base">
                <li>
                  Fields with &quot;e.g.&quot; or &quot;Rep 1, Weight 1&quot;
                  don&apos;t carry any value.{" "}
                  <span className="font-bold text-slate-800 dark:text-white">
                    Those must be provided with data.
                  </span>
                </li>
                <li>
                  On edit page, you will see inputs having dimmed colour values
                  - both workout and exercise forms.{" "}
                  <span className="font-bold text-slate-800 dark:text-white">
                    Only populate input fields that you intend to edit
                  </span>
                  , others (dimmed ones - excluding expections from the previous
                  paragraph) will automatically be populated for you with
                  previously provided values.
                </li>
              </ul>
            </Dialog.Description>

            <Dialog.Close className="rounded-lg bg-slate-800 py-2 font-bold text-white outline-none active:bg-slate-600 dark:bg-white dark:font-extrabold dark:text-slate-800 active:dark:bg-slate-300">
              Got it!
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

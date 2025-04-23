import { twMerge } from "tailwind-merge";
import { Drawer } from "vaul";
import { BUTTON_TIMEOUT, timeout } from "@/util/utils";

interface SubmitButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  loading: string;
  pending: boolean;
}

export const AuthButton = ({
  label,
  loading,
  pending,
  ...props
}: SubmitButtonProps) => {
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-8 rounded-full bg-green-500 px-4 py-2.5 font-manrope font-semibold text-white shadow-md active:scale-95 active:bg-green-400 disabled:pointer-events-none disabled:opacity-50 dark:bg-green-600 dark:active:bg-green-800"
      {...props}
    >
      {pending ? loading : label}
    </button>
  );
};

export const ModalSubmitButton = ({
  label,
  loading,
  pending,
  className,
  ...props
}: SubmitButtonProps) => {
  return (
    <button
      type="submit"
      disabled={pending}
      className={twMerge(
        "w-full rounded-xl bg-green-500 px-4 py-1.5 font-manrope font-semibold text-white shadow-sm active:scale-95 active:bg-green-400 disabled:pointer-events-none disabled:opacity-50 dark:bg-green-600 dark:active:bg-green-800",
        className,
      )}
      {...props}
    >
      {pending ? loading : label}
    </button>
  );
};

export const SubmitDoneWorkoutButton = ({
  formId,
  pending,
  open,
  setOpen,
  endWorkout,
}: {
  formId: string;
  pending: boolean;
  open: boolean;
  setOpen: (isOpen: boolean) => void;
  endWorkout: () => void;
}) => {
  return (
    <Drawer.Root
      open={open}
      onOpenChange={setOpen}
      noBodyStyles
      disablePreventScroll
    >
      <button
        type="button"
        onClick={async () => {
          await timeout(BUTTON_TIMEOUT);
          setOpen(true);
        }}
        className="px-3 py-1.5 text-xl font-extrabold text-green-500 active:scale-95 active:text-green-400 dark:text-green-600 dark:active:text-green-800"
      >
        Done
        <p className="sr-only">Done button</p>
      </button>

      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-[9999] bg-slate-900/40 backdrop-blur-sm dark:bg-slate-950/70" />

        <Drawer.Content
          aria-describedby={undefined}
          data-vaul-no-drag
          className="fixed inset-x-0 bottom-0 z-[9999] select-none space-y-4 px-4 pb-12 focus:outline-none"
        >
          <div className="flex flex-col gap-3 rounded-modal bg-white/90 text-center dark:bg-slate-700/70">
            <Drawer.Title className="px-2 pb-2 pt-5 text-sm font-semibold">
              Are you sure you want to submit workout?
            </Drawer.Title>

            <button
              type="submit"
              form={formId}
              disabled={pending}
              onClick={endWorkout}
              className="w-full rounded-b-modal border-t border-slate-400/40 p-3 font-manrope text-lg font-semibold text-green-500 focus:outline-none active:bg-slate-200 disabled:bg-slate-300/55 disabled:text-green-500/75 dark:border-slate-600 dark:active:bg-slate-600/90 dark:disabled:bg-slate-900/75"
            >
              {pending ? "Submitting..." : "Submit"}
            </button>
          </div>

          <button
            onClick={async () => {
              await timeout(BUTTON_TIMEOUT);

              setOpen(false);
            }}
            className="w-full rounded-modal bg-white p-3 text-xl font-bold text-violet-500 focus:outline-none active:bg-slate-200 dark:bg-slate-700 dark:text-violet-400 active:dark:bg-slate-600/90"
          >
            Cancel
          </button>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

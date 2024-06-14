import debounce from "lodash.debounce";
import { toast } from "sonner";

export const SuccessToast = ({ message }: { message: string }) => {
  return (
    <div className="pb-safe-bottom">
      <div className="flex justify-between gap-4 rounded-xl bg-white px-4 py-3 shadow-md ring-1 ring-slate-300/60 dark:bg-slate-900 dark:ring-slate-700/90">
        <div className="flex flex-col gap-0.5 font-manrope">
          <p className="font-bold text-green-600">Success!</p>
          <p className="text-sm font-semibold text-slate-400/95 dark:text-slate-200">
            {message}
          </p>
        </div>

        <button className="text-xs text-slate-400/80 underline underline-offset-2 dark:text-slate-300">
          Hide
        </button>
      </div>
    </div>
  );
};

export const ErrorToast = ({ message }: { message: string }) => {
  return (
    <div className="pb-safe-bottom">
      <div className="flex justify-between gap-4 rounded-xl bg-white px-4 py-3 shadow-md ring-1 ring-slate-300/60 dark:bg-slate-900 dark:ring-slate-700/90">
        <div className="flex flex-col gap-0.5 font-manrope">
          <p className="font-bold text-red-600">Oops...</p>
          <p className="text-sm font-semibold text-slate-400/95 dark:text-slate-200">
            {message}
          </p>
        </div>

        <button className="text-xs text-slate-400/80 underline underline-offset-2 dark:text-slate-300">
          Hide
        </button>
      </div>
    </div>
  );
};

type ToastType = "error" | "success";

export const showToast = debounce(
  (message: string, type: ToastType) =>
    toast.custom((t) => (
      <div onClick={() => toast.dismiss(t)}>
        {type === "success" ? (
          <SuccessToast message={message} />
        ) : (
          <ErrorToast message={message} />
        )}
      </div>
    )),
  250,
);

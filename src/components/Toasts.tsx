import Link from "next/link";
import debounce from "lodash.debounce";
import { toast } from "sonner";
import { ErrorIcon, SuccessIcon } from "./icons/user/toasts";

type ToastType = "error" | "success" | "success-redirect";

// Accepts 2-4 args
// - message to be rendered inside toast
// - type of toast (error, success, redirect) - different colours and design
// - path to which redirect button redirects user after clicking
// -linkText - text to be rendered as a redirect button
export const showToast = debounce(
  (message: string, type: ToastType, path?: string, linkText?: string) =>
    toast.custom((t) => (
      <div className="select-none pb-3">
        <div className="flex items-center justify-between gap-2 rounded-lg bg-white p-4 shadow-lg ring-[1.5px] ring-slate-400/55 dark:bg-slate-900 dark:shadow-black dark:ring-slate-800">
          <div className="flex items-center gap-1.5">
            {type === "success" ? (
              <SuccessIcon />
            ) : type === "error" ? (
              <ErrorIcon />
            ) : null}

            <p className="font-manrope text-sm text-slate-800 dark:text-slate-200">
              {message}
            </p>
          </div>

          {path && linkText ? (
            <Link
              href={path}
              onClick={() => toast.dismiss(t)}
              className="text-center font-bold text-green-500"
            >
              {linkText}
            </Link>
          ) : (
            <button
              onClick={() => toast.dismiss(t)}
              className="text-center font-bold text-green-500"
            >
              Close
            </button>
          )}
        </div>
      </div>
    )),
  250,
);

import Link from "next/link";
import debounce from "lodash.debounce";
import { toast } from "sonner";

// Accepts 1-3 args
// - message to be rendered inside toast
//   Optional - if toast should redirect:
// - path - user is being redirected to after clicking the button inside toast
// - linkText - text to be rendered as the redirect button

export const showToast = debounce(
  (message: string, path?: string, linkText?: string) =>
    toast.custom(
      (t) => (
        <div className="select-none pb-8">
          <div className="flex items-center justify-between rounded-lg bg-white p-4 text-sm shadow-lg ring-[1.5px] ring-slate-400/55 dark:bg-slate-900 dark:shadow-black dark:ring-slate-800">
            <div className="flex max-w-[75%] items-center gap-1.5">
              <p className="font-manrope text-slate-600 dark:text-slate-200">
                {message}
              </p>
            </div>

            {path && linkText ? (
              <Link
                href={path}
                onClick={() => toast.dismiss(t)}
                className="text-center font-semibold text-green-500"
              >
                {linkText}
              </Link>
            ) : (
              <button
                onClick={() => toast.dismiss(t)}
                className="text-center font-semibold text-green-500"
              >
                Close
              </button>
            )}
          </div>
        </div>
      ),
      { unstyled: true },
    ),
  250,
);

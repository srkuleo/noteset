import Link from "next/link";
import debounce from "lodash.debounce";
import { toast } from "sonner";
import { ErrorIcon, SuccessIcon } from "./icons/user/toasts";

type ToastType = "error" | "success" | "success-redirect";

export const showToast = debounce(
  (message: string, type: ToastType, path?: string, linkText?: string) =>
    // Accepts 2-4 args
    toast.custom((t) => (
      <div onClick={() => toast.dismiss(t)} className="select-none pb-16">
        <Toast message={message} type={type} path={path} linkText={linkText} />
      </div>
    )),
  250,
);

export const Toast = ({
  message,
  type,
  path,
  linkText,
}: {
  message: string;
  type: ToastType;
  path?: string;
  linkText?: string;
}) => {
  return (
    <div className="flex items-center justify-between gap-2 rounded-lg bg-white p-4 font-manrope text-sm shadow-lg ring-[1.5px] ring-slate-400/55 dark:bg-slate-900 dark:shadow-black dark:ring-slate-800">
      <div className="flex items-center gap-1.5">
        {type === "success" ? (
          <SuccessIcon />
        ) : type === "error" ? (
          <ErrorIcon />
        ) : null}

        <p className="text-slate-800 dark:text-slate-200">{message}</p>
      </div>

      {path && linkText && (
        <Link href={path} className="text-center font-bold text-green-500">
          {linkText}
        </Link>
      )}
    </div>
  );
};

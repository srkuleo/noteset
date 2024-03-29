import debounce from "lodash.debounce";
import { toast } from "sonner";
import { ErrorIcon, SuccessIcon } from "../icons/user/feedback";

const SuccessToast = ({ message }: { message: string }) => {
  return (
    <div className="pb-safe-bottom">
      <div className="flex items-center gap-4 rounded-xl bg-green-50 px-4 py-2 shadow-md">
        <SuccessIcon />

        <div className="flex flex-col gap-0.5 font-manrope text-green-600">
          <p className="font-bold">Success!</p>
          <p className="text-sm font-semibold text-green-500">{message}</p>
        </div>
      </div>
    </div>
  );
};

const ErrorToast = ({ message }: { message: string }) => {
  return (
    <div className="pb-safe-bottom">
      <div className="flex items-center gap-4 rounded-xl bg-red-50 px-4 py-2 shadow-md">
        <ErrorIcon />

        <div className="flex flex-col gap-0.5 font-manrope">
          <p className="font-bold text-red-600">Oops!</p>
          <p className="text-sm font-semibold text-red-400">{message}</p>
        </div>
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
  200,
);

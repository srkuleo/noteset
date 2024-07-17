"use client";

import { useFormStatus } from "react-dom";
import { twMerge } from "tailwind-merge";

type SubmitButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string | React.ReactNode;
  loading: string | React.ReactNode;
};

export const SubmitFormButton = ({
  label,
  loading,
  className,
}: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={twMerge(
        "rounded-lg bg-green-500 px-4 py-1.5 font-manrope font-semibold text-white shadow-sm active:scale-95 disabled:pointer-events-none disabled:opacity-50 dark:bg-green-600",
        className,
      )}
    >
      {pending ? loading : label}
    </button>
  );
};

export const ConfirmLogOutButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-b-modal border-t border-slate-400/40 p-3 font-manrope text-lg font-semibold text-green-500 focus:outline-none active:bg-slate-200 disabled:bg-slate-300/55 disabled:text-green-500/75 dark:border-slate-600 active:dark:bg-slate-600/90 disabled:dark:bg-slate-900/75 disabled:dark:text-green-800"
    >
      {pending ? "Logging Out..." : "Log Out"}
    </button>
  );
};

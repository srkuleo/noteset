"use client";

import { useFormStatus } from "react-dom";
import { twMerge } from "tailwind-merge";

type SubmitButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  loading: string;
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

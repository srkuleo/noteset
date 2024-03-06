import type { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type HeadingTextProps = HTMLAttributes<HTMLHeadingElement> & { label: string };

export const UserPagesHeadingText = ({
  label,
  className,
}: HeadingTextProps) => {
  return (
    <h2
      className={twMerge(
        "pb-6 pt-2 text-[26px] font-extrabold text-slate-600 dark:text-white",
        className,
      )}
    >
      {label}
    </h2>
  );
};

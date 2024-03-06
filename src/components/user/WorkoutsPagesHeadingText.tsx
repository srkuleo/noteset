import type { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type HeadingTextProps = HTMLAttributes<HTMLHeadingElement> & {label: string}

export const WorkoutsPagesHeadingText = ({ label, className}: HeadingTextProps) => {
  return (
    <h2 className={twMerge("pb-6 pt-2 text-2xl font-extrabold text-slate-600 dark:text-white", className)}>
      {label}
    </h2>
  );
};

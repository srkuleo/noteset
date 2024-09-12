import { twMerge } from "tailwind-merge";

import type { WorkoutType } from "@/db/schema";

export const StatusIndicator = ({
  status,
  className,
}: {
  className?: string;
} & Pick<WorkoutType, "status">) => {
  return (
    <div
      className={twMerge(
        "flex items-center gap-1 rounded-full px-3 py-0.5 shadow-md ring-1 ring-inset ring-slate-300 dark:shadow-slate-900 dark:ring-slate-700",
        className,
      )}
    >
      <div
        className={`${status === "current" ? "bg-blue-400 dark:bg-blue-500" : status === "done" ? "bg-green-500 dark:bg-green-600" : "bg-slate-500 dark:bg-slate-600"} size-2 rounded-full`}
      />

      <p className="font-nunito text-[8px] font-semibold uppercase">{status}</p>
    </div>
  );
};

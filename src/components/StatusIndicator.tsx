import type { WorkoutType } from "@/util/types";

export const StatusIndicator = ({ status }: Pick<WorkoutType, "status">) => {
  return (
    <div className="flex items-center gap-1 rounded-full px-3 py-0.5 shadow-md ring-1 ring-inset ring-slate-300 dark:shadow-slate-900 dark:ring-slate-600">
      <div
        className={`${status === "current" ? "bg-blue-400 dark:bg-blue-500" : status === "done" ? "bg-green-500" : "bg-slate-800"} size-2 rounded-full`}
      />

      <p className="font-nunito text-[8px] font-semibold uppercase">{status}</p>
    </div>
  );
};
import { EmptyIcon } from "@/components/icons/user/warning";

import type { WorkoutStatusType } from "@/util/types";

export const WorkoutsListShell = ({
  status,
}: {
  status: WorkoutStatusType;
}) => {
  return (
    <div className="flex flex-col items-center gap-8 pb-18">
      <div className="text-slate-400/60 dark:text-slate-700/80">
        {EmptyIcon}
      </div>

      {status === "archived" ? (
        <div className="max-w-[80%] space-y-4 text-center">
          <h3>Nothing in archive</h3>
          <p className="font-semibold italic text-slate-400/85">
            Seems like you have&apos;t archived any workout yet
          </p>
        </div>
      ) : (
        <div className="max-w-[90%] space-y-4 text-center">
          <h3>Seems like you haven&apos;t created any workout yet</h3>
          <p className="font-semibold italic text-slate-400/85">
            Tap the{" "}
            <span className="font-bold uppercase text-slate-500 dark:text-white">
              plus
            </span>{" "}
            button to create one
          </p>
        </div>
      )}
    </div>
  );
};

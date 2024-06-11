import { EmptyIcon } from "../icons/user/warning";

export const EmptyPage = () => {
  return (
    <div className="flex flex-col items-center gap-8 px-4 pt-36">
      <div className="text-slate-400/60 dark:text-slate-700/80">
        {EmptyIcon}
      </div>
      <div className="space-y-4 text-center">
        <h2 className="text-xl font-semibold dark:text-slate-300">
          Seems like you haven't created any workout yet
        </h2>
        <p className="font-semibold italic text-slate-400/85">
          Tap the plus button to create one
        </p>
      </div>
    </div>
  );
};

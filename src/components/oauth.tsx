import { AppleSvg, GoogleSvg } from "./svgs";

export const OAuth = () => {
  return (
    <div className="mb-4 flex justify-between">
      <button className="flex items-center gap-2 rounded-xl bg-slate-50 px-12 py-2 text-xs shadow-sm ring-1 ring-slate-300 dark:bg-slate-200 dark:ring-0">
        {GoogleSvg}
      </button>
      <button className="flex items-center gap-2 rounded-xl bg-slate-950 px-12 py-2 text-xs shadow-sm dark:bg-slate-500">
        {AppleSvg}
      </button>
    </div>
  );
};

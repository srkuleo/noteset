import { AppleSvg, GoogleSvg } from "./svgs";

export const OAuth = () => {
  return (
    <div className="mb-4 flex justify-between px-2">
      <button className="flex items-center gap-2 rounded-xl bg-slate-50 px-4 py-2.5 text-xs shadow-sm ring-2 ring-inset ring-green-500 dark:bg-slate-700">
        {GoogleSvg}
        Google
      </button>
      <button className="flex items-center text-xs gap-2 rounded-xl bg-slate-50 px-4 py-2.5 shadow-sm ring-2 ring-inset ring-green-500 dark:bg-slate-700">
        {AppleSvg}
        Apple ID
      </button>
    </div>
  );
};

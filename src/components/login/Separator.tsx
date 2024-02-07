export const Separator = () => {
  return (
    <div className="flex items-center gap-2 px-2 py-8">
      <div className="h-[1px] w-full bg-slate-300 dark:bg-slate-700" />
      <p className="italic font-semibold leading-none text-slate-400 dark:text-slate-300">or</p>
      <div className="h-[1px] w-full bg-slate-300 dark:bg-slate-700" />
    </div>
  );
};

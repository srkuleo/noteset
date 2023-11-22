export const Separator = () => {
  return (
    <div className="flex items-center gap-2 px-2 py-7">
      <div className="h-[1px] grow bg-slate-400/50 dark:bg-slate-700" />
      <p className="text-sm italic leading-none">or</p>
      <div className="h-[1px] grow bg-slate-400/50 dark:bg-slate-700" />
    </div>
  );
};

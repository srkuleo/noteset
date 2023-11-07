export const Separator = () => {
  return (
    <div className="mb-4 flex items-center gap-2 p-2">
      <div className="h-[1px] grow bg-slate-400/60 dark:bg-slate-700" />
      <p className="text-sm italic dark:text-slate-400">or</p>
      <div className="h-[1px] grow bg-slate-400/60 dark:bg-slate-700" />
    </div>
  );
};

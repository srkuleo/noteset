export const Separator = () => {
  return (
    <div className="flex items-center gap-2 px-2 py-6">
      <div className="h-[1px] grow bg-slate-400/60 dark:bg-slate-600" />
      <p className="text-sm italic">or</p>
      <div className="h-[1px] grow bg-slate-400/60 dark:bg-slate-600" />
    </div>
  );
};

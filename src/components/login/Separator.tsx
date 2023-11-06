export const Separator = () => {
  return (
    <div className="mb-4 flex items-center gap-2 p-2">
      <div className="h-[1px] grow bg-green-500/70"></div>
      <p className="text-slate-main600 text-sm  italic dark:text-slate-300/90">
        or
      </p>
      <div className="h-[1px] grow bg-green-500/70"></div>
    </div>
  );
};

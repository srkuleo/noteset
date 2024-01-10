export const Loading = () => {
  return (
    <>
      <div className="flex items-center justify-between pb-4">
        <div className="h-7 w-[215px] animate-pulse rounded-lg bg-white/40 dark:bg-slate-800/50" />
        <div className="flex gap-2">
          <div className="size-9 animate-pulse rounded-xl bg-white/40 dark:bg-slate-800/50"></div>
          <div className="size-9 animate-pulse rounded-xl bg-white/40 dark:bg-slate-800/50"></div>
        </div>
      </div>
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((_, i) => (
          <div
            key={i}
            className="flex h-[137px] w-full flex-col gap-2 rounded-xl bg-white/40 px-3 py-3 shadow-md dark:bg-slate-800/50"
          >
            <div className="flex items-center justify-between border-b border-slate-200 px-1 pb-3 dark:border-slate-800/90">
              <div className="space-y-2">
                <div className="h-6 w-24 animate-pulse rounded-xl bg-slate-300 dark:bg-slate-800" />
                <div className="h-4 w-40 animate-pulse rounded-xl bg-slate-300 dark:bg-slate-800" />
              </div>
            </div>
            <div className="flex justify-between px-1 py-2">
              <div className="flex gap-2">
                <div className="h-8 w-9 animate-pulse rounded-lg bg-slate-300 dark:bg-slate-800" />
                <div className="h-8 w-18 animate-pulse rounded-lg bg-slate-300 dark:bg-slate-800" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

import { ThemeIcon } from "./icons/theme"
import { TimeIcon } from "./icons/user/profile/time"

export const Spinner = ({ className }: { className: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      stroke="currentColor"
      className={className}
    >
      <path
        d="M10 3C6.13401 3 3 6.13401 3 10C3 10.2761 2.77614 10.5 2.5 10.5C2.22386 10.5 2 10.2761 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10C18 14.4183 14.4183 18 10 18C9.72386 18 9.5 17.7761 9.5 17.5C9.5 17.2239 9.72386 17 10 17C13.866 17 17 13.866 17 10C17 6.13401 13.866 3 10 3Z"
        fill="#212121"
      />
    </svg>
  )
}

export const DataLoadingSpinner = ({ message }: { message: string }) => {
  return (
    <div className="absolute inset-x-0 top-[calc(50%-64px)] flex flex-col items-center gap-2">
      <Spinner className="size-8 animate-spin text-slate-300 dark:text-slate-500" />

      <p className="text-slate-500 italic dark:text-slate-200">{message}</p>
    </div>
  )
}

export const FormPendingSpinner = () => {
  return (
    <div className="fixed z-[999] flex items-center justify-center group-enabled:opacity-0 group-disabled:inset-0">
      <Spinner className="size-8 animate-spin text-slate-300 dark:text-slate-500" />
    </div>
  )
}

export const ProfileButtonSkeleton = () => {
  return (
    <div className="flex size-12 animate-pulse flex-col items-center justify-evenly">
      <div className="size-7 rounded-full bg-slate-200 dark:bg-slate-700" />
      <div className="h-3 w-8 rounded-full bg-slate-200 dark:bg-slate-700" />
    </div>
  )
}

export const WorkoutsPageSkeleton = () => {
  return (
    <main className="mt-safe-top space-y-4 px-6 pt-[158px] pb-[97px]">
      {[1, 2, 3, 4, 5, 6].map((skeleton) => (
        <div
          key={skeleton}
          className="flex animate-pulse items-center justify-between rounded-xl bg-white p-6 shadow-md dark:bg-slate-800"
        >
          <div className="w-3/5 space-y-2">
            <div className="h-7 w-24 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-950/80" />
            <div className="h-4 w-32 animate-pulse rounded-lg bg-slate-100 dark:bg-slate-950/50" />
          </div>

          <div className="flex flex-col items-center gap-1.5">
            <div className="h-[28px] w-20 animate-pulse rounded-full bg-slate-200 dark:bg-slate-950/80" />

            <div className="flex gap-1.5">
              <div className="size-10 animate-pulse rounded-lg+ bg-slate-200 dark:bg-slate-950/80" />
              <div className="size-10 animate-pulse rounded-lg+ bg-slate-200 dark:bg-slate-950/80" />
            </div>
          </div>
        </div>
      ))}
    </main>
  )
}

export const LogsPageSkeleton = () => {
  return (
    <>
      <div className="fixed inset-x-0 top-[141px] z-[9990] mt-safe-top flex items-center gap-2 bg-slate-100/60 p-4 backdrop-blur-md dark:bg-slate-950/80">
        <div className="flex grow animate-pulse justify-end gap-1 rounded-full bg-white py-1 pr-1.5 pl-3.5 opacity-80 shadow-md ring-1 ring-slate-300 dark:bg-slate-800 dark:ring-slate-700">
          <div className="h-[36px] w-[68px] animate-pulse rounded-full bg-slate-500 text-white opacity-70 dark:bg-slate-950" />
        </div>

        <div className="size-10 animate-pulse rounded-2xl bg-white opacity-90 shadow-md ring-1 ring-slate-300 dark:bg-slate-800 dark:ring-slate-700" />
        <div className="size-10 animate-pulse rounded-2xl bg-white opacity-90 shadow-md ring-1 ring-slate-300 dark:bg-slate-800 dark:ring-slate-700" />
      </div>

      <main className="mt-safe-top space-y-4 px-6 pt-[217px] pb-[100px]">
        {[1, 2, 3, 4, 5, 6].map((skeleton) => (
          <div
            key={skeleton}
            className="flex animate-pulse items-center justify-between rounded-xl bg-white p-6 shadow-md dark:bg-slate-800"
          >
            <div className="w-3/5 space-y-2">
              <div className="h-7 w-24 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-950/80" />
              <div className="h-4 w-32 animate-pulse rounded-lg bg-slate-100 dark:bg-slate-950/50" />
            </div>

            <div className="flex flex-col items-center gap-3.5">
              <div className="h-5 w-14 animate-pulse rounded-full bg-slate-200 dark:bg-slate-950/80" />
              <div className="h-10 w-18 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-950/80" />
            </div>
          </div>
        ))}
      </main>
    </>
  )
}

export const ProfilePageSkeleton = () => {
  return (
    <main className="mt-safe-top space-y-8 pt-[142px] pb-[100px]">
      <div className="flex h-11 animate-pulse justify-center gap-2 bg-amber-400 py-2 dark:bg-amber-600" />

      <div className="space-y-8 px-6">
        <div className="space-y-1.5">
          <div className="h-8 w-32 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800/80" />
          <div className="h-[22px] w-48 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800/80" />
        </div>

        <div className="flex gap-2">
          <p className="font-semibold dark:text-slate-300">Member since:</p>
          <div className="w-32 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800/80" />
        </div>
      </div>

      <div className="mx-6 space-y-4 border-slate-300 border-y py-8 dark:border-slate-700">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <p className="font-bold font-manrope text-xl">Theme</p>
            {ThemeIcon}
          </div>

          <div className="flex items-center justify-between">
            <div className="h-6 w-20 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800/80" />

            <div className="px-3 py-1.5 font-semibold text-sm text-violet-500 active:scale-95 active:text-violet-300 dark:text-violet-400 dark:active:text-violet-600">
              Change
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <p className="font-bold font-manrope text-xl">Time Format</p>
            {TimeIcon}
          </div>

          <div className="flex items-center justify-between">
            <div className="h-6 w-32 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800/80" />

            <div className="px-3 py-1.5 font-semibold text-sm text-violet-500 active:scale-95 active:text-violet-300 dark:text-violet-400 dark:active:text-violet-600">
              Change
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export const EditAndCreateWorkoutPagesSkeleton = () => {
  return (
    <main className="mt-safe-top pt-[142px] pb-[73px]">
      <div className="space-y-4 p-8">
        <div className="space-y-2 px-4">
          <div className="h-4 w-16 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-900" />
          <div className="h-12 w-full animate-pulse rounded-xl bg-slate-200 dark:bg-slate-900" />
        </div>

        <div className="space-y-2 px-4">
          <div className="h-4 w-32 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-900" />
          <div className="h-12 w-full animate-pulse rounded-xl bg-slate-200 dark:bg-slate-900" />
        </div>

        <div className="flex items-center justify-between p-4">
          <div className="space-y-2">
            <div className="h-4 w-28 animate-pulse rounded-sm bg-slate-200 dark:bg-slate-900" />
            <div className="flex gap-2">
              <div className="h-7 w-[74px] animate-pulse rounded-lg+ bg-slate-200 dark:bg-slate-900" />
              <div className="h-5 w-[1px] animate-pulse bg-slate-200 dark:bg-slate-900" />
              <div className="h-7 w-24 animate-pulse rounded-lg+ bg-slate-200 dark:bg-slate-900" />
            </div>
          </div>

          <div className="size-11 animate-pulse rounded-full bg-slate-200 dark:bg-slate-900" />
        </div>

        {[1, 2, 3].map((_, index) => (
          <div
            key={index}
            className="h-[119px] w-full animate-pulse rounded-lg bg-slate-200 dark:bg-slate-900"
          />
        ))}
      </div>

      <footer className="fixed inset-x-0 bottom-0 border-slate-300/80 border-t bg-white px-6 pt-2 pb-6 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex justify-end">
          <div className="h-10 w-20 animate-pulse rounded-lg bg-slate-100 dark:bg-slate-800" />
        </div>
      </footer>
    </main>
  )
}

export const WorkoutToDoSkeleton = () => {
  return (
    <>
      <main className="mt-safe-top flex flex-col px-6 pt-14 pb-[91px]">
        <form className="divide-y divide-slate-300 dark:divide-slate-800">
          {[1, 2, 3, 4, 5].map((workout) => (
            <div key={workout} className="flex flex-col space-y-3 py-6 opacity-50">
              <div className="h-6 w-1/2 animate-pulse rounded bg-slate-300 dark:bg-slate-800" />

              <div className="flex gap-2">
                <div className="h-10 flex-1 animate-pulse rounded bg-slate-300 dark:bg-slate-800" />
                <div className="h-10 w-20 animate-pulse rounded bg-slate-300 dark:bg-slate-800" />
              </div>

              <div className="flex justify-evenly py-6">
                <div className="flex w-1/3 flex-col items-center gap-3">
                  <div className="h-4 w-2/3 animate-pulse rounded bg-slate-300 dark:bg-slate-800" />
                  <div className="h-8 w-full animate-pulse rounded bg-slate-300 dark:bg-slate-800" />
                  <div className="h-8 w-full animate-pulse rounded bg-slate-300 dark:bg-slate-800" />
                </div>

                <div className="flex w-1/3 flex-col items-center gap-3">
                  <div className="h-4 w-2/3 animate-pulse rounded bg-slate-300 dark:bg-slate-800" />
                  <div className="h-8 w-full animate-pulse rounded bg-slate-300 dark:bg-slate-800" />
                  <div className="h-8 w-full animate-pulse rounded bg-slate-300 dark:bg-slate-800" />
                </div>
              </div>

              <div className="flex items-center justify-center text-slate-500/85 dark:text-slate-400">
                <div className="flex h-10 w-1/2 animate-pulse rounded-lg bg-slate-300 dark:bg-slate-800" />
              </div>
            </div>
          ))}
        </form>
      </main>

      <footer className="fixed inset-x-0 bottom-0 flex h-[89px] items-center justify-between border-slate-300/80 border-t bg-white px-6 pt-2 pb-6 dark:border-slate-800 dark:bg-slate-950">
        <div className="h-10 w-10 animate-pulse rounded-full bg-slate-300 dark:bg-slate-800" />

        <div className="h-10 w-24 animate-pulse rounded-full bg-slate-300 opacity-50 dark:bg-slate-800" />
      </footer>
    </>
  )
}

export const PostWorkoutPageSkeleton = () => {
  return (
    <main className="mt-safe-top px-6 pt-[158px] pb-[89px]">
      <div className="flex flex-col items-center gap-2 pt-4">
        <div className="h-8 w-36 animate-pulse rounded-xl bg-white dark:bg-slate-800/30" />
        <div className="h-8 w-28 animate-pulse rounded-xl bg-white opacity-30 shadow-md ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700/80" />
      </div>

      <div className="space-y-1 border-slate-300/30 border-b py-8 dark:border-slate-800/50">
        <div className="flex items-center justify-between">
          <p className="font-manrope font-semibold text-lg text-slate-400 italic dark:text-slate-400">
            Duration
          </p>

          <div className="h-5 w-28 animate-pulse rounded-md bg-white opacity-30 shadow-md ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700/80" />
        </div>

        <div className="flex items-center justify-between">
          <p className="font-manrope font-semibold text-lg text-slate-400 italic dark:text-slate-400">
            Date
          </p>

          <div className="h-5 w-28 animate-pulse rounded-md bg-white opacity-30 shadow-md ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700/80" />
        </div>
      </div>

      <div className="flex flex-col items-center gap-2 px-4 pt-8 pb-6">
        <div className="h-6 w-48 animate-pulse rounded-xl bg-white dark:bg-slate-800/30" />
        <div className="h-6 w-28 animate-pulse rounded-xl bg-white dark:bg-slate-800/30" />
      </div>

      <div className="flex justify-center gap-4">
        <div className="h-10 w-28 animate-pulse rounded-full bg-white opacity-20 shadow-md ring-1 ring-slate-400/40 dark:bg-slate-800 dark:ring-slate-600" />

        <div className="w-[1px] bg-slate-300/30 dark:bg-slate-800/50" />

        <div className="h-10 w-28 animate-pulse rounded-full border-slate-400/40 border-l bg-white opacity-20 shadow-md dark:border-slate-600 dark:bg-slate-800" />
      </div>
    </main>
  )
}

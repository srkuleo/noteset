"use client"

import { useState } from "react"
import { Drawer } from "vaul"
import { BUTTON_TIMEOUT, timeout } from "@/util/utils"
import { InformationIcon } from "./icons/user/information"

export const PWATooltip = () => {
  const [open, setOpen] = useState(false)

  return (
    <Drawer.Root open={open} onOpenChange={setOpen} noBodyStyles disablePreventScroll>
      <button
        type="button"
        onClick={async () => {
          await timeout(BUTTON_TIMEOUT)
          setOpen(true)
        }}
        className="rounded-full bg-white px-6 py-2 font-manrope font-semibold text-slate-600 shadow-md ring-1 ring-slate-400/40 ring-inset active:scale-95 active:bg-slate-50 dark:bg-slate-900 dark:text-white dark:shadow-slate-800 dark:ring-slate-700 dark:active:bg-slate-800"
      >
        Tooltip
        <p className="sr-only">PWA Tooltip</p>
      </button>

      <TooltipDrawerContent title="UX guide" closeDrawer={() => setOpen(false)}>
        <div className="space-y-6">
          <p className="font-bold font-manrope text-lg text-slate-800 leading-none sm:text-xl dark:text-white">
            For the better user experience
          </p>

          <ul className="space-y-3 text-pretty dark:text-slate-300">
            <li>
              <span className="font-semibold text-green-500 text-sm uppercase dark:text-green-600">
                android:
              </span>{" "}
              install PWA
            </li>

            <li>
              <span className="font-semibold text-sm uppercase dark:text-white">iphone:</span> add
              to Home Screen
            </li>
          </ul>

          <p className="font-bold font-manrope text-lg text-slate-800 leading-none sm:text-xl dark:text-white">
            General guidelines
          </p>

          <ul className="list-disc space-y-3 text-pretty pl-4 dark:text-slate-300">
            <li>
              You don&apos;t have to login in the browser. It&apos;s better to do so after creating
              PWA/Home Screen app.
            </li>

            <li> Installing or adding to Home screen will save workouts page as startup page.</li>
          </ul>
        </div>
      </TooltipDrawerContent>
    </Drawer.Root>
  )
}

export const WorkoutsPageTooltip = () => {
  const [open, setOpen] = useState(false)

  return (
    <Drawer.Root open={open} onOpenChange={setOpen} noBodyStyles disablePreventScroll>
      <button
        type="button"
        onClick={async () => {
          await timeout(BUTTON_TIMEOUT)

          setOpen(true)
        }}
        className="rounded-full p-1.5 text-slate-400 active:bg-slate-200 dark:text-slate-500 dark:active:bg-slate-700"
      >
        <InformationIcon strokeWidth={1.5} className="size-7" />
      </button>

      <TooltipDrawerContent title="Good to Know" closeDrawer={() => setOpen(false)}>
        <div className="space-y-6">
          <p className="font-bold font-manrope text-lg text-slate-800 leading-none sm:text-xl dark:text-white">
            Workout statuses
          </p>

          <ul className="list-disc space-y-3 text-pretty pl-4 text-sm sm:text-base dark:text-slate-300">
            <li>
              <span className="font-bold text-blue-400 uppercase dark:text-blue-500">
                current -
              </span>{" "}
              a workout that you&apos;re actively doing or regularly repeating.
            </li>

            <li>
              <span className="font-bold text-green-500 uppercase dark:text-green-600">done -</span>{" "}
              a workout that has been completed and saved as a log for future reference.
            </li>

            <li>
              <span className="font-bold text-slate-500 uppercase dark:text-slate-600">
                archived -
              </span>{" "}
              a workout that was once done on a regular base. It can be returned to{" "}
              <span className="font-bold text-blue-400 uppercase dark:text-blue-500">current</span>{" "}
              status at any time.
            </li>
          </ul>

          <p className="font-bold font-manrope text-lg text-slate-800 leading-none sm:text-xl dark:text-white">
            Workouts page actions
          </p>

          <ul className="list-disc space-y-3 text-pretty pl-4 text-sm sm:text-base dark:text-slate-300">
            <li>
              <span className="font-bold">Tap</span> the top-right paper button to read the patch
              notes.
            </li>

            <li>
              <span className="font-bold">Tap</span> the{" "}
              <span className="font-bold uppercase">eye button</span> to see the intended workout in
              either current or archived list.
            </li>

            <li>
              <span className="font-bold">Tap</span> the right{" "}
              <span className="font-bold text-violet-500 uppercase dark:text-violet-400">
                arrow button
              </span>{" "}
              to initate the workout.
            </li>

            <li>
              On archived page, <span className="font-bold">tap</span> the{" "}
              <span className="font-bold text-blue-500 uppercase dark:text-blue-400">
                unarchive button
              </span>{" "}
              to return the selected workout to the current list.
            </li>

            <li>
              <span className="font-bold">Swipe</span> from right to the left to either{" "}
              <span className="font-bold text-red-400 uppercase dark:text-red-500">remove</span> or{" "}
              <span className="font-bold text-green-500 uppercase dark:text-green-600">edit</span>{" "}
              workout.
            </li>
          </ul>
        </div>
      </TooltipDrawerContent>
    </Drawer.Root>
  )
}

export const SeeWorkoutTooltip = () => {
  const [open, setOpen] = useState(false)

  return (
    <Drawer.NestedRoot open={open} onOpenChange={setOpen} noBodyStyles disablePreventScroll>
      <button
        type="button"
        onClick={async () => {
          await timeout(BUTTON_TIMEOUT)

          setOpen(true)
        }}
        className="rounded-full p-1.5 text-slate-400 active:bg-slate-200 dark:text-slate-500 dark:active:bg-slate-700"
      >
        <InformationIcon strokeWidth={1.5} className="size-6" />
      </button>

      <TooltipDrawerContent title="Good to Know" closeDrawer={() => setOpen(false)}>
        <div className="space-y-6">
          <p className="font-bold font-manrope text-lg text-slate-800 leading-none sm:text-xl dark:text-white">
            Workout planning
          </p>

          <ul className="list-disc space-y-3 text-pretty pl-4 text-sm sm:text-base dark:text-slate-300">
            <li>
              As a general recommendation for hypertrophy training,{" "}
              <span className="font-bold">each workout</span> should include between{" "}
              <span className="font-bold">10 and 15 working sets</span>, depending on your recovery
              capacity and how many exercises are trained at longer lengths.
            </li>

            <li>
              <span className="font-bold">In most cases</span>, a workout should include{" "}
              <span className="font-bold">no more than 10 exercises</span>. The{" "}
              <span className="font-bold">recommended range</span> is between{" "}
              <span className="font-bold">4 and 8</span> exercises, depending on the type of
              training split you&apos;re following.
            </li>

            <li>
              From a muscle-specific standpoint,{" "}
              <span className="font-bold">each muscle group</span> should receive between{" "}
              <span className="font-bold">4 and 10 effective sets per week</span>, depending on your
              goals and which muscles are a priority.
            </li>
          </ul>

          <p className="font-bold font-manrope text-lg text-slate-800 leading-none sm:text-xl dark:text-white">
            Colour legend
          </p>

          <ul className="list-disc space-y-3 text-pretty pl-4 text-sm sm:text-base dark:text-slate-300">
            <li>
              <span className="font-bold text-green-500">GREEN</span> - bilateral set (counted as 1
              working set)
            </li>

            <li>
              <span className="font-bold text-orange-500">ORANGE</span> - unilateral set (counted as
              2 working sets), more
              <span className="font-bold"> fatiguing</span>, should be
              <span className="font-bold"> used in moderation</span>
            </li>
          </ul>
        </div>
      </TooltipDrawerContent>
    </Drawer.NestedRoot>
  )
}

export const AddOrEditWorkoutTooltip = () => {
  const [open, setOpen] = useState(false)

  return (
    <Drawer.Root open={open} onOpenChange={setOpen} noBodyStyles disablePreventScroll>
      <button
        type="button"
        onClick={async () => {
          await timeout(BUTTON_TIMEOUT)

          setOpen(true)
        }}
        className="mr-1.5 ml-auto rounded-full p-1.5 text-slate-400 active:bg-slate-200 dark:text-slate-500 dark:active:bg-slate-700"
      >
        <InformationIcon strokeWidth={1.5} className="size-7" />
      </button>

      <TooltipDrawerContent title="Good to Know" closeDrawer={() => setOpen(false)}>
        <div className="space-y-6">
          <p className="font-bold font-manrope text-lg text-slate-800 leading-none sm:text-xl dark:text-white">
            Add / Edit form
          </p>

          <ul className="list-disc space-y-3 text-pretty pl-4 text-sm sm:text-base dark:text-slate-300">
            <li>
              Tap <span className="font-bold text-slate-600 uppercase dark:text-white">plus</span>{" "}
              button to add a new exercise.
            </li>

            <li>
              You need to add{" "}
              <span className="font-bold text-slate-800 uppercase dark:text-white">
                at least one exercise
              </span>{" "}
              before submitting the form otherwise it will result in error.
            </li>

            <li>
              Hold the{" "}
              <span className="font-bold text-slate-800 uppercase dark:text-white">
                2 dashes indicator
              </span>{" "}
              inside an exercise card to enter drag and drop mode, which allows you{" "}
              <span className="font-bold text-slate-800 uppercase dark:text-white">
                to change the order of exercises
              </span>
              .
            </li>

            <li>
              Swipe an exercise card from right to the left to either{" "}
              <span className="font-bold text-green-500 uppercase dark:text-green-600">edit</span>{" "}
              or <span className="font-bold text-red-400 uppercase dark:text-red-500">remove</span>{" "}
              that exercise.
            </li>

            <li>
              When done with creating / editing your workout, tap{" "}
              <span className="font-bold text-green-500 uppercase dark:text-green-600">
                create / save
              </span>{" "}
              button to submit the form.
            </li>
          </ul>
        </div>
      </TooltipDrawerContent>
    </Drawer.Root>
  )
}

//Update content to reflect new UI
export const ExerciseFormTooltip = () => {
  const [open, setOpen] = useState(false)

  return (
    <Drawer.NestedRoot open={open} onOpenChange={setOpen} noBodyStyles disablePreventScroll>
      <button
        type="button"
        onClick={async () => {
          await timeout(BUTTON_TIMEOUT)

          setOpen(true)
        }}
        className="rounded-full p-1.5 text-slate-400 active:bg-slate-200 dark:text-slate-500 dark:active:bg-slate-700"
      >
        <InformationIcon strokeWidth={1.5} className="size-6" />
      </button>

      <TooltipDrawerContent title="Good to Know" closeDrawer={() => setOpen(false)}>
        <div className="space-y-6">
          <p className="font-bold font-manrope text-lg text-slate-800 leading-none sm:text-xl dark:text-white">
            Form fields explanation
          </p>

          <ul className="list-disc space-y-3 text-pretty pl-4 text-sm sm:text-base dark:text-slate-300">
            <li>
              <span className="font-bold uppercase dark:text-white">limb involvement</span> -
              optional field. It&apos;s recommended to choose either{" "}
              <span className="font-bold text-orange-500 italic">unilateral</span> (one limb at a
              time) or <span className="font-bold text-green-500 italic">bilateral</span> (both
              limbs at the same time) to ensure an accurate count of total working sets per workout.
              This is especially useful for advanced lifters aiming to better manage workout
              fatigue.
            </li>

            <li>
              <span className="font-bold uppercase dark:text-white">name</span> - exercise name.
              Must be between 2 and 30 characters long to keep it clear and concise.
            </li>

            <li>
              <span className="font-bold uppercase dark:text-white">note</span> - optional field,
              intended for storing useful information related to the exercise.
            </li>

            <li>
              <span className="font-bold uppercase dark:text-white">set section</span> - tap the{" "}
              <span className="font-bold uppercase dark:text-white">plus button</span> to create a
              new set. It will open a separate drawer. Tap the{" "}
              <span className="font-bold text-red-500 uppercase">bin button</span> to remove
              selected set from the current list of sets.
            </li>
          </ul>
        </div>
      </TooltipDrawerContent>
    </Drawer.NestedRoot>
  )
}

export const CreateNewSetTooltip = () => {
  const [open, setOpen] = useState(false)

  return (
    <Drawer.NestedRoot open={open} onOpenChange={setOpen} noBodyStyles disablePreventScroll>
      <button
        type="button"
        onClick={async () => {
          await timeout(BUTTON_TIMEOUT)

          setOpen(true)
        }}
        className="rounded-full p-1.5 text-slate-400 active:bg-slate-200 dark:text-slate-500 dark:active:bg-slate-700"
      >
        <InformationIcon strokeWidth={1.5} className="size-6" />
      </button>

      <TooltipDrawerContent title="Good to Know" closeDrawer={() => setOpen(false)}>
        <div className="space-y-6">
          <p className="font-bold font-manrope text-lg text-slate-800 leading-none sm:text-xl dark:text-white">
            Form fields explanation
          </p>

          <ul className="list-disc space-y-3 text-pretty pl-4 text-sm sm:text-base dark:text-slate-300">
            <li>
              <span className="font-bold uppercase dark:text-white">purpose</span> - choose whether
              the set is a warm-up or a working set. This field is{" "}
              <span className="font-bold text-slate-600 dark:text-white">required</span> to load the
              rest of the form.
            </li>

            <li>
              <span className="font-bold uppercase dark:text-white">order</span> - based on the
              selected purpose, you'll see order options for either warm-up or working sets.{" "}
              <span className="font-bold text-slate-600 italic dark:text-white">
                Each button shows where the new set will be placed in the list.
              </span>{" "}
              For example, if there are 3 warm-up sets and you select 3, the new set becomes the 3rd
              one, and the previous 3rd set moves to 4th.
            </li>

            <li>
              <span className="font-bold uppercase dark:text-white">reps</span> - should be one of
              these formats{" "}
              <span className="font-bold text-slate-600 italic dark:text-white">8-10</span>,{" "}
              <span className="font-bold text-slate-600 italic dark:text-white">6</span>,{" "}
              <span className="font-bold text-slate-600 italic dark:text-white">5+2</span>.
            </li>

            <li>
              <span className="font-bold uppercase dark:text-white">weight</span> - should be one of
              these formats{" "}
              <span className="font-bold text-slate-600 italic dark:text-white">27,5</span>,{" "}
              <span className="font-bold text-slate-600 italic dark:text-white">10</span>,{" "}
              <span className="font-bold text-slate-600 italic dark:text-white">20.5</span>, without
              adding &rdquo;kg&rdquo; or &rdquo;lbs&rdquo;.
            </li>
          </ul>
        </div>
      </TooltipDrawerContent>
    </Drawer.NestedRoot>
  )
}

export const WorkoutToDoTooltip = () => {
  const [open, setOpen] = useState(false)

  return (
    <Drawer.Root open={open} onOpenChange={setOpen} noBodyStyles disablePreventScroll>
      <button
        type="button"
        onClick={async () => {
          await timeout(BUTTON_TIMEOUT)

          setOpen(true)
        }}
        className="mr-2 rounded-full p-1.5 text-white"
      >
        <InformationIcon strokeWidth={1.5} className="size-7" />
      </button>

      <TooltipDrawerContent title="Good to Know" closeDrawer={() => setOpen(false)}>
        <div className="space-y-6">
          <p className="font-bold font-manrope text-lg text-slate-800 leading-none sm:text-xl dark:text-white">
            Workout to do form
          </p>

          <ul className="list-disc space-y-3 text-pretty pl-4 text-sm sm:text-base dark:text-slate-300">
            <li>
              <span className="font-bold text-slate-800 dark:text-white">
                You don&apos;t have to populate all the exercise fields
              </span>
              , only those that you have done.
            </li>

            <li>
              After completing an exercise, tap
              <span className="font-bold text-violet-400 italic"> Mark as done </span>
              to update your progression bar accordingly.
            </li>

            <li>
              Swipe any set from right to the left to{" "}
              <span className="font-bold text-red-500 uppercase">remove</span> it.
            </li>

            <li>
              <span className="font-bold text-slate-800 uppercase dark:text-white">Add set</span>{" "}
              button allows you to add an additional warmup or working set to the selected exercise.
            </li>

            <li>
              Workout duration is being{" "}
              <span className="font-bold text-slate-800 dark:text-white">
                tracked in the background.
              </span>{" "}
              You will be able to see the exact duration on the post-workout page.
            </li>

            <li>
              Tap any <span className="font-bold text-slate-800 dark:text-white">rectangle</span> in
              the <span className="font-bold text-slate-800 dark:text-white">progression bar</span>{" "}
              to instantly scroll to the corresponding exercise.
            </li>

            <li>
              Tap{" "}
              <span className="font-bold text-violet-500 uppercase dark:text-violet-400">plus</span>{" "}
              button to add a new exercise.
            </li>

            <li>
              All done? Tap{" "}
              <span className="font-bold text-green-500 uppercase dark:text-green-600">Done</span>{" "}
              button to save your workout!
            </li>
          </ul>
        </div>
      </TooltipDrawerContent>
    </Drawer.Root>
  )
}

export const PostWorkoutTooltip = () => {
  const [open, setOpen] = useState(false)

  return (
    <Drawer.Root open={open} onOpenChange={setOpen} noBodyStyles disablePreventScroll>
      <button
        type="button"
        onClick={async () => {
          await timeout(BUTTON_TIMEOUT)

          setOpen(true)
        }}
        className="rounded-full p-1.5 text-slate-400 active:bg-slate-200 dark:text-slate-500 dark:active:bg-slate-700"
      >
        <InformationIcon strokeWidth={1.5} className="size-7" />
      </button>

      <TooltipDrawerContent title="Good to Know" closeDrawer={() => setOpen(false)}>
        <div className="space-y-6">
          <p className="font-bold font-manrope text-lg text-slate-800 leading-none sm:text-xl dark:text-white">
            Post workout page
          </p>

          <ul className="list-disc space-y-3 overflow-y-auto text-pretty pl-4 text-sm sm:text-base dark:text-slate-300">
            <li>
              Tap{" "}
              <span className="font-bold text-slate-800 uppercase dark:text-white">dumbbell</span>{" "}
              icon to go to the <span className="font-bold text-blue-500 uppercase">current</span>{" "}
              workouts page without making any changes to you next workout. The workout you&apos;ve
              previously completed will be saved and viewable on the Logs page.
            </li>

            <li>
              Tap{" "}
              <span className="font-bold text-slate-800 uppercase dark:text-white">Yes, edit</span>{" "}
              button to enter edit mode. There, you can view your next workout session, compare it
              to the last one and make any necessary changes accordingly.
            </li>

            <li>
              Tap{" "}
              <span className="font-bold text-slate-800 uppercase dark:text-white">View logs</span>{" "}
              button to see all your previously{" "}
              <span className="font-bold text-green-500 uppercase">done</span> workouts including
              the latest one.
            </li>
          </ul>
        </div>
      </TooltipDrawerContent>
    </Drawer.Root>
  )
}

const TooltipDrawerContent = ({
  children,
  closeDrawer,
  title,
}: {
  children: React.ReactNode
  closeDrawer: () => void
  title: string
}) => {
  return (
    <Drawer.Portal>
      <Drawer.Overlay className="fixed inset-0 z-[9999] bg-slate-900/60 backdrop-blur-sm dark:bg-slate-950/80" />

      <Drawer.Content
        aria-describedby={undefined}
        className="fixed inset-x-0 bottom-0 z-[9999] mx-0.5 flex max-h-[80%] flex-col rounded-t-4xl bg-white pb-6 focus:outline-none dark:bg-slate-900"
      >
        <div className="rounded-t-4xl border-b border-b-slate-200 bg-slate-200/55 py-3 dark:border-b-slate-700 dark:bg-slate-800">
          <Drawer.Handle className="bg-slate-300 dark:bg-slate-600" />

          <Drawer.Title className="px-6 pt-3 font-bold text-slate-800 text-xl dark:text-white">
            {title}
          </Drawer.Title>
        </div>

        <div className="flex flex-1 flex-col overflow-y-auto overscroll-y-contain px-6 pt-6 font-manrope">
          <Drawer.Description asChild>{children}</Drawer.Description>
        </div>

        <button
          type="button"
          onClick={async () => {
            await timeout(BUTTON_TIMEOUT)

            closeDrawer()
          }}
          className="m-6 rounded-lg bg-slate-800 py-2 text-center font-bold text-white focus:outline-none active:bg-slate-600 dark:bg-white dark:font-extrabold dark:text-slate-800 active:dark:bg-slate-300"
        >
          Got it!
        </button>
      </Drawer.Content>
    </Drawer.Portal>
  )
}

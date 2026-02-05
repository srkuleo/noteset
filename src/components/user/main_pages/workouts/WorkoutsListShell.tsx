import { motion } from "framer-motion"
import { EmptyIcon } from "@/components/icons/user/warning"
import type { WorkoutStatusType } from "@/db/schema"

export const WorkoutsListShell = ({ status }: { status: WorkoutStatusType }) => {
  return (
    <motion.div
      animate={{
        opacity: [0, 1],
        y: [-64, 0],
        transition: {
          delay: 0.3,
          duration: 0.3,
          ease: [0.36, 0.66, 0.04, 1],
        },
      }}
      className="flex flex-col items-center gap-8 pb-18"
    >
      <div className="text-slate-400/60 dark:text-slate-700/80">{EmptyIcon}</div>

      {status === "archived" ? (
        <div className="max-w-[80%] space-y-4 text-center">
          <h3>Nothing in archive</h3>
          <p className="font-semibold text-slate-400/85 italic">
            Seems like you have&apos;t archived any workout yet
          </p>
        </div>
      ) : (
        <div className="max-w-[90%] space-y-4 text-center">
          <h3>Seems like you haven&apos;t created any workout yet</h3>
          <p className="font-semibold text-slate-400/85 italic">
            Tap the <span className="font-bold text-slate-500 uppercase dark:text-white">plus</span>{" "}
            button to create one
          </p>
        </div>
      )}
    </motion.div>
  )
}

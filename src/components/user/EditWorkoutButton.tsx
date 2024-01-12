import { EditWorkoutIcon } from "@/icons/user/modify";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import type { Workout } from "./Workouts";

export const EditWorkoutButton = ({
  editMode,
  workout,
}: {
  editMode: boolean;
  workout: Workout;
}) => {
  return (
    <AnimatePresence>
      {editMode && (
        <motion.div
          initial={{ opacity: 0, y: "-100%" }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.4, ease: [0.36, 0.66, 0.04, 1] },
          }}
          exit={{
            opacity: 0,
            y: "-100%",
            transition: { duration: 0.3, ease: [0.36, 0.66, 0.04, 1] },
          }}
        >
          <Link
            href={`/workouts/edit?id=${workout.id}`}
            className="select-none text-green-500 transition active:scale-95"
          >
            {EditWorkoutIcon}
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

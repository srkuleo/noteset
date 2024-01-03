import { EditWorkoutIcon } from "@/icons/user/modify";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import type { Workout } from "./Workouts";

export const EditWorkoutButton = ({
  isEditing,
  workout,
}: {
  isEditing: boolean;
  workout: Workout;
}) => {
  return (
    <AnimatePresence>
      {isEditing && (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.2, ease: "easeOut" },
          }}
          exit={{
            opacity: 0,
            y: -12,
            transition: { duration: 0.14, ease: "easeIn" },
          }}
        >
          <Link
            href={`/workouts/edit?id=${workout.id}`}
            className="text-green-500 transition active:scale-95"
          >
            {EditWorkoutIcon}
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

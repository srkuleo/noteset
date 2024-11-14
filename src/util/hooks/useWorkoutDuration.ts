import { useState } from "react";

type TimeType = { start: Date; end: Date } | { start: Date; end: null };

export const useWorkoutDuration = () => {
  const [workoutTime, setWorkoutTime] = useState<TimeType>({
    start: new Date(),
    end: null,
  });

  function endWorkout() {
    setWorkoutTime((prev) => {
      return {
        ...prev,
        end: new Date(),
      };
    });
  }

  function calcWorkoutDuration() {
    if (workoutTime.end) {
      const durationInMili =
        workoutTime.end.getTime() - workoutTime.start.getTime();
      const minutes = Math.floor(durationInMili / (1000 * 60));

      return minutes;
    }

    return 0;
  }

  return { endWorkout, calcWorkoutDuration };
};

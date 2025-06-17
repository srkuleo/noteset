import { useState } from "react";

export const useWorkoutDuration = () => {
  const [startTime] = useState(new Date().getTime());

  function calcWorkoutDuration() {
    const endTime = new Date().getTime();

    const durationInMili = endTime - startTime;

    const minutes = Math.floor(durationInMili / 60000);

    return minutes;
  }

  return { calcWorkoutDuration };
};

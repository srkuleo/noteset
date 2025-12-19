import { useState } from "react"

export const useWorkoutDuration = () => {
  const [startTime] = useState(Date.now())

  function calcWorkoutDuration() {
    const endTime = Date.now()

    const durationInMili = endTime - startTime

    const minutes = Math.floor(durationInMili / 60000)

    return minutes
  }

  return { calcWorkoutDuration }
}

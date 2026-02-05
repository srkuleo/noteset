import { useEffect, useState } from "react"
import { getLastUpdatedLabelState } from "../utils"

type LastUpdatedHookState = {
  text: string
  nextUpdateAt: number
}

export const useLastUpdatedLabel = (timestamp: number): LastUpdatedHookState => {
  const [state, setState] = useState<LastUpdatedHookState>(() => {
    const { text, nextDelay } = getLastUpdatedLabelState(timestamp)

    return {
      text,
      nextUpdateAt: Date.now() + nextDelay,
    }
  })

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>

    const tick = () => {
      const { text, nextDelay } = getLastUpdatedLabelState(timestamp)
      setState({
        text,
        nextUpdateAt: Date.now() + nextDelay,
      })

      timer = setTimeout(tick, nextDelay)
    }

    tick()

    return () => clearTimeout(timer)
  }, [timestamp])

  return state
}

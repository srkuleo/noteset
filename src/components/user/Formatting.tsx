import type { TimeFormatType } from "@/util/types"
import { formatDate } from "@/util/utils"

export const FormatWorkoutDuration = ({
  duration,
  selectedFormat,
  className,
}: {
  duration: number | null
  selectedFormat: TimeFormatType
  className: string
}) => {
  if (!duration) {
    return <p className={className}>under 1 min</p>
  }

  if (selectedFormat === "Hours and minutes" || selectedFormat === "default") {
    const minutes = Math.floor(duration % 60)
    const hours = Math.floor(duration / 60)

    return (
      <p className={className}>
        {hours > 0 && `${hours} h`}
        {minutes > 0 && ` ${minutes} min`}
      </p>
    )
  }

  return <p className={className}>{`${duration} min`}</p>
}

export const FormatDate = ({
  date,
  withDayOfTheWeek,
  className,
}: {
  date: Date | null
  withDayOfTheWeek?: boolean
  className: string
}) => {
  if (!date) {
    return <p className={className}>unknown</p>
  }

  if (withDayOfTheWeek) {
    return <p className={className}>{formatDate(date, withDayOfTheWeek)}</p>
  }

  return <p className={className}>{formatDate(date)}</p>
}

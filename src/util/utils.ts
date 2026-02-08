import { encodeBase32LowerCaseNoPadding } from "@oslojs/encoding"
import type { Variants } from "framer-motion"
import type { Metadata } from "next"
import type { ExerciseType, SetType } from "./types"

type AppleWebDev = Exclude<NonNullable<Metadata["appleWebApp"]>, boolean>
type AppleDeviceSize = {
  width: number
  height: number
  ratio: number
}

const APPLE_DEVICE_SIZE: AppleDeviceSize[] = [
  { width: 440, height: 956, ratio: 3 },
  { width: 430, height: 932, ratio: 3 },
  { width: 402, height: 874, ratio: 3 },
  { width: 393, height: 852, ratio: 3 },
  { width: 390, height: 844, ratio: 3 },
  { width: 1024, height: 1366, ratio: 2 },
  { width: 834, height: 1194, ratio: 2 },
  { width: 820, height: 1180, ratio: 2 },
  { width: 810, height: 1080, ratio: 2 },
]

export function generateStartupImages(): AppleWebDev["startupImage"] {
  return APPLE_DEVICE_SIZE.flatMap(({ width, height, ratio }) => {
    const baseMedia = `(device-width: ${width}px) and (device-height: ${height}px) and (-webkit-device-pixel-ratio: ${ratio}) and (orientation: portrait)`
    const file = `${width * ratio}-${height * ratio}`

    return [
      {
        url: `/apple-splash-${file}.jpeg`,
        media: baseMedia,
      },
      {
        url: `/apple-splash-dark-${file}.jpeg`,
        media: `(prefers-color-scheme: dark) and ${baseMedia}`,
      },
    ]
  })
}

export function generateRandomId(idLength: number): string {
  const byteLength = Math.ceil(idLength / 1.6)
  const bytes = new Uint8Array(byteLength)
  crypto.getRandomValues(bytes)

  const id = encodeBase32LowerCaseNoPadding(bytes).slice(0, idLength)

  return id
}

export function generateSessionToken(): string {
  const bytes = new Uint8Array(20)
  crypto.getRandomValues(bytes)
  const token = encodeBase32LowerCaseNoPadding(bytes)

  return token
}

export const BUTTON_TIMEOUT = 100
export const SWIPE_AND_DRAWER_TIMEOUT = 300
export const FORM_TIMEOUT = 500
export const SESSION_COOKIE_NAME = "auth-session"

export async function timeout(ms: number) {
  await new Promise((resolve) => setTimeout(resolve, ms))
}

export const formatDate = (date: Date, withDayOfTheWeek?: boolean) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")

  if (withDayOfTheWeek) {
    const dayOfTheWeek = date.toLocaleString("en", { weekday: "short" }).split(" ")[0]

    return `${dayOfTheWeek}, ${day}-${month}-${year}`
  }

  return `${day}-${month}-${year}`
}

export const reorderExercises = (list: ExerciseType[], startIndex: number, endIndex: number) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)

  if (removed) {
    result.splice(endIndex, 0, removed)
  }

  return result
}

export const collapseNewSetForm: Variants = {
  hidden: {
    opacity: 0,
    height: 0,
  },
  visible: {
    opacity: 1,
    height: "auto",
    overflowY: "hidden",
    transition: {
      duration: 0.4,
      delay: 0.04,
      ease: [0.36, 0.66, 0.04, 1],
    },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.4,
      ease: [0.36, 0.66, 0.04, 1],
    },
  },
}

type LastUpdatedLabelState = {
  text: string
  nextDelay: number
}

export const getLastUpdatedLabelState = (
  lastUpdated: number,
  now: number = Date.now()
): LastUpdatedLabelState => {
  const diffInMs = Math.max(0, now - lastUpdated)
  const diffInSeconds = Math.floor(diffInMs / 1000)
  const diffInMinutes = Math.floor(diffInSeconds / 60)
  const diffInHours = Math.floor(diffInMinutes / 60)
  const diffInDays = Math.floor(diffInHours / 24)

  if (diffInSeconds < 60) {
    return {
      text: "just now",
      nextDelay: (60 - diffInSeconds) * 1000,
    }
  }

  if (diffInMinutes < 60) {
    return {
      text: `${diffInMinutes} min${diffInMinutes > 1 ? "s" : ""} ago`,
      nextDelay: (60 - (diffInSeconds % 60)) * 1000,
    }
  }

  if (diffInHours < 24) {
    return {
      text: `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`,
      nextDelay: (60 - (diffInMinutes % 60)) * 60 * 1000,
    }
  }

  if (diffInDays < 31) {
    return {
      text: `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`,
      nextDelay: (24 - (diffInHours % 24)) * 60 * 60 * 1000,
    }
  }

  return {
    text: "few months ago",
    nextDelay: Infinity,
  }
}

export const useExerciseSetCounts = (
  sets: SetType[],
  limbInvolvement: ExerciseType["limbInvolvement"]
) => {
  const warmupSetCount = sets.filter((set) => set.purpose === "warmup").length

  const workingSetsCount =
    sets.filter((set) => set.purpose === "working").length *
    (limbInvolvement === "unilateral" ? 2 : 1)

  const warmupSets = `${warmupSetCount} warmup`
  const workingSets = `${workingSetsCount} working`

  const workingSetsWithLabel = `${workingSetsCount} working set${workingSetsCount === 1 ? "" : "s"}`

  return {
    warmupSets,
    workingSets,
    workingSetsWithLabel,
  }
}

type UseWorkoutStatsOptions = {
  logMode?: boolean
}

export const useWorkoutStats = (
  exercises: ExerciseType[],
  options: UseWorkoutStatsOptions = {}
) => {
  const { logMode = false } = options
  const completedExercises = logMode
    ? exercises.filter((exercise) => exercise.sets.length > 0)
    : exercises

  const totalExerciseCount = completedExercises.length
  const totalExercises = `${totalExerciseCount} exercise${totalExerciseCount === 1 ? "" : "s"}`

  const totalWorkingSetsCount = completedExercises.reduce((total, exercise) => {
    const workingSets = exercise.sets.filter((set) => set.purpose === "working").length
    return total + (exercise.limbInvolvement === "unilateral" ? workingSets * 2 : workingSets)
  }, 0)
  const totalWorkingSets = `${totalWorkingSetsCount} working set${totalWorkingSetsCount === 1 ? "" : "s"}`

  return {
    totalExercises,
    totalWorkingSets,
  }
}

export const insertSet = (sets: SetType[], newSet: SetType, index: number) => {
  const warmupSets = sets.filter((set) => set.purpose === "warmup")
  const workingSets = sets.filter((set) => set.purpose === "working")

  if (newSet.purpose === "warmup") {
    return [...warmupSets.slice(0, index), newSet, ...warmupSets.slice(index), ...workingSets]
  }

  return [...warmupSets, ...workingSets.slice(0, index), newSet, ...workingSets.slice(index)]
}

export const isValidRepsInput = (value: string): boolean => {
  return /^\d+(?:[-+]\d+)?$/.test(value)
}
export const isValidWeightInput = (value: string): boolean => {
  return /^\d+(,\d+|\.\d+)?$/.test(value)
}

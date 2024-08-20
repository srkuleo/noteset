import type { TimeFormatType } from "./types";

export function formatDuration(
  timeFormat: TimeFormatType,
  duration: number | null,
) {
  if (duration && timeFormat === "Hours and minutes") {
    const minutes = Math.floor(duration % 60);
    const hours = Math.floor(duration / 60);

    return `${hours} h ${minutes} min`;
  }

  return `${duration} min`;
}

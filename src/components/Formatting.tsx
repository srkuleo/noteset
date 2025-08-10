import { twMerge } from "tailwind-merge";

import type { TimeFormatType } from "@/util/types";

export const FormatWorkoutDuration = ({
  duration,
  selectedFormat,
  logsMode,
}: {
  duration: number | null;
  selectedFormat: TimeFormatType;
  logsMode?: boolean;
}) => {
  if (!duration) {
    return (
      <p
        className={twMerge(
          "italic",
          logsMode &&
            "pl-2 text-sm font-semibold leading-none text-slate-400/80 dark:text-slate-400/60",
        )}
      >
        under 1 min
      </p>
    );
  }

  if (selectedFormat === "Hours and minutes" || selectedFormat === "default") {
    const minutes = Math.floor(duration % 60);
    const hours = Math.floor(duration / 60);

    return (
      <p
        className={twMerge(
          "font-bold",
          logsMode &&
            "pl-2 text-sm font-semibold italic leading-none text-slate-400/80 dark:text-slate-400/60",
        )}
      >
        {hours > 0 && `${hours} h`}
        {minutes > 0 && ` ${minutes} min`}
      </p>
    );
  }

  return (
    <p
      className={twMerge(
        "font-bold",
        logsMode &&
          "pl-2 text-sm font-semibold italic leading-none text-slate-400/80 dark:text-slate-400/60",
      )}
    >
      {`${duration} min`}
    </p>
  );
};

export const FormatDate = ({
  date,
  withDayOfTheWeek,
  className,
}: {
  date: Date;
  withDayOfTheWeek?: boolean;
  className: string;
}) => {
  const formatDate = (date: Date, withDayOfTheWeek?: boolean) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    if (withDayOfTheWeek) {
      const dayOfTheWeek = date
        .toLocaleString("en", { weekday: "short" })
        .split(" ")[0];

      return `${dayOfTheWeek}, ${day}-${month}-${year}`;
    }

    return `${day}-${month}-${year}`;
  };

  if (withDayOfTheWeek) {
    return <p className={className}>{formatDate(date, withDayOfTheWeek)}</p>;
  }

  return <p className={className}>{formatDate(date)}</p>;
};

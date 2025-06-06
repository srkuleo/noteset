import type { TimeFormatType } from "@/util/types";

export const FormatWorkoutDuration = ({
  duration,
  selectedFormat,
}: {
  duration: number;
  selectedFormat: TimeFormatType;
}) => {
  if (selectedFormat === "Hours and minutes" || selectedFormat === "default") {
    const minutes = Math.floor(duration % 60);
    const hours = Math.floor(duration / 60);

    if (hours === 0) {
      return (
        <p>
          <span className="font-bold">{minutes}</span> min
        </p>
      );
    }

    return (
      <p>
        <span className="font-bold">{hours}</span> h{" "}
        <span className="font-bold">{minutes}</span> min
      </p>
    );
  }

  return (
    <p>
      <span className="font-bold">{duration}</span> min
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

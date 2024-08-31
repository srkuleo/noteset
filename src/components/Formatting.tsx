import type { TimeFormatType } from "@/util/types";

export const FormatWorkoutDuration = ({
  timeFormat,
  duration,
}: {
  timeFormat: TimeFormatType;
  duration: number | null;
}) => {
  if (
    (duration && timeFormat === "Hours and minutes") ||
    (duration && timeFormat === "default")
  ) {
    const minutes = Math.floor(duration % 60);
    const hours = Math.floor(duration / 60);

    if (hours === 0) {
      return (
        <p className="">
          <span className="text-lg font-bold">{minutes}</span> min
        </p>
      );
    }

    return (
      <p className="">
        <span className="text-lg font-bold">{hours}</span> h{" "}
        <span className="text-lg font-bold">{minutes}</span> min
      </p>
    );
  }

  return (
    <p className="">
      <span className="text-lg font-bold">{duration}</span> min
    </p>
  );
};

export const FormatDate = ({
  date,
  className,
}: {
  date: Date | null;
  className: string;
}) => {
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${day}-${month}-${year}`;
  };

  if (date) {
    return <p className={className}>{formatDate(date)}</p>;
  }

  return <></>;
};

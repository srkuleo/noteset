import { twMerge } from "tailwind-merge";
import { ErrorTriangleIcon } from "../icons/user/warning";

type InputFieldErrorProps = React.HTMLAttributes<HTMLParagraphElement> & {
  errorArr?: string[];
  message?: string;
};

export const InputFieldError = ({
  errorArr,
  message,
  className,
}: InputFieldErrorProps) => {
  if (message) {
    return (
      <div className={twMerge("flex items-center gap-2.5 pt-2", className)}>
        <ErrorTriangleIcon size={6} />

        <p className="font-semibold leading-tight text-red-500 dark:text-slate-100">
          {message}
        </p>
      </div>
    );
  }

  if (!errorArr) {
    return null;
  }

  return errorArr.map((error, i) => (
    <div
      key={i}
      className={twMerge("flex items-center gap-1.5 pt-1", className)}
    >
      <ErrorTriangleIcon size={5} />

      <p className="text-sm font-semibold leading-tight text-red-500 dark:text-white">
        {error}
      </p>
    </div>
  ));
};

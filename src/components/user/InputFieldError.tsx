import { twMerge } from "tailwind-merge";
import { ErrorTriangleIcon } from "../icons/user/warning";

type InputFieldErrorProps = React.HTMLAttributes<HTMLParagraphElement> & {
  errorArr: string[] | undefined;
};

export const InputFieldError = ({
  errorArr,
  className,
}: InputFieldErrorProps) => {
  if (!errorArr) {
    return null;
  }

  return errorArr.map((error) => (
    <p
      key={error}
      className={twMerge(
        "flex items-center gap-1.5 pt-1 text-sm font-semibold text-red-500",
        className,
      )}
    >
      {ErrorTriangleIcon}
      {error}
    </p>
  ));
};

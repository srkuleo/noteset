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

  return (
    <div className={twMerge("flex items-center gap-1.5 pt-1", className)}>
      <div className="text-red-500">{ErrorTriangleIcon}</div>
      <p className="text-sm font-semibold leading-tight text-red-500">
        {errorArr[0]}
      </p>
    </div>
  );
};

import type { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type HeadingTextProps = HTMLAttributes<HTMLHeadingElement> & {
  label: string;
};

export const UserPagesHeadingText = ({
  label,
  className,
}: HeadingTextProps) => {
  return <h2 className={twMerge("text-[26px]", className)}>{label}</h2>;
};

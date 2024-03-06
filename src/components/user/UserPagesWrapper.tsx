import type { HTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type WrapperProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export const UserPagesWrapper = ({ children, className }: WrapperProps) => {
  return (
    <div className={twMerge("px-6 pb-safe-bottom", className)}>{children}</div>
  );
};

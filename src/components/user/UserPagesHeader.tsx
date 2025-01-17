import { twMerge } from "tailwind-merge";
import { Logo } from "../icons/logo";
import { ThemeButtonDevMode } from "../ThemeButtonDevMode";
import { GitHubButton } from "../GitHubButton";

import { type HTMLAttributes } from "react";

export const UserPagesHeader = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  return (
    <header className="fixed inset-x-0 top-0 z-[9990] bg-white px-4 pt-safe-top dark:bg-slate-900">
      <div className="py-2">
        <div className="flex items-center justify-between rounded-[28px] bg-white px-4 py-2 shadow-md ring-1 ring-slate-300/80 dark:bg-slate-800 dark:ring-slate-700">
          {Logo}

          <div className="flex items-center gap-3">
            {process.env.NODE_ENV === "development" && <ThemeButtonDevMode />}

            <GitHubButton />

            {children}
          </div>
        </div>
      </div>
    </header>
  );
};

export const UserPagesSubHeadingWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={twMerge(
        "fixed inset-x-0 top-[77px] z-[9990] mt-safe-top flex items-center justify-between border-b border-slate-300/80 bg-white px-6 pb-4 pt-2 dark:border-slate-800 dark:bg-slate-900",
        className,
      )}
    >
      {children}
    </div>
  );
};

type HeadingTextProps = HTMLAttributes<HTMLHeadingElement> & {
  label: string;
};

export const UserPagesSubHeadingText = ({
  label,
  className,
}: HeadingTextProps) => {
  return <h2 className={twMerge("text-[26px]", className)}>{label}</h2>;
};

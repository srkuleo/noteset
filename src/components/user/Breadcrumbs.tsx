import Link from "next/link";
import type { Breadcrumb } from "@/util/types";

export const Breadcrumbs = ({ breadcrumbs }: { breadcrumbs: Breadcrumb[] }) => {
  return (
    <ul className="flex pb-4">
      {breadcrumbs.map((bc, index) => (
        <li key={bc.href} aria-current={bc.active}>
          <Link
            href={bc.href}
            className={`${
              bc.active
                ? "font-manrope font-semibold uppercase"
                : "text-slate-400 dark:text-slate-600"
            } text-xl`}
          >
            {bc.label}
          </Link>
          {index < breadcrumbs.length - 1 && (
            <span className="px-4 text-xl text-slate-400 dark:text-slate-600">
              /
            </span>
          )}
        </li>
      ))}
    </ul>
  );
};

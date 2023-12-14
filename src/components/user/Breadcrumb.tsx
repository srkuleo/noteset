import Link from "next/link";

export type Breadcrumb = {
  label: string;
  href: string;
  active?: boolean;
};

export const Breadcrumbs = ({ breadcrumbs }: { breadcrumbs: Breadcrumb[] }) => {
  return (
    <ul className="flex items-end">
      {breadcrumbs.map((bc, index) => (
        <li key={bc.href} aria-current={bc.active}>
          <Link
            href={bc.href}
            className={`${
              bc.active
                ? "font-semibold uppercase"
                : "text-lg text-slate-400/80 dark:text-slate-600"
            }`}
          >
            {bc.label}
          </Link>
          {index < breadcrumbs.length - 1 && (
            <span className="px-4 text-xl text-slate-400/80 dark:text-slate-600">
              /
            </span>
          )}
        </li>
      ))}
    </ul>
  );
};

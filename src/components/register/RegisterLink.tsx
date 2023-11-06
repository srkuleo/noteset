import Link from "next/link";

export const RegisterLink = () => {
  return (
    <p className="pb-4 text-xs text-slate-500 dark:text-slate-300/90">
      Already have an account? Login{" "}
      <Link
        href="/login"
        className="border-b border-green-500 text-sm font-semibold text-green-500"
      >
        here.
      </Link>
    </p>
  );
};

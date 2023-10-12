import Link from "next/link";

export const LoginLinks = () => {
  return (
    <div className="space-y-2 pb-4 text-xs text-slate-500 dark:text-slate-300/90">
      <p>
        Forgot your{" "}
        <Link
          href="/"
          className="border-b border-green-500 text-sm font-semibold text-green-500"
        >
          password?
        </Link>
      </p>
      <p>
        New to Noteset? Sign up{" "}
        <Link
          href="/sign-up"
          className="border-b border-green-500 text-sm font-semibold text-green-500"
        >
          here.
        </Link>
      </p>
    </div>
  );
};

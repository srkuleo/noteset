import Link from "next/link";

export const LoginLinks = () => {
  return (
    <div className="space-y-2 pb-4 text-xs">
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
        New to Noteset? Register{" "}
        <Link
          href="/register"
          className="border-b border-green-500 text-sm font-semibold text-green-500"
        >
          here.
        </Link>
      </p>
    </div>
  );
};

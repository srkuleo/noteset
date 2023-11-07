import Link from "next/link";

export const RegisterLink = () => {
  return (
    <p className="pb-4 text-xs">
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

import Link from "next/link";
import { Arrow } from "../../../icons/auth/arrow";

export const RegisterLink = () => {
  return (
    <div className="flex gap-1 text-sm">
      <p>Already have an account?</p>
      <Link
        href="/login"
        className="flex gap-[2px] font-semibold text-green-500"
      >
        Login
        <Arrow />
      </Link>
    </div>
  );
};

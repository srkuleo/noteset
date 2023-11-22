import Link from "next/link";
import { Arrow } from "../../../icons/auth/arrow";

export const LoginLinks = () => {
  return (
    <div className="space-y-2 text-sm">
      <div className="flex gap-1">
        <p>Forgot your</p>
        <Link href="/" className="font-semibold text-green-500">
          password?
        </Link>
      </div>
      
      <div className="flex gap-1">
        <p>New to Noteset?</p>
        <Link
          href="/register"
          className="flex gap-[2px] font-semibold text-green-500"
        >
          Register
          <Arrow />
        </Link>
      </div>
    </div>
  );
};

import { GoogleIcon } from "../../icons/auth/google";
import { signIn } from "@/auth";

export const GoogleAuthButton = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", { redirectTo: "/user/home" });
      }}
      className="flex"
    >
      <button className="flex grow items-center justify-center gap-4 rounded-xl bg-white py-2.5 text-sm shadow-md ring-1 ring-slate-400/50 transition active:scale-95 dark:shadow-slate-950 dark:ring-0">
        <GoogleIcon />
        <p className="font-semibold italic dark:text-slate-500">
          Continue with Google
        </p>
      </button>
    </form>
  );
};

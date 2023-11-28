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
      <button className="flex grow items-center justify-center gap-4 rounded-xl bg-white py-3 text-sm shadow-md ring-1 ring-slate-400/60 transition active:scale-95 dark:ring-slate-700 ring-inset dark:bg-transparent">
        <GoogleIcon />
        <p className="font-semibold italic">
          Continue with Google
        </p>
      </button>
    </form>
  );
};

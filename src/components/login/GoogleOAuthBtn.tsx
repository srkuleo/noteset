import { GoogleIcon } from "@/icons/login/google";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs";

export const GoogleOAuthButton = () => {
  return (
    <LoginLink
      authUrlParams={{
        connection_id: "conn_ac6e434edebf42099dd4371003bca270",
      }}
      className="flex items-center justify-center gap-2 rounded-xl bg-white py-2 shadow-md ring-1 ring-slate-300 transition active:scale-95 dark:bg-slate-900 dark:ring-slate-700"
    >
      {GoogleIcon}
      <p className="font-semibold">Sign-In with Google</p>
    </LoginLink>
  );
};

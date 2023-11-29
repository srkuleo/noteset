import { GitHubIcon } from "@/icons/auth/github";
import { GoogleIcon } from "@/icons/auth/google";

type Providers = "GitHub" | "Google";
type FormActionType = string | ((formData: FormData) => void);

export const OAuthProviders = () => {
  return (
    <form className="flex flex-col gap-3">
      <OAuthButtonWrapper
        provider="GitHub"
        formAction={async () => {
          "use server";
          //Example
          console.log("GitHub Auth");
        }}
      >
        <GitHubIcon className="h-6 w-6" />
      </OAuthButtonWrapper>
      <OAuthButtonWrapper
        provider="Google"
        formAction={async () => {
          "use server";
          //Example
          console.log("Google Auth");
        }}
      >
        <GoogleIcon />
      </OAuthButtonWrapper>
    </form>
  );
};

const OAuthButtonWrapper = ({
  children,
  provider,
  formAction,
}: {
  children: React.ReactNode;
  provider: Providers;
  formAction: FormActionType;
}) => {
  return (
    <button
      formAction={formAction}
      className="flex items-center justify-center gap-4 rounded-xl bg-white py-3 text-sm shadow-md ring-1 ring-inset ring-slate-400/60 transition active:scale-95 dark:bg-transparent dark:ring-slate-700"
    >
      {children}
      <p className="font-semibold italic">Continue with {provider}</p>
    </button>
  );
};

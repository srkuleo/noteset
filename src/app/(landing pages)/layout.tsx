import { redirect } from "next/navigation";
import { getAuth } from "@/util/actions/auth";
import { LandingPageBar } from "@/components/landing/LandingPageBar";

export default async function LandingPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await getAuth();

  if (user) {
    redirect("/home");
  }

  return (
    <div className="flex h-full flex-col pt-safe-top">
      <LandingPageBar />
      <UiMessage />

      <main className="px-8">{children}</main>
    </div>
  );
}

const UiMessage = () => {
  return (
    <div className="hidden md:block">
      <p className="bg-red-500 py-2 text-center font-manrope text-lg text-white">
        <span className="font-bold underline underline-offset-4">
          Important
        </span>
        : UI is not suitable for large screens. Visit on mobile.
      </p>
    </div>
  );
};

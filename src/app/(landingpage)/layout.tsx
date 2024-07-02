import { LandingPageBar } from "@/components/landing/LandingPageBar";

export default async function LandingPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col">
      <LandingPageBar />
      <UiMessage />
      <div className="mb-10 flex grow flex-col justify-center px-8 pb-8 pt-safe-top lg:mb-32">
        {children}
      </div>
    </main>
  );
}

const UiMessage = () => {
  return (
    <>
      <div className="mt-16 hidden pt-safe-top md:block">
        <p className="bg-red-500 py-2 text-center font-manrope text-lg text-white">
          <span className="font-bold underline underline-offset-4">
            Important
          </span>
          : UI is not suitable for large screens. Visit on mobile.
        </p>
      </div>
    </>
  );
};

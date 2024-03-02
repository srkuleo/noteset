import { LandingPageBar } from "@/components/landing/LandingPageBar";

export default function LandingPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col min-h-screen select-none">
      <LandingPageBar />
      <UiMessage />
      {children}
    </main>
  );
}

const UiMessage = () => {
  return (
    <>
      <div className="mt-18 hidden pt-safe-top md:block">
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

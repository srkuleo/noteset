import { LandingPageBar } from "@/components/landing/LandingPageBar";

export default function LandingPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-lvh touch-none select-none flex-col pt-safe-top">
      <LandingPageBar />
      <UiMessage />
      {children}
    </main>
  );
}

const UiMessage = () => {
  return (
    <>
      <div className="hidden md:block">
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

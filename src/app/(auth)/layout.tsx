import { LandingPageHeader } from "@/components/navbars/LandingPageHeader";

export default function LandingPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen select-none flex-col">
      <LandingPageHeader />
      <UiMessage />
      <div className="mt-32 flex grow flex-col px-8 pb-8 pt-safe-top">
        <HeroTitle />
        {children}
      </div>
    </main>
  );
}

const UiMessage = () => {
  return (
    <div className="hidden pt-16 md:block">
      <p className="bg-red-500 py-2 text-center font-manrope text-lg text-white">
        <span className="font-bold underline underline-offset-4">
          Important
        </span>
        : UI is not suitable for large screens. Visit on mobile.
      </p>
    </div>
  );
};

const HeroTitle = () => {
  return (
    <h1 className="mx-auto w-fit bg-gradient-to-r from-green-500 to-violet-500 bg-clip-text pb-6 text-6xl font-extrabold text-transparent dark:to-violet-600">
      Note<span className="font-bold">Set</span>
    </h1>
  );
};

import { LandingPageHeader } from "@/components/navbars/LandingPageHeader";
import { manrope } from "@/styles/fonts";

export default function LandingPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen touch-none select-none flex-col">
      <LandingPageHeader />
      <div className="hidden pt-2 md:block">
        <p
          className={`${manrope.className} bg-red-500 py-2 text-center text-lg text-white`}
        >
          <span className="font-bold underline underline-offset-4">
            Important
          </span>
          : UI is not suitable for large screens. Visit on mobile.
        </p>
      </div>
      {children}
    </main>
  );
}

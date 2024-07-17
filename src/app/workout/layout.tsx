import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Workout",
};

export default async function WorkoutPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex flex-col h-full">{children}</div>;
}

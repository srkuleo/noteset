import { Suspense } from "react";
import { LoadingWorkoutToDoSkeleton } from "@/components/Loading";

export default async function WorkoutToDoPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<LoadingWorkoutToDoSkeleton />}>{children}</Suspense>
  );
}

import { Suspense } from "react";
import { BackButtonModal } from "@/components/BackButtonModal";
import {
  UserPagesSubHeadingWrapper,
  UserPagesSubHeadingText,
} from "@/components/user/UserPagesHeader";
import { AddOrEditWorkoutTooltip } from "@/components/Tooltips";
import { LoadingEditWorkoutPageSkeleton } from "@/components/Loading";

export default async function EditPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <UserPagesSubHeadingWrapper className="justify-start gap-3 px-4">
        <BackButtonModal className="rounded-full p-1.5 active:bg-slate-200 dark:active:bg-slate-700" />
        <UserPagesSubHeadingText label="Edit workout" className="text-2xl" />

        <AddOrEditWorkoutTooltip />
      </UserPagesSubHeadingWrapper>

      <Suspense fallback={<LoadingEditWorkoutPageSkeleton />}>
        {children}
      </Suspense>
    </>
  );
}

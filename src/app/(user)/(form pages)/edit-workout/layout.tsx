import { Suspense } from "react";
import {
  UserPagesSubHeadingWrapper,
  UserPagesSubHeadingText,
} from "@/components/user/UserPagesHeader";
import { BackButtonModal } from "@/components/BackButtonModal";
import { AddOrEditWorkoutTooltip } from "@/components/Tooltips";
import { EditAndCreateWorkoutPagesSkeleton } from "@/components/Loading";

export default async function EditWorkoutPageLayout({
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

      <Suspense fallback={<EditAndCreateWorkoutPagesSkeleton />}>
        {children}
      </Suspense>
    </>
  );
}

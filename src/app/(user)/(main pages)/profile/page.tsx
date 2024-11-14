import { Suspense } from "react";
import {
  UserPagesSubHeadingWrapper,
  UserPagesSubHeadingText,
} from "@/components/user/UserPagesHeader";
import { ProfilePageSkeleton } from "@/components/Loading";
import { ProfilePageContent } from "@/components/user/profile/ProfilePageContent";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
};

export default async function ProfilePage() {
  return (
    <>
      <UserPagesSubHeadingWrapper className="pb-[17px]">
        <UserPagesSubHeadingText label="Profile page" />
      </UserPagesSubHeadingWrapper>

      <Suspense fallback={<ProfilePageSkeleton />}>
        <ProfilePageContent />
      </Suspense>
    </>
  );
}

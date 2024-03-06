import type { Metadata } from "next";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { WorkoutsPagesWrapper } from "@/components/user/WorkoutsPagesWrapper";
import { WorkoutsPagesHeadingText } from "@/components/user/WorkoutsPagesHeadingText";

export const metadata: Metadata = {
  title: "Profile",
};

export default async function ProfilePage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <WorkoutsPagesWrapper>
      <WorkoutsPagesHeadingText label="Profile page" />
      <p className="">
        Full name: {user?.given_name} {user?.family_name}
      </p>
    </WorkoutsPagesWrapper>
  );
}

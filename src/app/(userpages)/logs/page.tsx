import { WorkoutsPagesHeadingText } from "@/components/user/WorkoutsPagesHeadingText";
import { WorkoutsPagesWrapper } from "@/components/user/WorkoutsPagesWrapper";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Logs",
};

export default function LogsPage() {
  return (
    <WorkoutsPagesWrapper>
      <WorkoutsPagesHeadingText label="Logs" />
    </WorkoutsPagesWrapper>
  );
}

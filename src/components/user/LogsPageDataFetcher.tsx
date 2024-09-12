import { redirect } from "next/navigation";
import { getAuth } from "@/util/actions/auth";
import { getUserDoneWorkouts } from "@/db/query";
import { LogsPageContent } from "./LogsPageContent";

export const LogsPageDataFetcher = async () => {
  const { user } = await getAuth();

  if (!user) {
    redirect("/login");
  }

  const doneWorkouts = await getUserDoneWorkouts();

  return (
    <LogsPageContent
      doneWorkouts={doneWorkouts}
      timeFormatPreference={user.preferences.timeFormat}
    />
  );
};

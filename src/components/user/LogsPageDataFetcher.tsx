import { redirect } from "next/navigation";
import { getAuthSession } from "@/util/session";
import { getUserDoneWorkouts } from "@/db/query";
import { LogsPageContent } from "./LogsPageContent";

export const LogsPageDataFetcher = async () => {
  const { user } = await getAuthSession();

  if (user === null) {
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

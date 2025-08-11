import { redirect } from "next/navigation";
import { getAuthSession } from "@/util/session";
import { getUserDoneWorkouts } from "@/db/query";
import { LogsPageNavBar } from "./LogsPageNavBar";
import { LogsPageContent } from "./LogsPageContent";

import type { LogsPageSearchParams } from "@/util/types";

export const LogsPageDataFetcher = async ({
  searchQuery,
  strictMode,
}: LogsPageSearchParams) => {
  const { user } = await getAuthSession();

  if (user === null) {
    redirect("/login");
  }

  const doneWorkouts = await getUserDoneWorkouts(
    searchQuery,
    strictMode,
    user.preferences.logsOrder,
  );

  return (
    <>
      {(doneWorkouts.length > 0 || searchQuery) && (
        <LogsPageNavBar
          searchQuery={searchQuery}
          strictMode={strictMode}
          logsOrderPreference={user.preferences.logsOrder}
        />
      )}

      <LogsPageContent
        doneWorkouts={doneWorkouts}
        timeFormatPreference={user.preferences.timeFormat}
        searchQuery={searchQuery}
      />
    </>
  );
};

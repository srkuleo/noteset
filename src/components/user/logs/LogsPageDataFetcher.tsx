import { redirect } from "next/navigation";
import { getAuthSession } from "@/util/session";
import { getUserDoneWorkouts } from "@/db/query";
import { LogsPageSearchBar } from "./LogsPageSearchBar";
import { LogsPageContent } from "./LogsPageContent";

import type { LogsPageSearchParams } from "@/app/(user)/(main pages)/logs/page";

export const LogsPageDataFetcher = async ({
  searchParams,
}: LogsPageSearchParams) => {
  const { user } = await getAuthSession();

  if (user === null) {
    redirect("/login");
  }

  const doneWorkouts = await getUserDoneWorkouts(
    searchParams.searchQuery,
    searchParams.strictMode,
    user.preferences.logsOrder,
  );

  return (
    <>
      {(doneWorkouts.length > 0 || searchParams.searchQuery) && (
        <LogsPageSearchBar
          searchQuery={searchParams.searchQuery}
          logsOrderPreference={user.preferences.logsOrder}
        />
      )}

      <LogsPageContent
        doneWorkouts={doneWorkouts}
        timeFormatPreference={user.preferences.timeFormat}
      />
    </>
  );
};

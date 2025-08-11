import { SearchIndicator } from "./SearchIndicator";
import { Search } from "./Search";

import type { LogsOrderType, LogsPageSearchParams } from "@/util/types";

export const LogsPageNavBar = ({
  searchQuery,
  strictMode,
  logsOrderPreference,
}: LogsPageSearchParams & {
  logsOrderPreference: LogsOrderType;
}) => {
  return (
    <div className="fixed inset-x-0 top-[141px] z-[9990] mt-safe-top bg-slate-100/60 p-4 backdrop-blur-md dark:bg-slate-950/60">
      {searchQuery ? (
        <SearchIndicator searchQuery={searchQuery} strictMode={strictMode} />
      ) : (
        <Search
          searchQuery={searchQuery}
          logsOrderPreference={logsOrderPreference}
        />
      )}
    </div>
  );
};

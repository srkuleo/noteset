import { UserPagesSubHeadingWrapper } from "@/components/user/UserPagesHeader";
import { HomePageTooltip } from "@/components/Tooltips";
import { RouteDropDownMenu } from "@/components/user/home/RouteDropDownMenu";
import { PatchNotesDrawer } from "@/components/user/home/PatchNotesDrawer";

export default async function HomePagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <UserPagesSubHeadingWrapper>
        <RouteDropDownMenu />

        <div className="flex items-center gap-1">
          <HomePageTooltip />

          <PatchNotesDrawer />
        </div>
      </UserPagesSubHeadingWrapper>
      {children}
    </>
  );
}

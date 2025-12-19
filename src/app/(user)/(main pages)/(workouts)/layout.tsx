import { HomePageTooltip } from "@/components/Tooltips"
import { PatchNotesDrawer } from "@/components/user/home/PatchNotesDrawer"
import { RouteDropDownMenu } from "@/components/user/home/RouteDropDownMenu"
import { UserPagesSubHeadingWrapper } from "@/components/user/UserPagesHeader"

export default async function HomePagesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <UserPagesSubHeadingWrapper>
        <RouteDropDownMenu />

        <div className="flex">
          <HomePageTooltip />

          <div className="mx-1 w-[1px] bg-slate-200 dark:bg-slate-700" />

          <PatchNotesDrawer />
        </div>
      </UserPagesSubHeadingWrapper>
      {children}
    </>
  )
}

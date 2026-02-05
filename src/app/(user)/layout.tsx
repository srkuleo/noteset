import { UserPagesHeader } from "@/components/user/UserPagesHeader"

export default async function UserPagesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <UserPagesHeader />

      {children}
    </>
  )
}

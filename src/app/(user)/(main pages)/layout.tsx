import { MainPagesFooter } from "@/components/user/MainPagesFooter"

export default async function MainPagesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <MainPagesFooter />
    </>
  )
}

import type { Metadata } from "next";
import { auth } from "@/auth";


export const metadata: Metadata = {
  title: "Home",
};

export default async function UserHomePage() {
  const session = await auth();
  console.log(session?.user);

  return (
    <div className="grow px-4 pt-40">
      <p>This is ${session?.user.username || session?.user.name} Home page.</p>
    </div>
  );
}

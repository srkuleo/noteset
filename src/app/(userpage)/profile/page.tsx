import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
};

export default function ProfilePage() {
  return (
    <>
      <p className="text-center text-lg font-semibold">Profile page</p>
    </>
  );
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
};

export default function UserLogsPage() {
  return (
    <div className="flex grow flex-col items-center px-4 pb-8 pt-48 text-lg font-semibold">
      <p>Profile page</p>
    </div>
  );
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
};

export default function UserLogsPage() {
  return (
    <div className="grow pb-4 pt-2 text-center">
      <p>This is user`s Profile page.</p>
    </div>
  );
}

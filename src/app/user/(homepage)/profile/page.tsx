import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
};

export default function UserLogsPage() {
  return (
    <div className="grow px-4 pt-40 text-center">
      <p>This is user`s Profile page.</p>
    </div>
  );
}

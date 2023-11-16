import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

export default function UserHomePage() {
  return (
    <div className="grow pb-4 pt-2">
      <p>This is user`s Home page.</p>
    </div>
  );
}

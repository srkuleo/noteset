import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

export default function UserHomePage() {
  return (
    <div className="grow px-4">
      <p>This is user`s Home page.</p>
    </div>
  );
}

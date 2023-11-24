import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Logs",
};

export default function LogsPage() {
  return (
    <div className="grow px-4 pt-40 text-right">
      <p>This is user`s Logs page.</p>
    </div>
  );
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Logs",
};

export default function LogsPage() {
  return (
    <div className="flex grow flex-col items-center px-4 pb-8 pt-48 text-lg font-semibold">
      <p>This is user`s Logs page.</p>
    </div>
  );
}
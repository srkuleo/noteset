import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Logs",
};

export default function LogsPage() {
  return (
    <>
      <h2 className="text-2xl font-extrabold text-slate-600 dark:text-white pt-2 pb-6">
        Logs page
      </h2>
    </>
  );
}

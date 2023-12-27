import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Logs",
};

export default function LogsPage() {
  return (
    <>
      <p className="text-lg font-semibold text-center">This is user`s Logs page.</p>
    </>
  );
}

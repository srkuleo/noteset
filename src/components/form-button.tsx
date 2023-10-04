export const SubmitFormBtn = ({ children }: { children: React.ReactNode }) => {
  return (
    <button
      type="submit"
      className="mb-4 rounded-3xl bg-green-500 p-3 text-center font-semibold text-slate-50 shadow-md dark:bg-green-700 dark:ring-2 dark:ring-inset dark:ring-green-500"
    >
      {children}
    </button>
  );
};

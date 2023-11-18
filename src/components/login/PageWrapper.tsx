export const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex grow items-center justify-center py-4">
      <div className="flex max-w-[260px] grow flex-col">{children}</div>
    </div>
  );
};

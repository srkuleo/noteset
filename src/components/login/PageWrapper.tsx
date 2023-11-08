export const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex grow items-center justify-center">
      <div className="flex max-w-[260px] grow flex-col">{children}</div>
    </div>
  );
};

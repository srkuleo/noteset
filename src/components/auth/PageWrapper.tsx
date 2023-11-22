export const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex justify-center pb-4 pt-52">
      <div className="flex max-w-[260px] grow flex-col">{children}</div>
    </div>
  );
};

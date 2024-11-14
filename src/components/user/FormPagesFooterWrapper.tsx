export const FormPagesFooterWrapper = ({
  children,
  disabled,
}: {
  children: React.ReactNode;
  disabled: boolean;
}) => {
  return (
    <fieldset
      disabled={disabled}
      className="group fixed inset-x-0 bottom-0 z-20 border-t border-slate-300/80 bg-white px-6 pb-6 pt-2 dark:border-slate-800 dark:bg-slate-900"
    >
      <footer className="flex justify-between group-disabled:pointer-events-none group-disabled:opacity-50">
        {children}
      </footer>
    </fieldset>
  );
};

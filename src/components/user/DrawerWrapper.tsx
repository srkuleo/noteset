import type { Workout } from "@/db/schema";
import { manrope } from "@/styles/fonts";
import { Drawer } from "vaul";

type ModalType = "preview" | "tooltip";
type CloseButtonText = "Close" | "Done";

export const DrawerWrapper = ({
  children,
  modalType,
  closeButtonText,
  workout,
}: {
  children: React.ReactNode;
  modalType: ModalType;
  closeButtonText?: CloseButtonText;
  workout?: Workout;
}) => {
  return (
    <Drawer.Portal>
      <Drawer.Overlay className="fixed inset-0 bg-slate-900/40 dark:bg-slate-950/70" />

      <Drawer.Content
        className={`${modalType === "tooltip" ? "max-h-[80%]" : "max-h-[92%]"} h-full fixed bottom-0 left-0 right-0 select-none pt-safe-top text-slate-500 focus:outline-none dark:text-white`}
      >
        <div className="h-full rounded-t-modal bg-white dark:bg-slate-900">
          <div className="space-y-4 rounded-t-modal bg-slate-100/50 px-2 pb-4 pt-2 dark:bg-slate-800/50">
            <div className="mx-auto h-1 w-10 rounded-full bg-slate-200 dark:bg-slate-700/70" />

            <div className="flex items-center justify-center">
              <p className={`font-bold ${manrope.className} text-lg`}>
                {modalType === "preview" && `Preview: ${workout?.title}`}
                {modalType === "tooltip" && "UX Information"}
              </p>
              {closeButtonText && (
                <Drawer.Close className="absolute right-4 text-lg font-extrabold text-violet-500 focus:outline-none active:text-violet-300 dark:text-violet-400 active:dark:text-violet-600">
                  {closeButtonText}
                </Drawer.Close>
              )}
            </div>
          </div>

          <div className="h-[1px] bg-slate-200 dark:bg-slate-700/70" />

          <div className="px-6 py-8">{children}</div>
        </div>
      </Drawer.Content>
    </Drawer.Portal>
  );
};

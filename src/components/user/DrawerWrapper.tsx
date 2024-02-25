import type { Workout } from "@/db/schema";
import { manrope } from "@/styles/fonts";
import { Drawer } from "vaul";

type ModalTitle = "preview" | "add exercise";
type CloseButtonText = "Close" | "Done";

export const DrawerWrapper = ({
  children,
  modalTitle,
  closeButtonText,
  workout,
}: {
  children: React.ReactNode;
  modalTitle: ModalTitle;
  closeButtonText: CloseButtonText;
  workout?: Workout;
}) => {
  return (
    <Drawer.Portal>
      <Drawer.Overlay className="fixed inset-0 bg-slate-900/40 dark:bg-slate-950/70" />

      <Drawer.Content className="fixed bottom-0 left-0 right-0 h-[98%] select-none pb-safe-bottom pt-safe-top focus:outline-none">
        <div className="h-full rounded-t-modal bg-white dark:bg-slate-800">
          <div className="space-y-6 rounded-t-modal bg-slate-100/65 px-2 pb-4 pt-2 dark:bg-slate-900/35">
            <div className="mx-auto h-1 w-12 rounded-full bg-slate-200 dark:bg-slate-700" />

            <div className="flex items-center justify-center">
              <p className={`font-bold ${manrope.className}`}>
                {modalTitle === "preview" && `Preview: ${workout?.title}`}
                {modalTitle === "add exercise" && "Add exercise"}
              </p>
              <Drawer.Close className="absolute right-4 text-lg font-extrabold text-violet-500 focus:outline-none active:text-violet-300 dark:text-violet-400 active:dark:text-violet-600">
                {closeButtonText}
              </Drawer.Close>
            </div>
          </div>

          <div className="h-[1px] bg-slate-200 dark:bg-slate-700" />

          <div
            className={`${modalTitle === "add exercise" && "h-full overflow-y-scroll"} px-6 py-8`}
          >
            {children}
          </div>
        </div>
      </Drawer.Content>
    </Drawer.Portal>
  );
};

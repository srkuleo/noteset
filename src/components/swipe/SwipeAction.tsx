import useMotionMeasure from "react-use-motion-measure";
import { twMerge } from "tailwind-merge";
import { mergeRefs } from "react-merge-refs";
import {
  motion,
  useMotionValueEvent,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  createContext,
  useContext,
  useMemo,
  useRef,
  useState,
  type ComponentProps,
  type Dispatch,
  type ReactNode,
  type Ref,
  type SetStateAction,
} from "react";
import { useSnap, type DirectionOptions } from "@/util/hooks/useSnap";

export type SwipeActionsRootProps = {
  className?: string;
  children?: ReactNode;
  //Choose whether div is draggable or not
  direction: DirectionOptions;
};

export type SwipeActionsTriggerProps = {
  className?: string;
  children?: ReactNode;
};

export type SwipeActionsActionsProps = {
  wrapperClassName?: string;
  secondaryWrapperClassName?: string;
  className?: string;
  children?: ReactNode;
};

export type SwipeActionActionsProps = ComponentProps<typeof motion.button>;

const SwipeActionsContext = createContext<{
  // We'll cover every property as we go
  actionsWrapperInset: number;
  actionsWidth: number;
  setActionsWidth: Dispatch<SetStateAction<number>>;
  triggerRef: Ref<HTMLDivElement>;
  triggerHeight: MotionValue<number>;
  dragProps: ReturnType<typeof useSnap>["dragProps"];
  setOpen: (open: boolean) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}>(null as any);

export const useSwipeActionsContext = () => {
  const ctx = useContext(SwipeActionsContext);
  if (!ctx) throw new Error("SwipeActionsContext.Provider is missing");
  return ctx;
};

const Root = ({ className, children, direction }: SwipeActionsRootProps) => {
  const [actionsWidth, setActionsWidth] = useState(0);
  const actionsWrapperInset = 2;

  const handleRef = useRef<HTMLDivElement>(null);
  const [triggerMeasureRef, triggerBounds] = useMotionMeasure();

  const constraints = useMemo(
    () => ({
      right: 0,
      left: -actionsWidth - actionsWrapperInset,
    }),
    [actionsWidth, actionsWrapperInset],
  );

  const { dragProps, snapTo } = useSnap({
    direction: direction,
    ref: handleRef,
    snapPoints: {
      type: "constraints-box",
      points: [{ x: 0 }, { x: 1 }],
      unit: "percent",
    },
    constraints,
    dragElastic: { right: 0.04, left: 0.04 },
    springOptions: {
      bounce: 0.2,
    },
  });

  return (
    <SwipeActionsContext.Provider
      value={{
        actionsWidth,
        setActionsWidth,
        triggerRef: mergeRefs([
          handleRef,
          triggerMeasureRef,
        ]) as Ref<HTMLDivElement>,
        dragProps,
        triggerHeight: triggerBounds.height,
        actionsWrapperInset,
        setOpen: (open) => snapTo(open ? 0 : 1),
      }}
    >
      <div className={twMerge("relative", className)}>{children}</div>
    </SwipeActionsContext.Provider>
  );
};

const Trigger = ({ children, className }: SwipeActionsTriggerProps) => {
  const { dragProps, triggerRef } = useSwipeActionsContext();

  return (
    <motion.div
      role="button"
      tabIndex={0}
      ref={triggerRef}
      className={twMerge("relative z-10", className)}
      {...dragProps}
    >
      {children}
    </motion.div>
  );
};

const Actions = ({
  wrapperClassName,
  secondaryWrapperClassName,
  className,
  children,
}: SwipeActionsActionsProps) => {
  const { actionsWrapperInset, setOpen, triggerHeight, setActionsWidth } =
    useSwipeActionsContext();
  const actionsWrapperHeight = useTransform(
    triggerHeight,
    (v) => v - actionsWrapperInset,
  );

  const [actionsMeasureRef, actionsBounds] = useMotionMeasure();
  useMotionValueEvent(actionsBounds.width, "change", setActionsWidth);

  return (
    <motion.div
      className={twMerge(
        "absolute flex justify-end overflow-hidden",
        wrapperClassName,
      )}
      style={{
        // Need to set height explicitly or otherwise Firefox and Safari will incorrectly calculate actions width
        height: actionsWrapperHeight,
        inset: actionsWrapperInset,
      }}
    >
      {secondaryWrapperClassName ? (
        //Needed for cases when Actions div should not be of the same lenght as the Root div
        <motion.div className={twMerge("w-full", secondaryWrapperClassName)}>
          <motion.div
            //Default is flex-row but it can be modified via className prop
            ref={actionsMeasureRef}
            onFocus={() => setOpen(true)}
            onBlur={() => setOpen(false)}
            className={twMerge("flex", className)}
          >
            {children}
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          //Default is flex-row but it can be modified via className prop
          ref={actionsMeasureRef}
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
          className={twMerge("flex", className)}
        >
          {children}
        </motion.div>
      )}
    </motion.div>
  );
};

const Action = ({
  className,
  children,
  onClick,
  ...props
}: SwipeActionActionsProps) => {
  const { setOpen } = useSwipeActionsContext();
  return (
    <motion.button
      className={twMerge("outline-2 -outline-offset-2", className)}
      onClick={(e) => {
        onClick?.(e);
        if (!e.defaultPrevented) {
          setOpen(false);
          (document.activeElement as HTMLElement | null)?.blur();
        }
      }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export const SwipeAction = {
  Root,
  Trigger,
  Actions,
  Action,
};

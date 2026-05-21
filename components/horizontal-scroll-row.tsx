import { cn } from "@/lib/utils";

type HorizontalScrollRowProps = {
  className?: string;
  children: React.ReactNode;
};

/** Native horizontal scroll; avoids Radix viewport vertical clip on scaled row items. */
export function HorizontalScrollRow({
  className,
  children,
}: HorizontalScrollRowProps) {
  return (
    <div
      className={cn(
        "scrollbar-simple-x w-full overflow-x-auto overflow-y-visible pb-[var(--scrollbar-simple-slot-y)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

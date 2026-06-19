import { cn } from "@/lib/utils";

type FormaLogoProps = {
  className?: string;
};

export default function FormaLogo({ className }: FormaLogoProps) {
  return (
    <span
      className={cn(
        "text-lg font-bold tracking-tight text-primary dark:text-foreground",
        className,
      )}
      aria-label="Forma 포르마"
    >
      Forma
    </span>
  );
}

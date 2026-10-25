import { cn } from "@/lib/utils";

interface BrandMarkProps {
  tone?: "dark" | "light";
  className?: string;
}

export function BrandMark({ tone = "dark", className }: BrandMarkProps) {
  const isLight = tone === "light";

  return (
    <span className={cn("inline-flex flex-col leading-none", className)}>
      <span
        className={cn(
          "font-brand text-[1.8rem] leading-none tracking-[0.01em]",
          isLight ? "text-sand" : "text-ink",
        )}
      >
        Maduka
      </span>
      <span
        className={cn(
          "mt-1 text-[0.48rem] font-semibold uppercase leading-none tracking-[0.26em]",
          isLight ? "text-sand/60" : "text-coastal",
        )}
      >
        Restaurant &amp; Rooms
      </span>
    </span>
  );
}

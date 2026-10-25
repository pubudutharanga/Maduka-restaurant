import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  tone?: "dark" | "light";
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  tone = "dark",
  align = "left",
  className,
  titleClassName,
}: SectionHeadingProps) {
  const isLight = tone === "light";

  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <div
        className={cn(
          "flex items-center gap-3",
          align === "center" && "justify-center",
          isLight ? "text-turmeric" : "text-cinnamon",
        )}
      >
        <span className="h-px w-8 bg-current opacity-60" aria-hidden="true" />
        <p className="eyebrow">{eyebrow}</p>
        {align === "center" ? (
          <span
            className="h-px w-8 bg-current opacity-60"
            aria-hidden="true"
          />
        ) : null}
      </div>
      <h2
        className={cn(
          "mt-5 text-[2.25rem] leading-[1.03] tracking-[-0.025em] sm:text-5xl lg:text-[3.5rem]",
          isLight ? "text-sand" : "text-ink",
          titleClassName,
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-5 max-w-2xl text-[0.95rem] leading-7 sm:text-base",
            align === "center" && "mx-auto",
            isLight ? "text-sand/70" : "text-coastal",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

export function HandwrittenNote({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "font-hand text-2xl leading-tight text-cinnamon sm:text-[1.7rem]",
        className,
      )}
    >
      {children}
    </p>
  );
}

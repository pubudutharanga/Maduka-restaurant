import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant =
  | "primary"
  | "outline"
  | "outlineLight"
  | "ocean"
  | "light"
  | "ghost"
  | "whatsapp";

type ButtonSize = "sm" | "md" | "lg";

interface ButtonStyleOptions {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-[-0.01em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cinnamon focus-visible:ring-offset-2 focus-visible:ring-offset-sand disabled:pointer-events-none disabled:opacity-60";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-cinnamon text-sand shadow-[0_14px_34px_-18px_rgba(217,107,39,0.9)] hover:-translate-y-0.5 hover:bg-cinnamon-deep",
  outline:
    "border border-ink/20 text-ink hover:-translate-y-0.5 hover:border-ink/40 hover:bg-ink/[0.04]",
  outlineLight:
    "border border-sand/35 bg-white/[0.03] text-sand backdrop-blur-sm hover:-translate-y-0.5 hover:border-sand/60 hover:bg-white/10",
  ocean:
    "bg-ocean text-sand shadow-[0_14px_34px_-18px_rgba(13,76,92,0.9)] hover:-translate-y-0.5 hover:bg-ocean-deep",
  light:
    "bg-sand text-ink shadow-[0_14px_34px_-18px_rgba(0,0,0,0.4)] hover:-translate-y-0.5 hover:bg-ivory",
  ghost: "text-ink hover:bg-ink/[0.05]",
  whatsapp:
    "bg-whatsapp text-white shadow-[0_14px_34px_-18px_rgba(18,140,126,0.9)] hover:-translate-y-0.5 hover:bg-[#0d7568]",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-xs",
  md: "h-12 px-5 text-sm",
  lg: "h-[3.4rem] px-6 text-sm sm:px-7",
};

export function buttonClasses({
  variant = "primary",
  size = "md",
  className,
}: ButtonStyleOptions = {}) {
  return cn(base, variants[variant], sizes[size], className);
}

interface ButtonLinkProps
  extends AnchorHTMLAttributes<HTMLAnchorElement>,
    ButtonStyleOptions {
  children: ReactNode;
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  ...props
}: ButtonLinkProps) {
  const classes = buttonClasses({ variant, size, className });

  if (
    typeof href === "string" &&
    href.startsWith("/") &&
    !href.startsWith("//") &&
    !props.target
  ) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={classes} {...props}>
      {children}
    </a>
  );
}

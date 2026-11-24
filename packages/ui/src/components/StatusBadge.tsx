import type { HTMLAttributes } from "react";

export type StatusTone = "neutral" | "info" | "success" | "warning" | "danger";

export interface StatusBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: StatusTone;
  dot?: boolean;
}

export function StatusBadge({
  children,
  className = "",
  tone = "neutral",
  dot = false,
  ...props
}: StatusBadgeProps) {
  const classes = [
    "ssa-ui-status",
    `ssa-ui-status--${tone}`,
    className,
  ].filter(Boolean).join(" ");

  return (
    <span className={classes} {...props}>
      {dot ? <span className="ssa-ui-status__dot" aria-hidden="true" /> : null}
      {children}
    </span>
  );
}

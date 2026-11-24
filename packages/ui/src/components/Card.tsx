import type { HTMLAttributes, ReactNode } from "react";

export interface CardProps extends HTMLAttributes<HTMLElement> {
  as?: "section" | "article" | "div";
  children: ReactNode;
  padded?: boolean;
}

export function Card({
  as: Element = "section",
  children,
  className = "",
  padded = true,
  ...props
}: CardProps) {
  const classes = [
    "ssa-ui-card",
    padded ? "ssa-ui-card--padded" : "",
    className,
  ].filter(Boolean).join(" ");

  return <Element className={classes} {...props}>{children}</Element>;
}

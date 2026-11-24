import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
}

export function Button({
  children,
  className = "",
  variant = "primary",
  size = "md",
  leadingIcon,
  trailingIcon,
  type = "button",
  ...props
}: ButtonProps) {
  const classes = [
    "ssa-ui-button",
    `ssa-ui-button--${variant}`,
    `ssa-ui-button--${size}`,
    className,
  ].filter(Boolean).join(" ");

  return (
    <button className={classes} type={type} {...props}>
      {leadingIcon ? <span className="ssa-ui-button__icon" aria-hidden="true">{leadingIcon}</span> : null}
      <span>{children}</span>
      {trailingIcon ? <span className="ssa-ui-button__icon" aria-hidden="true">{trailingIcon}</span> : null}
    </button>
  );
}

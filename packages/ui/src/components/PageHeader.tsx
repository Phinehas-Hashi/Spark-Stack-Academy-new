import type { ReactNode } from "react";

export interface PageHeaderProps {
  title: string;
  description?: string;
  eyebrow?: string;
  actions?: ReactNode;
}

export function PageHeader({ title, description, eyebrow, actions }: PageHeaderProps) {
  return (
    <header className="ssa-ui-page-header">
      <div className="ssa-ui-page-header__copy">
        {eyebrow ? <p className="ssa-ui-page-header__eyebrow">{eyebrow}</p> : null}
        <h1 className="ssa-ui-page-header__title">{title}</h1>
        {description ? <p className="ssa-ui-page-header__description">{description}</p> : null}
      </div>
      {actions ? <div className="ssa-ui-page-header__actions">{actions}</div> : null}
    </header>
  );
}

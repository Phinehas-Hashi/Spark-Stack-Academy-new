import { useMemo, useState, type ReactNode } from "react";

export interface PortalNavigationItem {
  id: string;
  label: string;
  href: string;
  icon: ReactNode;
  group?: string;
}

export interface PortalShellProps {
  portalName: string;
  brand?: ReactNode;
  items: PortalNavigationItem[];
  mobileItems?: PortalNavigationItem[];
  activeHref: string;
  children: ReactNode;
  topbarActions?: ReactNode;
  accountMenu?: ReactNode;
  defaultCollapsed?: boolean;
}

function isActive(itemHref: string, activeHref: string) {
  return activeHref === itemHref || activeHref.startsWith(`${itemHref}/`);
}

export function PortalShell({
  portalName,
  brand,
  items,
  mobileItems,
  activeHref,
  children,
  topbarActions,
  accountMenu,
  defaultCollapsed = false,
}: PortalShellProps) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const mobileNavigation = useMemo(() => (mobileItems ?? items).slice(0, 5), [items, mobileItems]);

  return (
    <div className={`ssa-ui-shell${collapsed ? " ssa-ui-shell--collapsed" : ""}`}>
      <aside className="ssa-ui-sidebar" aria-label={`${portalName} navigation`}>
        <div className="ssa-ui-sidebar__brand">
          {brand ?? <span className="ssa-ui-sidebar__brand-mark" aria-hidden="true">S</span>}
          {!collapsed ? <span className="ssa-ui-sidebar__brand-name">SPARK STACK</span> : null}
        </div>
        <nav className="ssa-ui-sidebar__nav">
          {items.map((item) => {
            const active = isActive(item.href, activeHref);
            return (
              <a
                key={item.id}
                className={`ssa-ui-sidebar__link${active ? " is-active" : ""}`}
                href={item.href}
                aria-current={active ? "page" : undefined}
                title={collapsed ? item.label : undefined}
              >
                <span className="ssa-ui-sidebar__icon" aria-hidden="true">{item.icon}</span>
                {!collapsed ? <span className="ssa-ui-sidebar__label">{item.label}</span> : null}
              </a>
            );
          })}
        </nav>
        <button
          className="ssa-ui-sidebar__collapse"
          type="button"
          onClick={() => setCollapsed((value) => !value)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-expanded={!collapsed}
        >
          <span aria-hidden="true">{collapsed ? "›" : "‹"}</span>
          {!collapsed ? <span>Collapse menu</span> : null}
        </button>
      </aside>

      <div className="ssa-ui-shell__main">
        <header className="ssa-ui-topbar">
          <div className="ssa-ui-topbar__identity">
            <span className="ssa-ui-topbar__portal">{portalName}</span>
          </div>
          <div className="ssa-ui-topbar__actions">
            {topbarActions}
            {accountMenu}
          </div>
        </header>
        <main className="ssa-ui-shell__content">{children}</main>
      </div>

      <nav className="ssa-ui-mobile-nav" aria-label={`${portalName} primary navigation`}>
        {mobileNavigation.map((item) => {
          const active = isActive(item.href, activeHref);
          return (
            <a
              key={item.id}
              className={`ssa-ui-mobile-nav__item${active ? " is-active" : ""}`}
              href={item.href}
              aria-current={active ? "page" : undefined}
            >
              <span className="ssa-ui-mobile-nav__icon" aria-hidden="true">{item.icon}</span>
              <span className="ssa-ui-mobile-nav__label">{item.label}</span>
            </a>
          );
        })}
      </nav>
    </div>
  );
}

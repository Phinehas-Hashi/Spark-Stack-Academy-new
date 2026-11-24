# Shared UI Package

Package: `@spark-stack/ui`

This package contains reusable presentation primitives and the responsive portal shell. It must remain independent of portal business logic and Firebase access.

## Current exports

- `Button` — primary, secondary, ghost and danger variants.
- `Card` — neutral surface container.
- `StatusBadge` — semantic status presentation.
- `PageHeader` — page title, description, eyebrow and action slot.
- `ThemeProvider` / `useTheme` — light, dark and system theme preference.
- `PortalShell` — collapsible desktop sidebar, topbar region and five-item mobile bottom navigation.

## Import

```tsx
import "@spark-stack/design-tokens/tokens.css";
import "@spark-stack/ui/styles.css";

import {
  Button,
  Card,
  PageHeader,
  PortalShell,
  StatusBadge,
  ThemeProvider,
} from "@spark-stack/ui";
```

## PortalShell contract

Each portal supplies its own:
- Portal name and brand presentation.
- Full navigation item list.
- Five primary mobile destinations.
- Current active path.
- Topbar actions and account menu.
- Page content.

The shared shell does not determine user roles or grant access. Route guards and backend authorization remain separate responsibilities.

## Styling rules

- Import design tokens before shared UI styles.
- All selectors use the `ssa-ui-` namespace.
- Portal styles must not override shared component internals with broad selectors.
- Do not add Firebase, data fetching, business workflows or portal-specific permissions here.
- Any shared component change requires regression review across all five portals.

## Current implementation status

The primitives and first responsive shell are initial foundation code. They have not yet been integrated into the five applications or verified by a production build, browser test, accessibility audit or end-to-end test. Those checks are release gates, not assumed outcomes.

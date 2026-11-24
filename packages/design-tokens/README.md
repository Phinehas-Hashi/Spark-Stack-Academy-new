# Design Tokens Package

Shared semantic CSS variables for all Spark Stack Academy portals.

## Import

Portal applications should import the stylesheet once from their own application entry point:

```ts
import "@spark-stack/design-tokens/tokens.css";
```

The package is variable-only. It does not apply global element styles or component selectors.

## Theme selection

The default is light mode. Set `data-theme="dark"` on the application root (or document element) for dark mode. Set `data-theme="light"` to explicitly force light mode.

A future shared ThemeProvider will own preference persistence, system preference detection and startup hydration. Individual pages must not implement separate theme persistence.

## Token examples

```css
.portal-card {
  color: var(--ssa-color-text);
  background: var(--ssa-color-surface);
  border: 1px solid var(--ssa-color-border);
  border-radius: var(--ssa-radius-lg);
  box-shadow: var(--ssa-shadow-sm);
  padding: var(--ssa-space-6);
}

.portal-primary-action {
  min-height: var(--ssa-control-height);
  color: white;
  background: var(--ssa-color-brand);
}
```

## Rules

- Prefer semantic tokens over literal colours in portal components.
- Do not redefine global token values in portal stylesheets.
- Add new tokens only after design review.
- Keep component styling scoped to its owning package or portal.
- Test both themes for every shared component.

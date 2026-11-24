# Monorepo boundaries and package contracts

## Applications

Five separately deployable React applications:
- `apps/founder`
- `apps/admin`
- `apps/instructor`
- `apps/student`
- `apps/institution`

Each app owns its entry point, route tree, authenticated layout, page composition, portal navigation, feature modules and portal-specific styles.

## Shared packages

- `packages/design-tokens`: semantic design values only.
- `packages/ui`: accessible, role-neutral visual primitives and shell building blocks.
- `packages/auth`: authentication session and account lifecycle adapters.
- `packages/permissions`: typed permission names and client-side presentation helpers. Backend authorization remains authoritative.
- `packages/firebase-client`: environment-aware Firebase initialisation and emulator connection.
- `packages/validation`: shared schemas and validation primitives.
- `packages/utilities`: framework-neutral utilities.
- `packages/domain`: reusable contracts for learning, courses, assessments, rewards, finance, institutions and notifications.

## Dependency direction

1. Apps may import approved shared packages.
2. Shared packages must not import from any app.
3. A portal must never import another portal's private page, route, CSS or feature module.
4. Domain packages must not depend on React or portal presentation.
5. UI primitives must not contain privileged business logic or write protected Firestore records.
6. Firebase adapters must not decide navigation or silently grant roles.

## Styling ownership

- Design tokens define semantic values, not portal page selectors.
- Shared UI owns only its component classes.
- Each app owns its shell and page styles.
- Avoid global element selectors in feature styles.
- Do not use a shared stylesheet as a patch layer for portal regressions.
- Use a documented stacking scale for sidebar, overlay, dropdown, drawer, modal and toast layers.

## Backend trust boundary

Client-side route guards and permission gates are usability controls, not security boundaries. Sensitive reads/writes and consequential actions must be enforced by Firestore/Storage rules or trusted Cloud Functions. The server derives identity from verified authentication context and validates resource ownership, tenant membership, state transitions and input data.

## Firebase project boundary

No production Firebase project ID, `.firebaserc`, service-account key or payment-provider secret belongs in this repository during foundation work. Emulator and staging configuration are separate, explicit environments.

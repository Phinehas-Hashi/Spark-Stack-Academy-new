# Spark Stack Academy

A premium, international learning platform by **Spark Stack International Tech Firm**.

## Rebuild principles

- Preserve existing product capabilities through an explicit feature and data audit before replacing functionality.
- Build five separately deployable portal applications: Founder, Admin, Instructor, Student and Institution.
- Use a modular monorepo with shared, contract-driven packages.
- Keep portal-specific routing, page composition, permissions and styles isolated.
- Enforce security and business rules on trusted backend services, not only in the client.
- Test each portal and shared component before progressing to the next migration stage.
- Keep staging and production Firebase projects separate.

## Frozen design decisions

| Decision | Specification |
|---|---|
| Theme | Light-first with complete dark-mode support |
| Desktop navigation | Collapsible sidebar |
| Mobile navigation | Role-specific bottom navigation |
| Brand personality | Premium international technology brand |
| Typography | Inter with system sans-serif fallback |
| Icon system | Lucide |
| Styling | Centralised design tokens and isolated portal styles |

The full visual specification is in [docs/design-system/visual-implementation-blueprint.md](docs/design-system/visual-implementation-blueprint.md).

## Current workspace scaffold

The first application shells and shared UI foundation are now present on the foundation branch. The portal pages are structural placeholders while legacy features are mapped; they are not feature-complete applications.

### Run locally

Requirements: Node.js 20 or later and npm.

```bash
npm install
npm run dev:admin
```

Other portal commands: `npm run dev:founder`, `npm run dev:instructor`, `npm run dev:student` and `npm run dev:institution`.

Validate all portal applications with:

```bash
npm run typecheck
npm run build
```

## Planned technology direction

- React, TypeScript and Vite
- npm workspaces
- Tailwind CSS with centrally managed design tokens
- React Router
- Firebase Authentication, Firestore, Storage, Cloud Functions and FCM
- Node.js and TypeScript for trusted backend functions
- Vitest, React Testing Library and Playwright
- GitHub Actions for continuous integration

Exact dependency versions and Firebase project configuration will be selected only after the compatibility and existing-system audit.

## Planned repository structure

```text
apps/
  founder/
  admin/
  instructor/
  student/
  institution/
packages/
  ui/
  design-tokens/
  auth/
  permissions/
  firebase-client/
  validation/
  utilities/
  domain/
functions/
  src/
firebase/
docs/
  architecture/
  database/
  design-system/
  requirements/
  security/
  deployment/
tests/
  unit/
  integration/
  security/
  e2e/
scripts/
.github/
  workflows/
```

## Delivery stages

1. Repository and legacy-system audit.
2. Requirements, feature inventory and data/security mapping.
3. Shared design tokens and UI foundation.
4. Responsive application shell and navigation.
5. Portal-by-portal implementation and functional migration.
6. Backend integration and security validation.
7. Cross-portal regression, accessibility and end-to-end testing.
8. Staging acceptance and controlled production release.

## Important status

This repository is at the foundation stage. Documentation does not imply that portal functionality, Firebase integration, security controls or deployments are already implemented.

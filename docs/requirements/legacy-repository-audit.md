# Legacy Repository Audit — Initial Inventory

**Source repository:** `Phinehas-Hashi/Spark-Stack-Academy-SSA`  
**Target repository:** `Phinehas-Hashi/Spark-Stack-Academy-new`  
**Audit status:** Initial repository-tree and architecture-document review  
**Scope limitation:** This is not yet a complete feature, route, database, security-rule or runtime audit.

## 1. Repository facts

The source repository is a populated static web application with five role portals, shared HTML/CSS/JavaScript, Firebase configuration and Cloud Functions. Its current recursive Git tree contains 522 tracked entries.

| Portal | HTML files | CSS files | JavaScript files | Total portal files |
|---|---:|---:|---:|---:|
| Admin | 21 | 21 | 20 | 62 |
| Founder | 31 | 38 | 36 | 106 |
| Instructor | 26 | 29 | 26 | 82 |
| Student | 33 | 62 | 48 | 144 |
| Institution | 6 | 5 | 4 | 15 |
| **Total** | **117** | **155** | **134** | **409** |

Counts are based on the current recursive tree and include component HTML files in the HTML count. Student CSS includes parallel `css/` and `css/pages/` stylesheet generations. These counts are inventory signals, not a measure of feature completeness.

Other significant source areas include:
- Root authentication, Firebase, connectivity, notification, messaging, theme and UI runtime scripts.
- Shared brand, auth and design-token styles.
- Firebase Firestore and Storage rules.
- Firebase Cloud Functions in `functions/index.js`.
- Payment validation workflow under `.github/workflows/`.
- Existing documentation for institution identity, smart connectivity, Firebase testing, marketplace and platform events.
- Existing Spark Stack logos, marks, badges and portal illustrations under `assets/images/`.

## 2. Critical findings from the existing design audit

The source repository contains `DESIGN_SYSTEM_AUDIT.md`. Its findings are a useful starting point and must be revalidated against the current source tree before migration.

Key reported risks:
1. No consistent stylesheet load order across the five portals.
2. Root brand styles, portal foundations and page styles contain broad selectors that can affect injected portal components.
3. Override pressure is high in legacy stylesheets, including large numbers of `!important` declarations.
4. Multiple core stylesheets use `@import` chains whose ownership must be resolved.
5. Student has 26 page-style names duplicated across `student/css/` and `student/css/pages/`; references and content drift must be checked before retiring either generation.
6. Founder has multiple shell/bootstrap paths that must be reconciled route by route.
7. Admin has both `Settings.html` and `settings.html`; route links and case-sensitive hosting behaviour must be checked.
8. Institution does not currently have a dedicated responsive stylesheet in its portal folder, according to the prior audit.
9. Existing shell injection relies on specific element IDs and state classes. These are functional contracts until proven otherwise.

The prior audit's static CSS heuristics do not constitute browser validation. The new implementation must use actual build, browser, accessibility and regression tests.

## 3. Existing portal route inventory

The following is the current HTML route/component inventory from the source repository tree. It is a preservation checklist, not a declaration that every page is currently functional.

### Admin
- `Settings.html`, `settings.html`
- `admissions.html`, `announcements.html`, `assignments.html`, `certificates.html`
- `course-profile.html`, `courses.html`, `dashboard.html`
- `institutions.html`, `instructor-profile.html`, `instructors.html`
- `messages.html`, `notifications.html`, `pricing.html`, `profile.html`
- `reports.html`, `students.html`, `withdrawals.html`
- Components: sidebar and topbar

### Founder
- `academy-profile.html`, `admissions.html`, `analytics.html`, `announcements.html`
- `certificates.html`, `command-center.html`, `courses.html`, `dashboard.html`
- `global-intelligence.html`, `instructor-admissions.html`, `instructors-profile.html`, `instructors.html`
- `marketplace-products.html`, `marketplace.html`, `messages.html`, `monetization.html`
- `notifications.html`, `payments.html`, `platform-settings.html`, `premium-management.html`
- `reports.html`, `revenue.html`, `security.html`, `settings.html`
- `spark-ai-settings.html`, `spark-ai.html`, `students.html`
- `wallets/payouts.html`, `wallets/wallets.html`
- Components: sidebar and topbar

### Instructor
- `analytics.html`, `announcements.html`, `assignment.html`, `assignments.html`
- `calendar.html`, `course-builder.html`, `courses.html`, `create-assignment.html`, `create-quiz.html`
- `dashboard.html`, `earnings.html`, `messages.html`, `notifications.html`, `payments.html`
- `portal-suspended.html`, `pro.html`, `profile.html`, `quiz-submission.html`, `quiz.html`, `quizzes.html`
- `report.html`, `settings.html`, `students.html`, `submission.html`
- Components: sidebar and topbar

### Student
- `achievements.html`, `ai-companion.html`, `announcements.html`
- `assignment-details.html`, `assignments.html`, `calendar.html`
- `certificate-view.html`, `certificates.html`, `chat.html`
- `course-details.html`, `course-library.html`, `course-player.html`, `courses.html`
- `dashboard.html`, `help-center.html`, `learning-progress.html`, `marketplace.html`
- `messages.html`, `my-learning.html`, `new-chat.html`, `notifications.html`, `payments.html`
- `portal-suspended.html`, `premium-success.html`, `premium.html`, `profile.html`, `progress.html`
- `quizzes.html`, `report.html`, `settings.html`, `take-quiz.html`
- Components: sidebar and topbar

### Institution
- `courses.html`, `dashboard.html`, `learners.html`, `register.html`
- Components: sidebar and topbar

## 4. Existing architecture documents to preserve and reconcile

The source repository already contains material that must be carried forward or explicitly superseded only after review:
- `docs/multi-institution-identity-architecture.md` — global identity with institution-scoped memberships, tenant isolation and phased migration.
- `docs/smart-connectivity-architecture.md` — online/weak/offline/reconnecting/syncing states, offline learning materials, scoped local queue and online-only sensitive workflows.
- `docs/safe-firebase-testing.md` — source project treated as production; do not deploy new rules/functions during routine testing.
- `docs/platform-architecture.md` — reports and notifications event model.
- `docs/institution-mpesa-onboarding.md` — institution payment onboarding.
- `docs/unified-marketplace-model.md` — marketplace ownership and distribution model.
- `DESIGN_SYSTEM_AUDIT.md` — previous CSS dependency and shell audit.

These documents are not all automatically current. Each must be compared with the frozen product decisions and actual implementation before adoption.

## 5. Firebase and production safety

The source repository includes `.firebaserc`, `firebase.json`, Firestore rules, Storage rules and Cloud Functions. The source documentation identifies its Firebase project as production.

Therefore:
- Do not copy the source `.firebaserc` into the new repository.
- Do not deploy to the source Firebase project from this rebuild.
- Do not copy live credentials, secrets, production user data or payment data.
- Do not replace Firestore or Storage rules before a collection/permission inventory and emulator test plan exist.
- Build a separate staging Firebase project and explicitly configure it.
- Keep any future production migration as a separately approved release activity.

## 6. Required next audit tasks

Before feature implementation or data migration:

1. Build a route-to-feature inventory for every portal page.
2. Inspect each page's JavaScript imports, data reads/writes and callable function dependencies.
3. Map Firebase Auth roles, claims, profile fields and role redirects.
4. Inventory Firestore collections, document shapes, indexes and read/write ownership.
5. Map Storage paths, file metadata and upload/download permissions.
6. Inventory Cloud Functions, triggers, payment integrations, idempotency and audit events.
7. Map the current withdrawal lifecycle and M-Pesa settlement flow.
8. Record institution membership and tenant-scoped collections.
9. Identify existing tests, workflow checks and deployment targets.
10. Produce a feature-preservation matrix with status: preserve, redesign, replace, retire (owner approval required), or unknown.

## 7. Migration gate

No legacy feature may be removed merely because it is absent from a new mockup or proposed navigation list. A route or service can be retired only after:
- its purpose and dependencies are documented;
- replacement behaviour is identified;
- data migration or retention is decided;
- role permissions are tested;
- the product owner approves retirement; and
- regression coverage passes.

**Current status:** repository inventory and architecture-document review started. Full feature, Firebase schema, security and runtime audits remain pending.

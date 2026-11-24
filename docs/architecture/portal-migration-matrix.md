# Portal migration matrix

**Status:** Baseline created; feature-level tracing in progress  
**Source:** Legacy repository main at ab43d57bad2c1808f93af54e83926034e04383f2

This matrix is the control document for the rebuild. A legacy route is not considered migrated because a similarly named React page exists. Functional behaviour, data dependencies, permissions, error states and tests must be accounted for.

## Migration status definitions

- **Not mapped:** route or feature has not yet been traced.
- **Mapped:** route, scripts, data and backend dependencies are documented.
- **Implemented:** replacement code exists.
- **Verified:** automated and relevant manual tests pass.
- **Accepted:** product owner approves the replacement and any documented differences.

## Portal overview

| Portal | Legacy HTML routes | Primary workflows to preserve | Current status |
|---|---:|---|---|
| Founder | 31 | Executive oversight, users, courses, marketplace, finance, M-Pesa payout review, subscriptions, AI controls, security, reports, settings | Not mapped |
| Admin | 21 | User operations, course moderation, institution applications, support, announcements, reports, withdrawals visibility | Not mapped |
| Instructor | 26 | Course authoring, assignments, quizzes, learner management, analytics, earnings, withdrawal requests, profile | Not mapped |
| Student | 33 | Discovery, enrolment, course player, progress, assignments, quizzes, certificates, rewards, messaging, AI companion, offline access | Not mapped |
| Institution | 6 | Registration, organisation dashboard, institution courses, learner roster and tenant administration | Not mapped |

## Shared workflows requiring cross-portal tracing

| Capability | Portals involved | Required trace |
|---|---|---|
| Authentication and role routing | All | Sign-in, profile loading, account status, redirects, recovery and session expiry |
| Course lifecycle | Founder, Admin, Instructor, Student, Institution | Create, edit, submit, review, publish, enrol, archive and entitlement sync |
| Assessments | Instructor, Student, Admin, Institution | Authoring, attempts, submissions, grading, feedback and permissions |
| Payments | Student, Instructor, Founder, Institution | Checkout, manual verification, provider callbacks, ledger entries and reconciliation |
| Instructor withdrawals | Instructor, Founder | Request validation, balance reservation, review, M-Pesa settlement and audit trail |
| Marketplace | Founder, Instructor, Student | Product/course listing, pricing, currency, publication and purchase |
| Notifications | All | Event producers, recipients, read state, delivery channels and retries |
| Reports and analytics | All relevant roles | Source data, aggregation, access scopes, export and freshness |
| AI | Student, Instructor, Founder | Role-specific capabilities, entitlements, quotas, privacy and human review |
| Offline learning | Student | Cache policy, queued writes, conflict handling and safe resynchronisation |
| Institution tenancy | Institution, Admin, Founder | Tenant ownership, membership, departments, limits and cross-tenant denial |
| Security and audit | Founder, Admin, Institution Owner | MFA, step-up verification, role changes, sensitive actions and immutable audit history |

## Required route-level record

Create one record for every legacy HTML route with these fields:

1. Legacy route and portal.
2. User-facing purpose.
3. Referenced scripts and styles.
4. UI actions and form submissions.
5. Firestore collections read and written.
6. Storage paths read and written.
7. Cloud Function calls and payloads.
8. Required role and resource ownership checks.
9. Success, loading, empty and error states.
10. New application route and replacement feature.
11. Automated tests and manual acceptance evidence.
12. Migration status and unresolved risks.

## Migration order

The current recommended order is Admin → Instructor → Student → Institution → Founder, but shared foundations and high-risk backend contracts must be completed first. This is a sequencing recommendation, not permission to omit or defer functionality.

### Gate 0 — preserve and understand
- Freeze the legacy repository as the reference baseline.
- Complete route, script, function, Firestore and Storage tracing.
- Record unresolved and orphaned features.
- Confirm the staging project and emulator strategy.

### Gate 1 — platform foundation
- Establish npm workspace and TypeScript configuration.
- Build design tokens, shared UI contracts and app shell.
- Build role-aware navigation and route boundaries.
- Add lint, typecheck and test commands.

### Gate 2 — portal migration
For each portal:
- Implement its route map and layout.
- Migrate one feature slice at a time.
- Preserve API/data contracts until a separately reviewed backend change is approved.
- Add tests before advancing to the next feature slice.

### Gate 3 — integration and acceptance
- Run role/permission and tenant-isolation tests.
- Run financial lifecycle and duplicate-request tests.
- Run offline/reconnect tests where relevant.
- Run all five portals at desktop, tablet and mobile widths.
- Complete staging acceptance before any production release.

## Non-negotiable migration rules

- No wholesale replacement of Firestore rules.
- No production Firebase deploy during routine development.
- No live M-Pesa prompts in test flows.
- No client-side trust for privileged roles, financial calculations or XP/reward issuance.
- No portal imports another portal's private page code or CSS.
- No deletion of legacy routes/assets until references and replacement coverage are verified.
- Every migration batch must have a reversible Git commit.

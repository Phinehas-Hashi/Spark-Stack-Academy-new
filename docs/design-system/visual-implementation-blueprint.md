# Spark Stack Academy — Visual Implementation Blueprint

**Status:** Frozen design baseline  
**Scope:** Founder, Admin, Instructor, Student and Institution portals  
**Brand owner:** Spark Stack International Tech Firm

This document defines the visual and interaction contracts for the five portal applications. It is the baseline for implementation and review. It does not claim that any UI or backend feature is already implemented.

## 1. Frozen decisions

| Area | Decision |
|---|---|
| Theme | Light-first, with complete dark mode |
| Desktop navigation | Collapsible sidebar |
| Mobile navigation | Role-specific bottom navigation |
| Brand personality | Premium international technology brand |
| Typography | Inter; system sans-serif fallback |
| Icons | Lucide |
| Architecture | Modular monorepo; five separately deployable apps |
| Styling | Shared tokens and components; portal-owned styles |

These decisions are fixed unless the product owner explicitly changes them.

## 2. Brand and design principles

The product should feel like a polished international SaaS platform: clear hierarchy, restrained colour, generous spacing, precise typography, accessible controls and consistent feedback.

1. Functionality must not be removed to simplify a screen.
2. Shared visual language must not erase portal-specific workflows.
3. Every major view must handle loading, empty, error, populated and success states.
4. Mobile is a first-class layout, not a compressed desktop page.
5. Colour must never be the only way to communicate meaning.
6. Sensitive operations must have explicit confirmation and clear state transitions.
7. Accessibility, keyboard operation and reduced-motion preferences are part of the design contract.

## 3. Design tokens

### Light theme

| Token | Value |
|---|---|
| background | #F6F8FC |
| surface | #FFFFFF |
| surface-elevated | #FFFFFF |
| text-primary | #172033 |
| text-secondary | #667085 |
| border | #E5EAF2 |
| brand-primary | #315EDE |
| brand-accent | #7656D8 |
| success | #16865B |
| warning | #B7791F |
| danger | #D14343 |

### Dark theme

| Token | Value |
|---|---|
| background | #0B1220 |
| surface | #131E30 |
| surface-elevated | #19263A |
| text-primary | #F2F5FA |
| text-secondary | #A5B1C3 |
| border | #26354A |
| brand-primary | #7294FF |
| brand-accent | #A58AF5 |
| success | #42C995 |
| warning | #F2BD59 |
| danger | #FF7777 |

### Token rules

- Define semantic tokens centrally in packages/design-tokens.
- Components consume semantic tokens rather than hard-coded portal-specific colours.
- Use blue for primary actions and active navigation.
- Use violet sparingly for AI-related surfaces and premium accents.
- Use status colours consistently and pair them with labels/icons.
- Charts must use theme-aware palettes with accessible contrast.
- Do not introduce arbitrary one-off values without a design-token review.

## 4. Typography, spacing and shape

- Typeface: Inter, with a robust system sans-serif fallback.
- Desktop page titles: 24–30 px.
- Mobile page titles: 22–26 px.
- Section headings: 16–20 px.
- Body text: 14–16 px.
- Supporting labels: 12–13 px.
- Mobile touch targets: at least 44 × 44 px where practical.
- Cards: 12–16 px radius.
- Inputs: 10–12 px radius.
- Shadows: subtle; use borders for most separation.
- Motion: restrained, generally 150–220 ms; honour prefers-reduced-motion.

Use a consistent spacing scale based on 4 px increments. Avoid dense dashboards and cramped mobile tables.

## 5. Responsive application shell

### Desktop

- Persistent topbar with portal identity, contextual search where relevant, notifications, account menu and theme control.
- Collapsible sidebar with expanded and icon-only states.
- Expanded sidebar shows grouped navigation labels.
- Collapsed sidebar retains accessible labels and hover/focus tooltips.
- Main content width and grid respond to sidebar state.
- Sidebar collapse state persists appropriately.

### Mobile

- Do not squeeze the desktop sidebar into a narrow column.
- Use a compact header and role-specific bottom navigation.
- Bottom navigation presents the five most important destinations for that role.
- Less-frequent destinations go into a More screen or account/navigation sheet.
- Keep bottom navigation clear of content using safe-area insets and bottom padding.
- Tables become cards, horizontally scrollable data regions only when genuinely necessary, or dedicated detail screens.
- Modals become full-screen sheets where appropriate.
- Prevent horizontal page overflow.

### Tablet

- Sidebar may default to collapsed or a temporary drawer.
- Dashboard cards reflow without clipping.
- Primary actions remain reachable and touch-friendly.

## 6. Theme behaviour

- Light is the default presentation.
- Users can explicitly select light or dark mode.
- When no preference exists, support the operating-system preference.
- Persist the user's explicit choice.
- Theme all components, including dialogs, menus, charts, tables, form controls, skeletons, toasts and empty states.
- Avoid flash of the wrong theme during application startup.

## 7. Shared component contracts

The shared UI package should provide documented, tested components:

- AppShell
- Sidebar
- MobileBottomNav
- Topbar
- PageHeader
- Breadcrumbs
- StatCard
- DataTable
- StatusBadge
- ChartCard
- FormField
- Modal and ConfirmDialog
- Drawer and Sheet
- Tabs
- DropdownMenu
- Toast
- EmptyState
- LoadingState and Skeleton
- ErrorState
- ThemeProvider
- PermissionGate (presentation only; never the security boundary)

Shared components must be configurable through explicit props and slots. Do not embed one portal's business rules or permissions in generic UI components.

## 8. Portal visual specifications

### 8.1 Founder — Executive Command Centre

**Character:** authoritative, analytical, controlled.

**Primary navigation**
- Overview
- User Management
- Portal Management
- Finance & Treasury
- Payouts
- Subscriptions
- Institutions
- AI Control Centre
- Security Centre
- Reports
- Platform Settings

**Overview composition**
- Executive KPI cards: revenue, MRR, students, active learners, instructors and institutions.
- Revenue and growth analytics.
- Platform health and security alerts.
- Pending financial approvals.
- Recent critical activity and audit events.

**Screen patterns**
- Finance tables clearly distinguish gross, fees, net, available, pending and settled values.
- Payout detail shows request, review, approval, M-Pesa settlement, receipt/reference and audit history as distinct stages.
- Security Centre prioritises actionable alerts and privileged activity.
- Destructive and sensitive operations require confirmation and step-up verification.

**Boundary:** Admin users must not receive Founder treasury or settlement controls.

### 8.2 Admin — Operations Centre

**Character:** organised, efficient, task-focused.

**Primary navigation**
- Overview
- Users
- Instructors
- Students
- Institutions
- Courses
- Support
- Reports
- Announcements
- Settings

**Overview composition**
- Registered, active and suspended users.
- Registration trends.
- Institution applications awaiting review.
- Support queue and priority indicators.
- Course moderation queue.
- Recent operational activity.

**Screen patterns**
- User management uses searchable, filterable, paginated tables.
- User detail uses a structured profile and authorised action panel.
- Institution review includes evidence, decision, reason and audit history.
- Support tickets show priority, owner, status and response history.

**Boundary:** Admin cannot approve or settle instructor payouts, change treasury settings or grant Founder access.

### 8.3 Instructor — Teaching and Earnings Workspace

**Character:** productive, professional, encouraging.

**Primary navigation**
- Overview
- My Courses
- Course Builder
- Students
- Assessments
- Live Learning
- Analytics
- Earnings
- Withdrawals
- Reviews
- Profile

**Overview composition**
- Course count and publication status.
- Learners and completion.
- Engagement and performance.
- Earnings summary.
- Course cards and recent learner activity.

**Course builder flow**
1. Course information.
2. Thumbnail and presentation.
3. Curriculum and modules.
4. Lessons and resources.
5. Assessments.
6. Pricing and access.
7. Preview and publication review.

**Screen patterns**
- Curriculum editor uses a clear module/lesson hierarchy.
- Course cards show thumbnail, status, learner count and progress.
- Earnings separate gross, deductions, net, available and pending balances.
- Withdrawal history shows M-Pesa references and settlement status.

### 8.4 Student — Learning Destination

**Character:** focused, motivating, accessible.

**Primary navigation**
- Home
- Explore
- My Learning
- Learning Room
- Assessments
- Progress
- Rewards
- Leaderboard
- Certificates
- AI Learning Assistant
- Offline Library
- Profile

**Home composition**
- Continue Learning feature.
- Enrolled course cards and progress.
- Weekly goals and learning activity.
- Upcoming assessments.
- XP, badges and leaderboard highlights.
- Relevant course recommendations.

**Learning Room**
- Lesson content is the visual priority.
- Curriculum navigation remains accessible without obscuring content.
- Previous/next lesson controls.
- Notes, bookmarks and permitted resources.
- Assessment access and progress feedback.
- AI assistance as a distinct, clearly labelled feature.
- Save state and offline/sync status.

**Integrity:** XP and rewards are presented from verified backend activity; clients cannot award themselves XP.

### 8.5 Institution — Enterprise Workspace

**Character:** structured, professional, report-driven.

**Primary navigation**
- Overview
- Organisation
- Departments
- Students
- Staff
- Courses
- Enrolments
- Assessments
- Reports
- Billing
- Settings

**Overview composition**
- Learner, instructor and department counts.
- Participation and completion trends.
- Department performance.
- Pending enrolments and assessments.
- Subscription/billing summary.
- Organisation activity.

**Screen patterns**
- Enterprise tables with role-scoped filtering.
- Department comparison and reporting.
- Bulk actions with explicit permission and confirmation.
- Billing and subscription detail.
- Export controls limited to authorised data.

**Tenant isolation:** institution users see only their own organisation and authorised departments, people, courses, billing and reports. This must be enforced by backend rules and services, not just hidden UI.

## 9. CSS and application isolation

- Each portal owns its own route configuration, layouts, feature composition and application-level styles.
- Shared packages expose components, tokens and documented contracts.
- Portal A must not import Portal B's private styles, routes or feature internals.
- Avoid broad element selectors and uncontrolled global CSS.
- Avoid !important except for documented, exceptional cases.
- Use semantic tokens and scoped component classes.
- Keep CSS entry points and build configuration explicit.
- Do not let shared components assume a particular role or data ownership model.

## 10. Required states and interactions

Every data-driven screen must define:
- Loading/skeleton state.
- Empty state with a useful next action.
- Error state with a recovery path.
- Populated state.
- Success feedback for completed actions.
- Disabled and permission-restricted states where relevant.
- Offline and synchronisation states where relevant.

Controls must be functional:
- Navigation links lead to real authorised destinations.
- Search and filters affect displayed data.
- Forms validate and expose server errors.
- Dialogs support cancellation and safe dismissal.
- Theme switching applies consistently.
- Destructive actions require confirmation.
- Focus, keyboard and screen-reader behaviour are tested.

## 11. Visual QA acceptance

Test representative screens:
- Founder Overview.
- Admin User Management.
- Instructor Course Builder.
- Student Learning Room.
- Institution Department Management.

Test each at mobile, tablet, laptop and desktop widths, in both light and dark themes.

Acceptance checks:
1. No horizontal page overflow at supported mobile widths.
2. Desktop sidebar collapse and expansion work.
3. Mobile bottom navigation works and does not cover content.
4. All theme surfaces and overlays are legible.
5. Shared UI changes do not regress other portals.
6. Loading, empty, error and populated states are covered.
7. Keyboard focus and accessible names are present.
8. Permission boundaries are reflected in the UI and enforced by backend tests.
9. Critical workflows are tested end to end.
10. No screen is marked complete based on appearance alone.

## 12. Implementation sequence

1. Audit the existing application, features, routes, Firebase schema, rules, functions and integrations.
2. Produce a feature preservation matrix and data migration plan.
3. Implement design tokens and theme infrastructure.
4. Implement and test shared UI primitives.
5. Implement the responsive app shell and navigation.
6. Migrate one portal at a time, completing functionality and tests before moving forward.
7. Integrate backend services and enforce security boundaries.
8. Run cross-portal regression, accessibility and end-to-end tests.
9. Validate staging and backups before any production release.

Recommended portal sequence: Admin, Instructor, Student, Institution, Founder. This is an implementation recommendation, not permission to remove or postpone existing functionality.

## 13. Change control

This document is the frozen visual baseline. Any proposed change must state:
- What decision changes.
- Why the change is needed.
- Which portals and components are affected.
- What regression tests will be updated.

A design change must not silently introduce cross-portal styling or permission coupling.

# Legacy repository audit — Spark Stack Academy

**Source repository:** Phinehas-Hashi/Spark-Stack-Academy-SSA  
**Audited ref:** main  
**Audited commit:** ab43d57bad2c1808f93af54e83926034e04383f2  
**Audit date:** 2026-11-24  
**Status:** Static source inventory; runtime behaviour remains to be verified

## 1. Executive summary

The legacy repository is a substantial multi-page Firebase application, not a small prototype. Its five portal folders contain 117 HTML pages, 155 CSS files and 134 JavaScript files in the audited Git tree. The backend contains 44 named Cloud Function exports. Firestore rules contain 81 match blocks (including nested and repeated paths); Storage rules contain three match blocks.

A previous design audit document in the legacy repository reports an earlier snapshot of 478 files and 143 portal CSS files. The current recursive Git tree at the audited commit contains 491 blobs and the portal-specific counts below. This audit uses the live tree response rather than copying the older figures.

No production code, Firebase configuration or live data has been modified by this audit.

## 2. Portal inventory

| Portal | HTML | CSS | JavaScript |
|---|---:|---:|---:|
| Founder | 31 | 38 | 36 |
| Admin | 21 | 21 | 20 |
| Instructor | 26 | 29 | 26 |
| Student | 33 | 62 | 48 |
| Institution | 6 | 5 | 4 |
| **Total** | **117** | **155** | **134** |

The Institution portal has a smaller page count but still represents a distinct enterprise tenant experience. Do not infer that its feature scope is small from its file count.

### Founder page inventory

academy-profile, admissions, analytics, announcements, certificates, command-center, courses, dashboard, global-intelligence, instructor-admissions, instructors-profile, instructors, marketplace-products, marketplace, messages, monetization, notifications, payments, platform-settings, premium-management, reports, revenue, security, settings, spark-ai-settings, spark-ai, students, wallets/payouts and wallets/wallets, plus shell components.

### Admin page inventory

Settings, admissions, announcements, assignments, certificates, course-profile, courses, dashboard, institutions, instructor-profile, instructors, messages, notifications, pricing, profile, reports, settings, students and withdrawals, plus shell components. The case-sensitive Settings/settings route conflict is documented in the legacy design audit and must remain an explicit route-migration check.

### Instructor page inventory

analytics, announcements, assignment, assignments, calendar, course-builder, courses, create-assignment, create-quiz, dashboard, earnings, messages, notifications, payments, portal-suspended, pro, profile, quiz-submission, quiz, quizzes, report, settings, students and submission, plus shell components.

### Student page inventory

achievements, ai-companion, announcements, assignment-details, assignments, calendar, certificate-view, certificates, chat, course-details, course-library, course-player, courses, dashboard, help-center, learning-progress, marketplace, messages, my-learning, new-chat, notifications, payments, portal-suspended, premium-success, premium, profile, progress, quizzes, report, settings and take-quiz, plus shell components.

### Institution page inventory

dashboard, courses, learners and register, plus shell components.

## 3. Backend and Firebase inventory

### Cloud Functions

The existing `functions/package.json` uses CommonJS, Firebase Admin SDK 13.x, Firebase Functions 6.x and Node.js >=20. It currently defines a placeholder test script rather than a real automated test suite.

The 44 exported functions discovered in `functions/index.js` are:

**Instructor finance**
- requestInstructorWithdrawal
- getInstructorEarningsSettings

**Founder/admin account and institution operations**
- createAdminAccount
- approveInstitutionApplication
- rejectInstitutionApplication
- createInstitutionTeamAccount
- getInstitutionPricing
- saveInstitutionPricing

**Institution courses, enrolment and entitlements**
- createInstitutionCourse
- submitInstitutionCourseForReview
- syncMyCourseEntitlements
- syncInstitutionNestedEnrollmentEntitlement
- syncInstitutionTopLevelEnrollmentEntitlement
- getInstitutionLearnerManagerData
- enrollStudentInInstitutionCourse
- revokeInstitutionCourseEnrollment

**Institution payment onboarding**
- retryInstitutionOnboardingPayment
- darajaInstitutionCallback
- reconcileInstitutionOnboardingPayments

**Manual course payments and pricing**
- getFounderManualMpesaPaymentConfig
- saveFounderManualMpesaPaymentConfig
- getManualMpesaPaymentConfig
- submitManualCoursePayment
- verifyManualCoursePayment

**Marketplace and global configuration**
- getMarketplacePricing
- saveMarketplacePricing
- getMarketplaceCurrencyConfig
- saveMarketplaceCurrencyConfig
- updateMyCountry
- getFounderGlobalStats
- founderModerateCourse
- getMarketplaceProducts
- saveMarketplaceProduct
- archiveMarketplaceProduct
- syncPublishedCourseToMarketplace

**Notifications**
- notifyPaymentSuccess
- notifyEnrollmentCreated
- notifyCourseCreated
- notifyLessonCreated
- notifyAssignmentCreated
- notifyQuizCreated
- notifyReportCreated
- notifyReportUpdated

**Platform operations**
- applyScheduledMaintenance

This is an export inventory, not proof that every function is correctly called, tested, or production-safe. Each export must be mapped to its caller, payload contract, role checks, data writes, error states and tests before migration.

### Firestore

The live rules file contains 81 `match` blocks. Important top-level/nested path families include:

- Identity and roles: users, founder, students, instructors, members
- Institutions: institutions, institutionApplications, institutionPayments
- Learning: courses, courseModules, courseLessons, courseProgress, enrollments, courseEntitlements
- Assessment: assignments, quizzes, submissions, quizSubmissions, certificates
- Finance: payments, withdrawals, withdrawalRequests, withdrawalLocks, instructorEarnings, instructorWallets, walletActions, finance, financeTransactions
- Platform: settings, platformSettings, platform_controls, premiumSubscriptions
- Communication: notifications, broadcasts, announcements, chats, messages
- Oversight: audit_logs, activity, reports
- Public ranking: leaderboardPublic
- Account lifecycle: accountDeletionRequests

The same match path may appear in multiple nested contexts. Do not flatten these into a proposed new schema without reading the complete rule hierarchy and the corresponding client/backend queries.

### Storage

The current Storage rules include three match blocks: the bucket-wide catch-all, academy-profile and chatFiles. File ownership, upload constraints, download access and deletion permissions must be mapped to the relevant portal workflows before changing rules.

### Firebase environment

The legacy `.firebaserc` maps its default alias to the existing project `spark-stack-academy`. The web Firebase module contains client configuration for that project. Treat it as production.

The legacy `firebase.json` configures Auth, Functions, Firestore and Storage emulators. A separate safe-testing document warns against deploying rules or functions to the existing project during routine development.

**Hard safety boundary:** the rebuild must not reuse the production project for experiments, run deploy commands against it, or trigger real M-Pesa payments. Establish a separate staging Firebase project and emulator-only synthetic data before backend integration.

## 4. Existing architecture and migration risks

The legacy frontend uses HTML, CSS and JavaScript ES modules with Firebase browser SDK imports. It is not already a React application.

The existing design-system audit identifies:
- Inconsistent stylesheet ordering across pages.
- Global selectors and cross-portal CSS leakage.
- Heavy override pressure in Founder unified CSS and several portal responsive stylesheets.
- Imported CSS dependencies that need ownership mapping.
- Duplicate Student stylesheet generations with same-named files in separate directories.
- Admin Settings/settings case mismatch.
- Multiple Founder shell/bootstrap paths that may initialise the same injected components.
- Route-specific standalone pages that should not be forced into authenticated portal shells.

The legacy audit describes source-level migration work in some portals, but explicitly states that browser visual checks and Firebase-backed workflows remain unverified. Those pages must not be treated as production-accepted merely because their source was committed.

## 5. Required next audit actions

1. Build a route-by-route feature matrix from every HTML page and its referenced JavaScript modules.
2. Trace all 44 callable/triggered functions to their frontend callers and document request/response contracts.
3. Read Firestore rules in full and map every collection/path to its readers and writers.
4. Trace Storage upload/download paths and their owning workflows.
5. Identify payment and withdrawal state machines, including M-Pesa callbacks and manual verification.
6. Record role and tenant boundaries for every backend operation.
7. Identify legacy features with no clear replacement route before any implementation begins.
8. Create synthetic fixtures and emulator tests before integrating the new frontend.

## 6. Acceptance criteria

This audit is complete only when every legacy feature has:
- An identified current route or entry point.
- An identified frontend module and backend dependency, where applicable.
- A documented role/permission boundary.
- A target route or an explicit approved retirement decision.
- A test case or a documented reason why a test is not yet possible.

This file records the first static inventory. It does not claim the full feature-by-feature trace is complete.

# Legacy Backend Inventory — Preservation Baseline

**Source:** `Phinehas-Hashi/Spark-Stack-Academy-SSA`, current `main`  
**Status:** Static export/rules inventory; implementation behaviour still requires review  
**Safety:** No production Firebase operations were performed.

## 1. Existing backend footprint

- Cloud Functions entry point: `functions/index.js` (approximately 129 KB).
- Runtime: Node.js >=20.
- Module format: CommonJS.
- Dependencies declared by source: `firebase-admin` and `firebase-functions`.
- The source Functions package has no configured automated test suite; its test script is a placeholder.
- Firestore rules: approximately 71 KB, with 83 `match` blocks and 23 helper functions by simple text inventory.
- Existing source also contains Storage rules, Firebase configuration and a payment-validation GitHub Actions workflow.

These counts are static inventory only. They do not establish that all functions are deployed, reachable, secure or currently used.

## 2. Exported callable/trigger function names

The source `functions/index.js` currently exposes the following 43 named exports. Preserve each function's purpose and dependent client calls until usage and replacement are confirmed.

### Instructor finance
- `requestInstructorWithdrawal`
- `getInstructorEarningsSettings`

### Identity and institution onboarding
- `createAdminAccount`
- `retryInstitutionOnboardingPayment`
- `darajaInstitutionCallback`
- `reconcileInstitutionOnboardingPayments`
- `approveInstitutionApplication`
- `rejectInstitutionApplication`
- `createInstitutionTeamAccount`

### Institution courses and learner management
- `createInstitutionCourse`
- `submitInstitutionCourseForReview`
- `syncMyCourseEntitlements`
- `syncInstitutionNestedEnrollmentEntitlement`
- `syncInstitutionTopLevelEnrollmentEntitlement`
- `getInstitutionLearnerManagerData`
- `enrollStudentInInstitutionCourse`
- `revokeInstitutionCourseEnrollment`

### Manual payments and marketplace pricing
- `getFounderManualMpesaPaymentConfig`
- `saveFounderManualMpesaPaymentConfig`
- `getManualMpesaPaymentConfig`
- `submitManualCoursePayment`
- `verifyManualCoursePayment`
- `getMarketplacePricing`
- `saveMarketplacePricing`
- `getMarketplaceCurrencyConfig`
- `saveMarketplaceCurrencyConfig`
- `getInstitutionPricing`
- `saveInstitutionPricing`

### Global profile and executive analytics
- `updateMyCountry`
- `getFounderGlobalStats`

### Course moderation and marketplace products
- `founderModerateCourse`
- `getMarketplaceProducts`
- `saveMarketplaceProduct`
- `archiveMarketplaceProduct`
- `syncPublishedCourseToMarketplace`

### Notifications and scheduled operations
- `notifyPaymentSuccess`
- `notifyEnrollmentCreated`
- `notifyCourseCreated`
- `notifyLessonCreated`
- `notifyAssignmentCreated`
- `notifyQuizCreated`
- `notifyReportCreated`
- `notifyReportUpdated`
- `applyScheduledMaintenance`

## 3. Required backend migration mapping

For every export, the migration matrix must record:
- Trigger type (callable, HTTP callback, Firestore trigger or schedule).
- Client or trigger callers.
- Authentication requirements.
- Role and tenant authorization.
- Input schema and validation.
- Firestore reads/writes and transaction boundaries.
- External provider dependencies.
- Idempotency and retry behaviour.
- Audit event requirements.
- Existing tests and required replacement tests.
- Deployment environment and secrets required.

Do not rename or remove a callable function until all callers have been identified and migrated.

## 4. Finance and payment preservation gates

The new system must explicitly map:
- Instructor withdrawal request and eligibility.
- Server-side balance calculation and reservation/locking.
- Founder review and approval.
- M-Pesa settlement recording and receipt/reference.
- Settlement verification and reconciliation.
- Duplicate request and duplicate callback prevention.
- Failure, rejection and retry states.
- Immutable audit history.

Payment integrations must use staging/sandbox credentials and mocked provider callbacks during development. No real payment prompts or live settlement tests should be triggered from this repository.

## 5. Security and test gates

- Treat the old Firestore rules as production-critical reference material, not a ready-made rules file for the new app.
- Inventory every collection and nested collection before designing new rules.
- Test positive and negative access for every role.
- Test cross-institution reads, writes, queries and nested resources.
- Test account suspension, revoked membership and stale sessions.
- Use the Firebase Emulator Suite and synthetic records.
- Do not deploy rules or functions to the source production project.
- Keep staging and production configuration separate.

## 6. Next backend audit tasks

1. Extract every Firestore collection/path referenced by Functions and portal scripts.
2. Map each export to the exact client call sites and UI workflows.
3. Read payment and withdrawal implementations in full, including callbacks.
4. Review transaction, idempotency and audit behaviour.
5. Map Firestore rules to the collection inventory and role matrix.
6. Review Storage paths and upload/download policy.
7. Build emulator tests before writing replacement security rules.
8. Produce a signed-off migration/compatibility plan before any live data movement.

**Current status:** export names and static rules footprint inventoried. Function-by-function logic review and Firestore collection mapping remain pending.

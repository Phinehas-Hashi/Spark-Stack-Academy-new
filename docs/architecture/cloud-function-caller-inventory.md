# Cloud Function caller and contract inventory

**Source:** legacy `functions/index.js`, plus GitHub code search over the legacy repository at audited commit `ab43d57bad2c1808f93af54e83926034e04383f2`.  
**Status:** Static caller trace; request/response and authorization review still required.

A search result naming a frontend file is evidence of a reference, not proof that the complete workflow succeeds. Functions without a frontend match may be backend callbacks, scheduled/internal operations, unused exports, or called through a wrapper that needs further tracing. Do not delete or rewrite them based on this table alone.

## 1. Instructor finance

| Function | Located caller/reference | Migration notes |
|---|---|---|
| requestInstructorWithdrawal | instructor/js/earnings.js; firestore.rules | High-risk money workflow; inspect transaction, balance reservation, duplicate requests, and Founder settlement path. |
| getInstructorEarningsSettings | instructor/js/earnings.js | Preserve server-sourced limits, fees, withdrawal enablement and currency behaviour. |

## 2. Institution onboarding, team and course workflows

| Function | Located caller/reference | Migration notes |
|---|---|---|
| retryInstitutionOnboardingPayment | admin/js/institutions.js | Payment retry; test callback and reconciliation idempotency. |
| darajaInstitutionCallback | docs/institution-mpesa-onboarding.md | Provider callback endpoint; not a browser callable. Verify signature/receipt validation and STK Query reconciliation. |
| reconcileInstitutionOnboardingPayments | No frontend caller found | Likely backend/admin reconciliation operation; establish trigger/operational caller. |
| createInstitutionCourse | institution/courses.html; docs/unified-marketplace-model.md | Institution course authoring and tenant ownership. |
| submitInstitutionCourseForReview | docs/unified-marketplace-model.md | Locate actual runtime caller; confirm whether page uses a wrapper or direct callable. |
| syncMyCourseEntitlements | student/js/courses.js; student/js/course-player.js | Student entitlement synchronisation; prevent client self-grant. |
| syncInstitutionNestedEnrollmentEntitlement | No frontend caller found | Internal compatibility/synchronisation function; inspect trigger and data model. |
| syncInstitutionTopLevelEnrollmentEntitlement | No frontend caller found | Internal compatibility/synchronisation function; inspect trigger and data model. |
| getInstitutionLearnerManagerData | institution/js/learners.js | Tenant-scoped learner list and summary; test cross-institution denial. |
| enrollStudentInInstitutionCourse | institution/js/learners.js | Verify seat/limit checks and atomic enrolment/entitlement creation. |
| revokeInstitutionCourseEnrollment | institution/js/learners.js | Verify revocation side effects and audit trail. |
| approveInstitutionApplication | admin/js/institutions.js | Privileged approval transition; validate reviewer role and application state. |
| rejectInstitutionApplication | admin/js/institutions.js | Privileged rejection transition; require reason and preserve audit evidence. |
| createInstitutionTeamAccount | institution/js/institution-app.js | Privileged account provisioning; verify owner permissions and institution team limits. |
| getInstitutionPricing | admin/js/pricing.js | Read pricing config; ensure public/private fields are separated. |
| saveInstitutionPricing | admin/js/pricing.js | Founder/admin authority needs explicit review; do not infer access from UI visibility. |

## 3. Manual course payments and marketplace

| Function | Located caller/reference | Migration notes |
|---|---|---|
| getFounderManualMpesaPaymentConfig | founder/payments.js | Sensitive provider/configuration surface; secrets must never be returned to browser. |
| saveFounderManualMpesaPaymentConfig | founder/payments.js | Privileged configuration write; step-up verification and audit event required. |
| getManualMpesaPaymentConfig | student/js/payments.js | Return only safe payment instructions, never provider secrets. |
| submitManualCoursePayment | student/js/payments.js | Student payment submission; validate course, amount, reference and duplicate submissions. |
| verifyManualCoursePayment | founder/payments.js | Founder-only verification; ensure evidence, transaction state and audit log are consistent. |
| getMarketplacePricing | No frontend caller found | Search for wrapper/alternate integration; verify whether export is unused. |
| saveMarketplacePricing | founder/marketplace.html | Privileged marketplace pricing configuration. |
| getMarketplaceCurrencyConfig | No frontend caller found | Search for wrapper/alternate integration; verify whether export is unused. |
| saveMarketplaceCurrencyConfig | No frontend caller found | Privileged currency configuration; review global currency conversion assumptions. |
| updateMyCountry | student/js/profile.js | Validate supported country and currency/localisation behaviour. |
| getFounderGlobalStats | No frontend caller found | Founder analytics endpoint; verify if dashboard currently reads Firestore directly. |
| founderModerateCourse | No frontend caller found | High-impact moderation operation; locate intended UI and confirm Founder-only authorization. |
| getMarketplaceProducts | docs/build-test-checklist.md | Documentation reference only; locate actual page data source. |
| saveMarketplaceProduct | docs/build-test-checklist.md | Documentation reference only; locate actual page data source. |
| archiveMarketplaceProduct | No frontend caller found | Verify lifecycle and any marketplace visibility/index side effects. |
| syncPublishedCourseToMarketplace | No frontend caller found | Determine whether this is called from triggers or another backend operation. |

## 4. Account provisioning and platform controls

| Function | Located caller/reference | Migration notes |
|---|---|---|
| createAdminAccount | No frontend caller found | Founder account-provisioning operation; inspect intended UI and password handling. |
| applyScheduledMaintenance | No frontend caller found | Determine scheduler/trigger and whether any client can invoke it. |

## 5. Notification exports

The following exports had no direct frontend reference in repository code search:

- notifyPaymentSuccess
- notifyEnrollmentCreated
- notifyCourseCreated
- notifyLessonCreated
- notifyAssignmentCreated
- notifyQuizCreated
- notifyReportCreated
- notifyReportUpdated

These may be invoked by Cloud Functions triggers or backend code. Trace every invocation in `functions/index.js` and any trigger registration before migration. Notification delivery must remain server-controlled and idempotent.

## 6. Contract review checklist

For every export, create a typed contract containing:

- Trigger type: callable, HTTP callback, Firestore trigger, scheduled job or internal helper.
- Caller(s) and invocation point.
- Authentication requirement.
- Authorisation rule and authoritative role source.
- Tenant/resource ownership check.
- Input schema, validation and maximum sizes.
- Output schema and client-visible fields.
- Firestore reads/writes and transaction boundaries.
- Storage side effects, if any.
- External provider side effects.
- Idempotency and retry behaviour.
- Audit event and observability.
- Error codes and user-facing recovery.
- Unit, emulator integration and security test coverage.

## 7. High-risk review order

1. Instructor withdrawal request, balance reservation and Founder settlement.
2. M-Pesa onboarding callback, retry and reconciliation.
3. Manual course payment submission and Founder verification.
4. Institution approval, team provisioning and tenant-scoped enrolment.
5. Admin provisioning and Founder-only configuration writes.
6. Marketplace publication, pricing and currency.
7. Notifications, maintenance and analytics.

**Do not treat this inventory as a completed backend audit.** It records all 44 exported function names and the callers discoverable by static code search. The next pass must inspect each implementation and its complete call chain, then add contract and test evidence.

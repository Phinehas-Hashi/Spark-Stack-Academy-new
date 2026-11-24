# Production and staging safety boundary

## Existing production environment

The legacy repository's `.firebaserc` maps the default Firebase alias to `spark-stack-academy`. The legacy browser Firebase module also points at this project. Treat it as production unless the owner explicitly confirms otherwise.

## Rules for the rebuild

1. Do not copy the legacy `.firebaserc` into this repository.
2. Do not copy production credentials, service-account keys or M-Pesa secrets.
3. Do not run Firebase deploy commands against the legacy project.
4. Do not use production accounts or records for development tests.
5. Do not trigger real M-Pesa STK prompts during development or automated tests.
6. Do not change production Firestore or Storage rules as part of a UI migration.
7. Keep secrets in a managed secret store or local ignored environment files.
8. Use synthetic accounts and synthetic financial records in emulators.
9. Require an explicit release review before any staging or production deployment.

## Required environments

- **Local emulator:** isolated Auth, Firestore, Functions and Storage with synthetic fixtures.
- **Staging Firebase project:** separately provisioned project, separate configuration and test credentials.
- **Production:** existing live project; read-only reference during the rebuild until a migration and release plan is approved.

## Finance-specific safeguards

- Server-side balance calculation and reservation.
- Atomic ledger and withdrawal state transitions.
- Idempotency for payment and withdrawal requests.
- Provider callback authenticity and reconciliation.
- Founder-authorised settlement workflow for instructor withdrawals.
- M-Pesa-only instructor withdrawal channel.
- Immutable or append-only audit evidence for approvals and settlements.
- Mock provider adapters for automated tests.

## Release gate

Before production use, require reviewed Firestore and Storage rules, Functions diff, backup and restore evidence, emulator and staging test results, secret verification, rollback plan and explicit owner approval.

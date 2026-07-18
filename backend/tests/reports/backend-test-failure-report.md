# Backend Test Failure Report - 2026-07-18

### Test Summary
*   **Total Tests:** 138
*   **Passed:** 119
*   **Failed:** 17
*   **Skipped:** 2

---

### Failing Test Suites Summary

| Test Suite/Test | Failure Type | Root Cause Category |
| :--- | :--- | :--- |
| `CreateOntologyCommandHandler.test.js/ts` | `TypeError`, `TS2307`, `TS2345` | Missing `metricsProvider` implementation, broken `@infrastructure` import. |
| `GraphLifecycle.test.js/ts` | `500 Internal Server Error` | Backend error during node creation. |
| `OntologyLifecycle.test.js/ts` | `Configuration Error` | Broken `@interfaces` module mapping. |
| `PostgresSearchProvider.spec.js/ts` | `operator does not exist: text % text` | Database operator missing (likely `pg_trgm`). |
| `SearchApi.spec.js` | `operator does not exist: text % text` | Same as above. |
| `LoginCommandHandler.spec.js` | `TypeError: eventBus.publish is not a function` | Mock implementation issue. |
| `RateLimit.test.js/ts` | `Configuration Error` | Broken `@interfaces` module mapping. |
| `LoginCommandHandler.spec.ts` | `TS2554`, `TS2345` | Missing constructor arguments/invalid UserProps. |
| `UpdateProfile.test.ts` | `500 Internal Server Error` | Endpoint failure. |
| `PostgresArticleRepository.spec.js/ts` | `Unique constraint violation` | Database state conflict (missing cleanup). |
| `JwtSecurity.test.ts` | `TS2307` | Broken `@infrastructure` import. |
| `AiController.spec.ts` | `TS2307` | Broken `src/index` import. |
| `RefreshCommandHandler.spec.ts` | `TS2554` | Missing constructor argument. |
| `AuthLifecycle.test.ts` | `403 Forbidden` | Authorization failure in E2E. |
| `PasswordReset.test.ts` | `500 Internal Server Error` | Endpoint failure. |
| `JwtSecurity.test.js` | `toThrow` failure | Expected error not thrown. |
| `ArticleValidators.spec.ts` | Equality failure | Validation logic mismatch. |
| `EnableMfaCommandHandler.test.ts` | `Matcher error` | Incorrect mock/spy usage. |
| `Ontology.test.ts` | `TS2345` | Invalid domain model props. |
| `PostgresEntityRepository.spec.ts` | `Unique constraint violation` | Database state conflict. |

### Root Causes
1.  **Module Mapping:** Jest configuration is unable to resolve aliases like `@interfaces/*` and `@infrastructure/*`.
2.  **Database:** Integration tests are failing due to leftover data causing unique constraint violations, and missing database extensions (likely `pg_trgm` for search).
3.  **TypeScript/Dependencies:** Several test files contain stale imports or mismatched constructor types, causing TS build failures.
4.  **Domain/Application Logic:** Business logic changes (e.g., `User` requirements, `Ontology` props) have not been propagated to the corresponding test suites.

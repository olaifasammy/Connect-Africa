Connect-Africa Analytics Bounded Context

Enterprise Production TODO Checklist

«Target: Analytics Bounded Context — Enterprise Production 100% Ready → Freeze

Rule: Do not mark Analytics complete until every applicable checkbox below is resolved and the final release gate passes.»

---

0. Completion Standard

- [ ] All Analytics functions implemented
- [ ] All Analytics features implemented
- [ ] All Analytics TODOs resolved
- [ ] No placeholder implementations
- [ ] No fake "return []"
- [ ] No fabricated values
- [ ] No duplicate metric emission
- [ ] No dead handlers
- [ ] No dead interfaces
- [ ] No circular DI
- [ ] No missing persistence fields
- [ ] No incomplete API surface
- [ ] No regression in frozen modules

---

1. Analytics Domain & Event Collection

1.1 Metric Event Tracking

- [x] Define metric event structure
- [x] Validate event name
- [x] Validate source context
- [x] Validate timestamp
- [x] Validate metadata object structure
- [x] Prevent duplicate event emission
- [x] Event-driven consumption of domain events (Article views, publication metrics, search, discovery, bookmarks)

1.2 System Metrics Persistence

- [x] Persist metric entries atomically
- [x] Index event name for fast aggregation
- [x] Index source context
- [x] Index timestamp (descending)
- [x] GIN index on metadata JSONB

---

2. Analytics Queries & Reporting

2.1 Metric Aggregation

- [x] Get system metrics by event name
- [x] Get metrics by source context
- [x] Time-range filtering (start date / end date)
- [x] Aggregation/count queries
- [x] Pagination where required
- [x] Stable ordering

2.2 Performance Metrics

- [x] Article publication analytics
- [x] Discovery and search interaction analytics
- [x] Bookmark and reading progress analytics

---

3. Persistence

PostgresAnalyticsRepository

- [x] Audit repository
- [x] Verify save metric
- [x] Verify query metrics by criteria
- [x] Verify JSONB metadata serialization
- [x] Verify NULL handling
- [x] Verify transaction context

---

4. API Routes & Controllers

Analytics API

- [x] "GET /api/v1/analytics/metrics"
- [x] "POST /api/v1/analytics/track"
- [x] Controller implementation
- [x] Route registration
- [x] Authentication required
- [x] RBAC authorization (Admin / Editor / Analytics viewer)

---

5. DTOs & Validation

- [x] Track metric request DTO
- [x] Query metrics request DTO
- [x] Strict Zod validation schemas
- [x] Validate event names, contexts, and metadata

---

6. Final Gates & Verification

- [x] Strict TypeScript compilation (`tsc --noEmit`)
- [x] Server startup verification (`npm start`)
- [x] Health check (`/health`)
- [x] Git status and diff clean
- [x] Analytics Freeze Gate passed

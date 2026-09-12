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

- [ ] Define metric event structure
- [ ] Validate event name
- [ ] Validate source context
- [ ] Validate timestamp
- [ ] Validate metadata object structure
- [ ] Prevent duplicate event emission
- [ ] Event-driven consumption of domain events (Article views, publication metrics, search, discovery, bookmarks)

1.2 System Metrics Persistence

- [ ] Persist metric entries atomically
- [ ] Index event name for fast aggregation
- [ ] Index source context
- [ ] Index timestamp (descending)
- [ ] GIN index on metadata JSONB

---

2. Analytics Queries & Reporting

2.1 Metric Aggregation

- [ ] Get system metrics by event name
- [ ] Get metrics by source context
- [ ] Time-range filtering (start date / end date)
- [ ] Aggregation/count queries
- [ ] Pagination where required
- [ ] Stable ordering

2.2 Performance Metrics

- [ ] Article publication analytics
- [ ] Discovery and search interaction analytics
- [ ] Bookmark and reading progress analytics

---

3. Persistence

PostgresAnalyticsRepository

- [ ] Audit repository
- [ ] Verify save metric
- [ ] Verify query metrics by criteria
- [ ] Verify JSONB metadata serialization
- [ ] Verify NULL handling
- [ ] Verify transaction context

---

4. API Routes & Controllers

Analytics API

- [ ] "GET /api/v1/analytics/metrics"
- [ ] "POST /api/v1/analytics/track"
- [ ] Controller implementation
- [ ] Route registration
- [ ] Authentication required
- [ ] RBAC authorization (Admin / Editor / Analytics viewer)

---

5. DTOs & Validation

- [ ] Track metric request DTO
- [ ] Query metrics request DTO
- [ ] Strict Zod validation schemas
- [ ] Validate event names, contexts, and metadata

---

6. Final Gates & Verification

- [ ] Strict TypeScript compilation (`tsc --noEmit`)
- [ ] Server startup verification (`npm start`)
- [ ] Health check (`/health`)
- [ ] Git status and diff clean
- [ ] Analytics Freeze Gate passed

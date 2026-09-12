# Bounded Contexts

**Version:** 2.0

**Status:** Authoritative

**Depends On:**
- 01-PlatformArchitecture.md
- 02-DomainArchitecture.md

---

# 1. Purpose

This document defines the bounded contexts of Connect Africa.

A bounded context is an independent business boundary that owns its own language, models, workflows, APIs, data, validation rules, and services.

Every feature belongs to exactly one bounded context.

No feature may exist outside a bounded context.

---

# 2. Core Rules

Each bounded context shall:

- Own its own domain model.
- Own its own database schema.
- Own its own services.
- Own its own repositories.
- Own its own controllers.
- Own its own DTOs.
- Own its own validators.
- Own its own events.
- Own its own documentation.
- Own its own tests.

No bounded context may modify another context's data directly.

---

# 3. Context Map

```
Identity
      │
      ▼
Administration
      │
      ▼
Ontology
      │
      ▼
Entity
      │
      ▼
Relationship
      │
      ▼
Knowledge Graph
      │
      ▼
Articles
     ├────────────┐
     ▼            ▼
 Media         Sources
     │            │
     └──────┬─────┘
            ▼
         Search
            │
            ▼
      AI Gateway
      ├──────────────┬──────────────┐
      ▼              ▼              ▼
 AI Indexer   AI Researcher   AI Expander
            │
            ▼
        Analytics
```

---

# 4. Identity Context

## Responsibilities

- Authentication
- Users
- Sessions
- MFA
- API Keys

## Owns

- Users
- Sessions
- Refresh Tokens
- Password Policies

## Exposes

- Authentication Service
- User Service

---

# 5. Administration Context

## Responsibilities

- Admin Studio
- Roles
- Permissions
- Policies
- Invitations
- Settings
- Audit

## Owns

- RBAC
- ABAC
- Permission Matrix
- Security Policies

---

# 6. Ontology Context

## Responsibilities

- Entity Types
- Relationship Types
- Metadata Definitions
- Validation Rules
- Cardinality
- Inheritance
- Ontology Versions

## Owns

Entire platform ontology.

No other context may define ontology.

---

# 7. Entity Context

## Responsibilities

- Entity Lifecycle
- Facts
- Traits
- Metadata
- Verification
- Merge
- Split
- Timeline
- Quality

## Owns

Every knowledge entity.

---

# 8. Relationship Context

## Responsibilities

- Relationship Lifecycle
- Validation
- Cardinality
- Integrity
- Inverse Relationships

Owns every relationship between entities.

---

# 9. Knowledge Graph Context

## Responsibilities

- Graph Storage
- Graph Queries
- Graph Traversal
- Recommendations
- Context Discovery
- Path Finding

Consumes:

- Entity
- Relationship

---

# 10. Article Context

## Responsibilities

- Drafts
- Reviews
- Publishing
- Revisions
- Editorial Workflow

Consumes:

- Entity
- Sources
- Media

---

# 11. Media Context

## Responsibilities

- Upload
- Storage
- Metadata
- Image Processing
- File Optimization
- Thumbnails
- CDN Integration

Owns all media assets.

---

# 12. Source Context

## Responsibilities

- References
- Citations
- Source Validation
- Credibility
- Publishers

Owns every external reference.

---

# 13. Search Context

## Responsibilities

- Indexing
- Ranking
- Suggestions
- Full-text Search
- Filters

Consumes platform data.

Owns search indexes.

---

# 14. AI Gateway Context

## Responsibilities

- Prompt Templates
- Model Routing
- Provider Selection
- Cost Monitoring
- AI Security
- Rate Limits

Does not own business data.

Acts only as orchestration.

---

# 15. AI Indexer Context

## Responsibilities

- Crawl websites
- Discover topics
- Generate drafts
- Produce JSON output
- Queue indexing jobs

Only accessible by Head Administrator.

Never publishes content directly.

---

# 16. AI Researcher Context

## Responsibilities

- Research entities
- Research ontology
- Discover relationships
- Suggest metadata
- Recommend sources

Never edits platform data.

Only produces recommendations.

---

# 17. AI Expander Context

## Responsibilities

- Expand article reading experience
- Generate up to 200 words
- Prefer platform knowledge
- Reference master articles
- Save user research

Restrictions

- Never edits articles.
- Never changes platform knowledge.
- Never stores global AI output.
- Stores only user-owned saved research.

---

# 18. Analytics Context

## Responsibilities

- Metrics
- Reports
- Dashboards
- KPIs
- Usage Analytics
- Operational Analytics

Consumes events from every context.

---

# 19. Notification Context

## Responsibilities

- Email
- Push Notifications
- In-App Alerts
- Scheduled Notifications

---

# 20. Timeline Context

## Responsibilities

- Historical Events
- Entity Timelines
- Chronological Navigation

---

# 21. Jobs Context

## Responsibilities

- Background Workers
- Queues
- Scheduling
- Retry Logic

Owns asynchronous execution.

---

# 22. Versioning Context

## Responsibilities

- Revisions
- Snapshots
- Rollbacks
- Change History

---

# 23. Audit Context

## Responsibilities

- Audit Logs
- Compliance
- Security Logs
- Activity Tracking

Every write operation must produce an audit record.

---

# 24. Context Communication

Contexts communicate only through:

- Public Services
- DTOs
- Domain Events
- Published Interfaces

Forbidden:

- Repository Access
- SQL Access
- Internal Models
- Controller Calls

---

# 25. Shared Kernel

The Shared Kernel contains only:

- Common Types
- Shared Interfaces
- Error Classes
- Utilities
- Logging
- Configuration
- Constants

Business logic is forbidden inside the Shared Kernel.

---

# 26. Context Independence

Every bounded context must support future extraction into an independent service.

No context may depend on another context's implementation details.

---

# 27. Context Completion Criteria

A bounded context is complete only when it includes:

- Domain Model
- Services
- Controllers
- DTOs
- Validators
- Repositories
- Events
- Tests
- Documentation
- Metrics
- Audit Logging
- Security
- APIs

---

# 28. Compliance Rule

No feature may be implemented unless it belongs to a defined bounded context.

Cross-context access must always occur through published contracts.

Violation of these rules constitutes an architectural breach.
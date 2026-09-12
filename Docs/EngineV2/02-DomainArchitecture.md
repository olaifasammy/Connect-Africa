# Domain Architecture

**Version:** 2.0

**Status:** Authoritative

**Depends On:** 01-PlatformArchitecture.md

---

# 1. Purpose

This document defines every business domain within Connect Africa.

Each domain represents an independent business capability with clear ownership, responsibilities, boundaries, and public contracts.

A domain must never become dependent on another domain's internal implementation.

---

# 2. Domain Principles

Every domain shall:

- Own its own business logic.
- Own its own data model.
- Own its own services.
- Own its own repositories.
- Own its own APIs.
- Own its own DTOs.
- Own its own validators.
- Own its own tests.
- Own its own documentation.

No domain may directly modify another domain's internal data.

---

# 3. Domain Categories

The platform consists of four primary categories.

## Core Domains

The heart of Connect Africa.

- Ontology
- Entity
- Relationship
- Knowledge Graph

---

## Content Domains

Responsible for knowledge publication.

- Articles
- Media
- Sources
- Timeline

---

## Platform Domains

Responsible for platform operation.

- Authentication
- Users
- Roles
- Permissions
- Settings
- Notifications
- Audit
- Versioning
- Jobs

---

## Intelligence Domains

Responsible for discovery and AI.

- Search
- AI Gateway
- AI Indexer
- AI Researcher
- AI Expander
- Analytics
- Metrics
- Reporting

---

# 4. Domain Ownership

Each domain owns:

- Business Rules
- Validation Rules
- Domain Services
- Domain Events
- Repositories
- DTOs
- APIs
- Database Tables
- Tests

Ownership cannot be shared.

---

# 5. Core Domains

## Ontology Domain

Responsible for:

- Ontology Definitions
- Metadata Definitions
- Validation Rules
- Entity Types
- Relationship Types
- Cardinality Rules
- Inheritance
- Versioning

Provides:

- Ontology Validation
- Schema Generation
- Relationship Constraints

Consumed by:

- Entity
- Relationship
- Articles
- AI Researcher

---

## Entity Domain

Responsible for:

- Entity Lifecycle
- Facts
- Traits
- Metadata
- Verification
- Quality
- Merge
- Split
- Timeline
- Versioning

Provides:

- Entity APIs
- Entity Search
- Entity Validation

Consumes:

- Ontology

---

## Relationship Domain

Responsible for:

- Relationship Lifecycle
- Validation
- Cardinality
- Direction
- Integrity
- Versioning

Consumes:

- Entity
- Ontology

---

## Knowledge Graph Domain

Responsible for:

- Graph Storage
- Traversal
- Recommendations
- Path Finding
- Graph Integrity
- Context Discovery

Consumes:

- Entity
- Relationship

---

# 6. Content Domains

## Article Domain

Responsible for:

- Articles
- Drafts
- Publishing
- Revision History
- Citations
- Review
- Editorial Workflow

Consumes:

- Entity
- Source
- Media

---

## Media Domain

Responsible for:

- Upload
- Storage
- Metadata
- Optimization
- Access Control
- Thumbnails

Consumes:

- Storage Infrastructure

---

## Source Domain

Responsible for:

- References
- Citations
- Source Validation
- Credibility
- Publisher Metadata

Consumed by:

- Articles
- AI
- Entity

---

## Timeline Domain

Responsible for:

- Historical Events
- Chronology
- Entity Timelines

---

# 7. Platform Domains

## Authentication

Responsible for:

- Login
- MFA
- Sessions
- JWT
- Refresh Tokens

---

## User Domain

Responsible for:

- Profiles
- Preferences
- Invitations
- Activity

---

## RBAC Domain

Responsible for:

- Roles
- Permissions
- Policies
- Access Matrix

---

## Settings Domain

Responsible for:

- Platform Configuration
- Feature Flags
- Localization

---

## Audit Domain

Responsible for:

- Audit Logs
- Change History
- Compliance Records

---

## Notification Domain

Responsible for:

- Email
- In-App Notifications
- Alerts
- Queueing

---

## Jobs Domain

Responsible for:

- Background Workers
- Queues
- Scheduling
- Retry Policies

---

## Versioning Domain

Responsible for:

- Revision History
- Rollback
- Snapshots

---

# 8. Intelligence Domains

## Search Domain

Responsible for:

- Indexing
- Query Processing
- Ranking
- Suggestions
- Filters

Consumes:

- Entity
- Articles
- Media

---

## AI Gateway

Responsible for:

- Model Routing
- Prompt Templates
- Provider Selection
- AI Security
- Cost Monitoring

Owns no business logic.

Acts only as orchestration.

---

## AI Indexer

Responsible for:

- Crawling
- Website Discovery
- Topic Discovery
- Draft Generation
- JSON Export

Accessible only by Head Administrator.

---

## AI Researcher

Responsible for:

- Entity Research
- Ontology Suggestions
- Relationship Suggestions
- Metadata Discovery
- Source Discovery

Never edits data automatically.

---

## AI Expander

Responsible for:

- Reader Expansion
- 200-word Knowledge Continuation
- Database-first Expansion
- AI-generated Expansion

Never modifies master articles.

Never stores generated content globally.

---

## Analytics Domain

Responsible for:

- Usage Analytics
- Operational Metrics
- Reports
- Dashboards
- KPIs

---

# 9. Domain Communication

Domains communicate through:

- Public Services
- Interfaces
- Domain Events

Forbidden:

- Direct SQL
- Internal Repository Access
- Controller Calls

---

# 10. Domain Events

Every domain publishes events.

Examples:

- EntityCreated
- EntityMerged
- EntityVerified
- RelationshipCreated
- ArticlePublished
- MediaUploaded
- SourceVerified
- UserInvited
- RoleAssigned
- SearchIndexed
- AIResearchCompleted

Domains react independently.

---

# 11. Domain Independence

Every domain must be removable with minimal impact.

Future migration into independent services must not require business logic rewrites.

---

# 12. Domain Contracts

Every domain exposes:

- Public APIs
- DTOs
- Validation Rules
- Events
- Documentation

Internal implementation remains private.

---

# 13. Dependency Rules

Allowed:

```
Presentation

↓

Application

↓

Domain

↓

Infrastructure
```

Domains never depend on:

- Controllers
- HTTP
- Database
- Storage
- AI Providers

---

# 14. Scalability

Each domain must support:

- Independent testing
- Independent deployment
- Independent scaling
- Independent ownership

The initial implementation remains a Modular Monolith while preserving service boundaries.

---

# 15. Compliance

A domain is considered complete only when it includes:

- Business Logic
- APIs
- DTOs
- Validation
- Repository
- Tests
- Documentation
- Metrics
- Audit Events
- Security

No domain may be marked production-ready without satisfying all requirements.
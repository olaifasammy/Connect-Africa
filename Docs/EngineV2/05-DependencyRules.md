# Dependency Rules

**Version:** 2.0

**Status:** Authoritative

**Depends On:**

- 01-PlatformArchitecture.md
- 02-DomainArchitecture.md
- 03-BoundedContexts.md
- 04-FolderArchitecture.md

---

# 1. Purpose

This document defines the dependency rules for the Connect Africa platform.

These rules prevent architectural drift, circular dependencies, tight coupling, and hidden integrations.

Every dependency must be intentional.

---

# 2. Dependency Direction

The dependency flow is strictly one-way.

```
Interfaces

↓

Application

↓

Domain

↓

Infrastructure
```

Dependencies may only point downward.

Never upward.

---

# 3. Allowed Dependencies

## Interfaces

May depend on:

- Application
- Shared
- Config

Must never depend directly on:

- Infrastructure
- Database
- External APIs

---

## Application

May depend on:

- Domain
- Shared

Must never depend on:

- Controllers
- HTTP
- Database
- PostgreSQL
- Redis
- Storage
- AI Providers

---

## Domain

May depend only on:

- Domain
- Shared

Must never depend on:

- Application
- Interfaces
- Infrastructure
- Express
- PostgreSQL
- Redis
- HTTP
- Supabase

---

## Infrastructure

May depend on:

- Domain Interfaces
- Shared
- Config

Infrastructure implements interfaces.

Infrastructure never owns business rules.

---

## Shared

May depend only on:

- Standard Libraries

Shared must never depend on any platform module.

---

# 4. Module Communication

Modules communicate through:

- Public Services
- Interfaces
- Events
- DTOs

Never through:

- SQL
- Controllers
- Repositories
- Internal Classes

---

# 5. Repository Rules

Repositories belong to their owning module.

Only Application Services may call repositories.

Controllers never access repositories.

Validators never access repositories.

Repositories never call services.

Repositories never publish HTTP responses.

---

# 6. Service Rules

Services own business workflows.

Services may call:

- Repositories
- Domain Services
- Event Publishers

Services never call:

- Controllers
- Routes
- HTTP Clients directly
- Express Request/Response

---

# 7. Controller Rules

Controllers are thin.

Responsibilities:

- Receive Request
- Validate DTO
- Call Application Service
- Return Response

Controllers must not:

- Contain business logic
- Execute SQL
- Access repositories
- Perform AI calls
- Build graphs

---

# 8. Validator Rules

Validators:

- Validate DTOs
- Validate Schemas
- Validate Ontology
- Validate Business Constraints

Validators never:

- Save data
- Publish events
- Access HTTP
- Modify entities

---

# 9. Event Rules

Events provide loose coupling.

Publisher:

```
Entity Service

↓

Event Bus

↓

Subscribers
```

Publishers never know subscribers.

Subscribers never know publishers.

---

# 10. AI Rules

Application Services call AI Gateway only.

Forbidden:

```
EntityService

↓

OpenAI API
```

Correct:

```
EntityService

↓

AiGateway

↓

Provider

↓

Result
```

---

# 11. Database Rules

Only repositories access:

- PostgreSQL
- Redis
- Supabase
- Storage

Services never execute SQL.

Controllers never execute SQL.

---

# 12. Search Rules

Only Search module owns:

- Search Engine
- Indexes
- Ranking
- Suggestions

Other modules request indexing through Search Service.

---

# 13. Media Rules

Only Media module owns:

- Upload
- Files
- Storage
- CDN

No module uploads directly.

---

# 14. Source Rules

Only Source module manages:

- References
- Citations
- Credibility

Articles consume Sources.

They never create citation logic.

---

# 15. Knowledge Graph Rules

Only Graph module manages:

- Traversal
- Graph Storage
- Graph Metrics
- Graph Queries

Other modules consume graph services.

---

# 16. Ontology Rules

Only Ontology manages:

- Entity Types
- Metadata
- Relationship Definitions
- Cardinality
- Validation Rules

No module creates ontology definitions independently.

---

# 17. Shared Rules

Shared contains only:

- Constants
- Errors
- Utilities
- Enums
- Interfaces
- Logger
- Security Helpers

Business logic is forbidden.

---

# 18. Configuration Rules

Configuration files contain only:

- Environment
- Feature Flags
- Constants
- Provider Configuration

Configuration never contains business logic.

---

# 19. Circular Dependencies

Circular dependencies are prohibited.

Example (Forbidden):

```
Entity

↓

Article

↓

Entity
```

Correct:

```
Entity

↓

Event

↓

Article
```

---

# 20. Dependency Injection

Every dependency must be injected.

Forbidden:

```ts
const service = new EntityService();
```

Required:

```ts
constructor(private readonly entityService: EntityService) {}
```

---

# 21. Public Contracts

Every module exposes:

- DTOs
- Interfaces
- Events
- Public Services

Internal implementation remains private.

---

# 22. External Libraries

Third-party libraries must be isolated.

Allowed locations:

```
Infrastructure

Shared
```

Never inside Domain.

---

# 23. Testing Dependencies

Tests may mock:

- Repositories
- AI Gateway
- Storage
- Search
- Email

Tests never mock domain rules.

---

# 24. Forbidden Dependencies

The following are architectural violations:

- Controller → Repository
- Controller → SQL
- Domain → Express
- Domain → PostgreSQL
- Domain → Redis
- Service → HTTP Response
- Repository → Controller
- Repository → Service
- Validator → Database
- AI Provider → Domain
- Module → Internal Module Classes

---

# 25. Architecture Enforcement

Every Pull Request must verify:

- No circular dependencies
- No forbidden imports
- No layer violations
- No direct infrastructure access
- Dependency Injection used everywhere
- Events replace tight coupling where applicable

---

# 26. Definition of Done

A feature is dependency-compliant only when:

- Dependencies follow layer direction.
- Modules communicate through contracts.
- No forbidden imports exist.
- No circular references exist.
- Tests pass.
- Static dependency analysis passes.

---

# 27. Compliance Rule

Any code violating these dependency rules shall not be merged into the main branch.

These rules are mandatory for every backend module and future microservice.
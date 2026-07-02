# Folder Architecture

**Version:** 2.0

**Status:** Authoritative

**Depends On:**

- 01-PlatformArchitecture.md
- 02-DomainArchitecture.md
- 03-BoundedContexts.md

---

# 1. Purpose

This document defines the official physical folder structure of the Connect Africa platform.

The folder structure mirrors the domain architecture.

Folders are architectural boundaries.

No code may be placed outside its appropriate boundary.

---

# 2. Repository Layout

```
Connect-Africa/

├── Docs/
├── EngineV2/
├── backend/
├── frontend/
├── mobile/
├── infrastructure/
├── scripts/
├── .github/
├── README.md
├── LICENSE
└── .gitignore
```

---

# 3. Backend Layout

```
backend/

├── src/
├── tests/
├── docs/
├── scripts/
├── package.json
├── tsconfig.json
└── README.md
```

---

# 4. Source Layout

```
src/

├── application/
├── domain/
├── infrastructure/
├── interfaces/
├── shared/
├── config/
├── bootstrap/
├── workers/
├── types/
└── index.ts
```

---

# 5. Application Layer

Responsible for orchestration.

```
application/

├── dto/
├── services/
├── commands/
├── queries/
├── handlers/
├── events/
├── policies/
└── usecases/
```

Never contains:

- SQL
- HTTP
- Database logic

---

# 6. Domain Layer

Contains business rules only.

```
domain/

├── entity/
├── ontology/
├── relationship/
├── article/
├── media/
├── source/
├── graph/
├── search/
├── analytics/
├── auth/
├── audit/
├── notification/
├── settings/
└── shared/
```

Each module owns:

```
entity/

├── entities/
├── value-objects/
├── services/
├── repositories/
├── events/
├── policies/
├── validators/
└── interfaces/
```

---

# 7. Infrastructure Layer

Responsible for implementation.

```
infrastructure/

├── database/
├── cache/
├── storage/
├── ai/
├── email/
├── search/
├── repositories/
├── queue/
├── monitoring/
├── logging/
└── integrations/
```

Contains implementation only.

Never business logic.

---

# 8. Interface Layer

Contains everything exposed externally.

```
interfaces/

├── http/
├── graphql/
├── websocket/
├── cli/
└── cron/
```

---

# 9. HTTP Layout

```
http/

├── controllers/
├── middleware/
├── routes/
├── requests/
├── responses/
└── presenters/
```

---

# 10. Shared Layer

```
shared/

├── errors/
├── logger/
├── utils/
├── constants/
├── interfaces/
├── enums/
├── decorators/
├── security/
└── validation/
```

Business logic prohibited.

---

# 11. Configuration

```
config/

├── app.ts
├── auth.ts
├── database.ts
├── redis.ts
├── storage.ts
├── search.ts
├── ai.ts
├── queue.ts
└── permissions.ts
```

---

# 12. Bootstrap

Responsible only for wiring dependencies.

```
bootstrap/

├── container/
├── providers/
├── factories/
└── startup/
```

Never contains business logic.

---

# 13. Workers

```
workers/

├── indexing/
├── analytics/
├── notifications/
├── ai/
└── imports/
```

Workers execute background jobs only.

---

# 14. Tests

```
tests/

├── unit/
├── integration/
├── e2e/
├── fixtures/
├── factories/
└── helpers/
```

Every production module must have tests.

---

# 15. Documentation

```
docs/

├── api/
├── architecture/
├── deployment/
├── operations/
└── changelog/
```

---

# 16. Module Structure

Every module follows the exact same layout.

```
module/

├── application/
│
├── domain/
│
├── infrastructure/
│
├── interfaces/
│
├── tests/
│
└── README.md
```

---

# 17. Example

```
entity/

├── application/
│
│   ├── dto/
│   ├── commands/
│   ├── queries/
│   ├── handlers/
│   └── services/
│
├── domain/
│
│   ├── entities/
│   ├── repositories/
│   ├── validators/
│   ├── events/
│   └── policies/
│
├── infrastructure/
│
│   ├── postgres/
│   ├── search/
│   └── cache/
│
├── interfaces/
│
│   ├── controllers/
│   ├── routes/
│   └── requests/
│
└── tests/
```

---

# 18. Naming Rules

Folders use:

```
kebab-case
```

Files use:

```
PascalCase.ts
```

DTOs

```
CreateEntityDto.ts
UpdateEntityDto.ts
```

Repositories

```
EntityRepository.ts
PostgresEntityRepository.ts
```

Services

```
EntityService.ts
```

Controllers

```
EntityController.ts
```

Validators

```
EntityValidator.ts
```

Events

```
EntityCreatedEvent.ts
```

---

# 19. Forbidden Structure

The following are prohibited:

```
services/

controllers/

repositories/

middlewares/

validators/
```

as global dumping grounds.

Every implementation belongs inside its module.

---

# 20. Module Ownership

Each module owns:

- Controllers
- DTOs
- Services
- Validators
- Repositories
- Events
- Tests
- Documentation

Nothing is shared unless it belongs in Shared.

---

# 21. Cross Module Access

Allowed

```
Module

↓

Interface

↓

Public Service
```

Forbidden

```
Module

↓

Repository

↓

Another Module
```

---

# 22. Legacy Code

Legacy folders are not permitted.

Examples:

```
controllers/
services/
repositories/
modules/
```

at the root level.

All legacy implementations must be migrated into their owning modules.

After migration they shall be deleted.

No compatibility wrappers.

No duplicate implementations.

---

# 23. Migration Rules

Migration shall preserve:

- Business logic
- Tests
- APIs
- Documentation
- Validation
- Security

Only physical location changes.

Behavior must remain identical.

---

# 24. Definition of Done

A folder migration is complete only when:

- No duplicate files exist.
- No legacy folders remain.
- Imports are updated.
- Tests pass.
- Documentation updated.
- No dead code.
- No orphan services.

---

# 25. Compliance Rule

Every new file created in Connect Africa must follow this folder architecture.

Files created outside this structure constitute an architectural violation.

No exceptions.
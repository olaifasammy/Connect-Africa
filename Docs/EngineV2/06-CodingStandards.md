# Coding Standards

**Version:** 2.0

**Status:** Authoritative

**Depends On:**

- 01-PlatformArchitecture.md
- 02-DomainArchitecture.md
- 03-BoundedContexts.md
- 04-FolderArchitecture.md
- 05-DependencyRules.md

---

# 1. Purpose

This document defines the mandatory coding standards for the Connect Africa platform.

These rules ensure the codebase remains:

- Readable
- Maintainable
- Scalable
- Testable
- Predictable

Every contributor must follow these standards.

---

# 2. General Principles

All code must be:

- Simple
- Explicit
- Consistent
- Testable
- Deterministic

Code should optimize for readability before cleverness.

---

# 3. SOLID

All services must follow SOLID.

Required:

- Single Responsibility
- Open/Closed
- Liskov Substitution
- Interface Segregation
- Dependency Inversion

---

# 4. KISS

Prefer the simplest implementation.

Avoid unnecessary abstractions.

Avoid premature optimization.

---

# 5. DRY

Business logic must exist only once.

Never duplicate:

- Validation
- Business Rules
- Mapping Logic
- Permission Checks

---

# 6. File Size

Maximum recommended file size

```
500 lines
```

Maximum preferred

```
300 lines
```

Files larger than this should be split.

---

# 7. Function Size

Target

```
20–40 lines
```

Maximum

```
80 lines
```

If longer, refactor.

---

# 8. Class Size

Each class should have one responsibility.

Avoid "God Classes."

---

# 9. Naming

Folders

```
kebab-case
```

Files

```
PascalCase.ts
```

Variables

```
camelCase
```

Interfaces

```
IEntityRepository
```

Enums

```
EntityStatus
```

Types

```
CreateEntityDto
```

Constants

```
UPPER_SNAKE_CASE
```

---

# 10. Imports

Preferred

```
External

↓

Shared

↓

Application

↓

Domain

↓

Relative
```

Never use wildcard imports.

---

# 11. DTO Rules

Every API requires DTOs.

Example

```
CreateEntityDto

UpdateEntityDto

EntityResponseDto
```

Never expose database models directly.

---

# 12. Validation

Validation occurs before business logic.

Validation must use:

- Zod
- Schema Validators

Never validate inside controllers.

---

# 13. Controllers

Controllers must:

- Receive request
- Validate DTO
- Call service
- Return response

Nothing else.

---

# 14. Services

Services contain business logic.

Services may:

- Call repositories
- Publish events
- Coordinate workflows

Services never:

- Return HTTP responses
- Execute SQL directly

---

# 15. Repositories

Repositories perform data access only.

Never place business logic inside repositories.

---

# 16. Domain Models

Domain models represent business concepts.

They must remain independent of:

- Express
- PostgreSQL
- Redis
- HTTP
- External APIs

---

# 17. Error Handling

Every error must:

- Use typed error classes
- Provide meaningful messages
- Include error codes
- Be centrally handled

Never expose stack traces to clients.

---

# 18. Logging

Use structured logging.

Every log must include:

- Timestamp
- Request ID
- User ID (if available)
- Module
- Severity

Never use:

```
console.log()
```

in production code.

---

# 19. Comments

Comments explain **why**.

Never explain **what** obvious code does.

Bad

```ts
// increment counter
count++;
```

Good

```ts
// Prevent duplicate processing of queued jobs.
count++;
```

---

# 20. Async Code

Always use:

```
async / await
```

Avoid nested promises.

Always handle failures.

---

# 21. Events

Domain events must use:

```
EntityCreatedEvent

ArticlePublishedEvent

RelationshipDeletedEvent
```

Past tense.

---

# 22. API Responses

Every API returns

```json
{
  "success": true,
  "data": {},
  "meta": {},
  "errors": []
}
```

Errors

```json
{
  "success": false,
  "errors": [
    {
      "code": "ENTITY_NOT_FOUND",
      "message": "..."
    }
  ]
}
```

---

# 23. Testing

Every feature requires:

- Unit Tests
- Integration Tests

Critical workflows require:

- E2E Tests

Coverage target

```
90%
```

minimum.

---

# 24. Documentation

Every public service requires:

- Description
- Parameters
- Return values
- Exceptions

Public APIs require OpenAPI documentation.

---

# 25. Security

Never trust client input.

Always:

- Validate
- Sanitize
- Authorize

Every write endpoint requires permission checks.

---

# 26. Git Standards

Branch naming

```
feature/entity-dashboard

fix/article-search

refactor/domain-layout

docs/backend
```

Commit format

```
feat:

fix:

docs:

test:

refactor:

perf:

build:

chore:
```

---

# 27. Pull Requests

Every PR must include:

- Description
- Screenshots (if UI)
- Tests
- Updated documentation
- Linked ticket

---

# 28. Performance

Avoid:

- N+1 queries
- Blocking loops
- Duplicate database reads

Prefer batching where possible.

---

# 29. AI Code

AI-generated code is never merged automatically.

Every generated change requires:

- Human review
- Tests
- Architecture compliance

---

# 30. Forbidden

Forbidden patterns

- Massive utility classes
- Static business services
- Hidden global state
- Circular imports
- Magic numbers
- Hardcoded secrets
- Business logic in controllers
- Business logic in repositories
- Duplicate implementations

---

# 31. Refactoring

Refactoring must preserve:

- Behavior
- Tests
- APIs
- Documentation

Never change functionality during structural refactoring.

---

# 32. Definition of Done

Code is complete only when:

- Builds successfully
- Tests pass
- Lint passes
- Documentation updated
- No TODOs
- No dead code
- No duplication
- Architecture rules satisfied

---

# 33. Compliance Rule

Any code violating these standards shall not be merged into the main branch.

These standards apply to:

- Backend
- Frontend
- Mobile
- Infrastructure
- Future services
- AI-generated code
```
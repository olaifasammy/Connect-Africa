# Project Conventions

**Version:** 2.0

**Status:** Authoritative

**Depends On:**

- 01-PlatformArchitecture.md
- 02-DomainArchitecture.md
- 03-BoundedContexts.md
- 04-FolderArchitecture.md
- 05-DependencyRules.md
- 06-CodingStandards.md
- 07-DOD.md

---

# 1. Purpose

This document defines the day-to-day conventions for developing Connect Africa.

These conventions ensure every contributor—human or AI—works consistently and preserves the platform architecture.

---

# 2. Core Principles

Every contribution must be:

- Production-ready
- Fully tested
- Fully documented
- Backward compatible (unless intentionally breaking)
- Architecture compliant

---

# 3. Source of Truth

The following documents are authoritative.

1. EngineV2/
2. Docs/
3. Approved Issues
4. Accepted Pull Requests

Personal preferences never override documentation.

---

# 4. Repository Ownership

```
backend/
```

Backend Team

```
frontend/
```

Frontend Team

```
mobile/
```

Mobile Team

```
infrastructure/
```

DevOps

```
EngineV2/
```

Architecture

```
Docs/
```

Technical Documentation

---

# 5. File Creation Rules

Before creating a file:

- Search for an existing implementation.
- Reuse before creating.
- Extend before duplicating.

Never create duplicate services.

Never create duplicate repositories.

Never create duplicate validators.

---

# 6. Module Ownership

Every module owns:

- Domain
- Services
- DTOs
- Controllers
- Validators
- Routes
- Events
- Tests
- Documentation

No other module may modify its internals.

---

# 7. Naming Conventions

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

Constants

```
UPPER_SNAKE_CASE
```

Enums

```
PascalCase
```

Interfaces

```
IEntityRepository
```

DTOs

```
CreateEntityDto

UpdateEntityDto
```

---

# 8. Git Branches

Main branches

```
main

develop
```

Feature branches

```
feature/entity-dashboard

feature/article-review

feature/search
```

Fixes

```
fix/login

fix/entity-validation
```

Documentation

```
docs/backend

docs/frontend
```

Refactoring

```
refactor/entity-module
```

---

# 9. Commit Convention

```
feat:

fix:

refactor:

docs:

test:

build:

perf:

style:

ci:

chore:
```

Example

```
feat(entity): implement merge workflow

fix(search): resolve ranking issue

docs(api): update OpenAPI specification
```

---

# 10. Pull Requests

Every PR must include:

- Description
- Linked issue
- Testing evidence
- Documentation updates
- Architecture compliance

---

# 11. Code Reviews

Reviewers verify:

- Business correctness
- Architecture compliance
- Security
- Performance
- Tests
- Documentation

Style alone is never sufficient.

---

# 12. AI Contribution Rules

AI may:

- Generate code
- Refactor code
- Improve documentation
- Write tests

AI must never:

- Delete functionality without approval
- Change APIs silently
- Remove business logic
- Invent requirements
- Ignore EngineV2

Every AI change requires human review.

---

# 13. Refactoring Rules

Refactoring must:

- Preserve behavior
- Preserve APIs
- Preserve tests
- Preserve documentation

Refactoring is structural—not functional.

---

# 14. Documentation Rules

Every new feature updates:

- README (if applicable)
- API docs
- Architecture docs
- Changelog

Documentation is part of the feature.

---

# 15. Testing Rules

Every feature includes:

- Unit tests
- Integration tests

Critical workflows also require:

- End-to-end tests

---

# 16. Dependency Rules

Before importing another module:

- Use its public interface.
- Never import internal implementations.
- Never bypass architectural boundaries.

---

# 17. Security Rules

Every new endpoint must include:

- Authentication
- Authorization
- Validation
- Audit logging

Security is mandatory.

---

# 18. Performance Rules

Avoid:

- N+1 queries
- Duplicate requests
- Unnecessary allocations
- Blocking operations

Measure before optimizing.

---

# 19. Logging Rules

Use structured logging only.

Never log:

- Passwords
- Secrets
- Tokens
- API Keys

---

# 20. Feature Workflow

Every feature follows this sequence.

```
Specification

↓

Architecture Review

↓

Implementation

↓

Tests

↓

Documentation

↓

Review

↓

Merge
```

No shortcuts.

---

# 21. Feature Completion Checklist

Before merging:

- Code builds
- Tests pass
- Documentation updated
- API documented
- Architecture respected
- No duplicate code
- No TODOs

---

# 22. Deprecation Policy

Deprecated functionality must:

- Be documented
- Be announced
- Have a replacement
- Be removed only after approval

---

# 23. Versioning

Semantic Versioning is mandatory.

```
Major.Minor.Patch
```

Example

```
1.0.0

1.1.0

1.1.3

2.0.0
```

---

# 24. Repository Cleanliness

The repository must never contain:

- Dead code
- Temporary files
- Duplicate implementations
- Commented-out code
- Experimental branches in production

---

# 25. Release Rules

A release is approved only when:

- DoD passes
- CI passes
- Documentation complete
- Security verified
- Architecture verified

---

# 26. Communication Rules

Major architectural decisions require:

- Documentation
- Review
- Approval

Architecture must never evolve informally.

---

# 27. Ownership Principle

If you modify a module, you own:

- Fixing defects
- Updating tests
- Updating documentation
- Maintaining compatibility

Leave the module better than you found it.

---

# 28. Compliance Rule

Every contributor, reviewer, automation tool, and AI assistant must follow this document together with the rest of EngineV2.

Any contribution violating these conventions shall be rejected before merge.